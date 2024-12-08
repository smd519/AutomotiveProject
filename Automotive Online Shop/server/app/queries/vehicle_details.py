from ..utils import database
from ..models.vehicle_details import VehicleDetails

# public
def public_vehicle_details(vin):
    conn = database.get_db_connection()
    cursor = conn.cursor()
    details_list = ["vin", "type", "manufacturer","model_name", "model_year", "fuel_type", "mileage", "description", "condition", "color"]
    
    cursor.execute('''
                   SELECT a.vin, type, manufacturer, model_name, model_year, fuel_type, mileage, description, condition, vc.colors
                   FROM "Vehicle" a JOIN (SELECT vin, STRING_AGG(color, ',') AS colors FROM "VehicleColor" GROUP BY vin) vc ON a.vin = vc.vin
                   WHERE a.vin = %s;
                   '''
                   , (vin,)
                   )
    vehicle_row = cursor.fetchone()
    vehicle_dict = {details_list[i]: vehicle_row[i] for i in range(0,len(details_list))}
    
    # get_sale_price
    cursor.execute('''
                   SELECT  ("Buy".purchase_price*1.25 + part_cost) as total
                   FROM "Buy" JOIN (
                    SELECT "Part".vin, SUM( COALESCE ("Part".cost,0) * COALESCE ("Part".quantity,0) )*1.10 AS part_cost
                    FROM "Part"
                    WHERE "Part".vin = '{vehicle_vin}'
                    group by "Part".vin) a ON "Buy".vin = a.vin;
                   '''.format(vehicle_vin = vin)
                )
    sale_price = cursor.fetchone()[0]
    vehicle_dict['sale_price'] = sale_price
    
    cursor.close()
    conn.close()
    
    return vehicle_dict

# clerk or owner
def get_parts_list(vin):
    conn = database.get_db_connection()
    cursor = conn.cursor()
    
    # total_part_cost
    cursor.execute('''
                    SELECT SUM( COALESCE ("Part".cost,0) * COALESCE ("Part".quantity,0) )*1.10 AS part_cost
                    FROM "Part"
                    WHERE "Part".vin = '{vehicle_vin}';
                   '''.format(vehicle_vin = vin)
                )
    total_part_cost = cursor.fetchone()[0]
    
    details_list = ["part_number", "description", "cost","status", "vendor_name", "phone_number", "street", "city", "state", "postal_code"]
    parts_details = [{ detaile: None for detaile in details_list }]

    
    cursor.execute('''
                   SELECT "Part".part_number, "Part".description, "Part".cost, "Part".status, "Vendor".vendor_name, "Vendor".phone_number, "Vendor".street, "Vendor".city, "Vendor".state, "Vendor".postal_code
                   FROM "PartsOrder" INNER JOIN "Part" ON "PartsOrder".ordinal ="Part".ordinal INNER JOIN "Vendor" ON "PartsOrder".vendor_name = "Vendor".vendor_name
                   WHERE "PartsOrder".vin = '{vehicle_vin}' AND "Part".vin = '{vehicle_vin}';
                   '''.format(vehicle_vin = vin)
                )
    parts = cursor.fetchall()

    cursor.close()
    conn.close()
    
    vehicle_dict = {}
    if parts is not None:
        parts_list = [dict(zip(details_list, part))  for part in parts ]
        
    parts_details = {}
    parts_details['cost_total'] = total_part_cost
    parts_details ['parts_list'] = parts_list

    return parts_details

# Manager or owner
def get_purchase_details(vin):
    conn = database.get_db_connection()
    cursor = conn.cursor()
    
    transaction_details = ["purchase_price", "purchase_date"]
    clerk_details = ["first_name", "last_name"]
    seller_details = ["first_name","last_name", "title", "business_name", "email", "phone_number", "street", "city", "state", "postal_code" ]
    

    cursor.execute('''
                   SELECT purchase_price, purchase_date FROM "Buy" WHERE vin= '{vehicle_vin}';
                   '''.format(vehicle_vin = vin)
                )
    transaction_dict = dict(zip(transaction_details, cursor.fetchone()))
    
    
    cursor.execute('''
                   SELECT "Employee".first_name, "Employee".last_name
                   FROM "Employee" INNER JOIN "Buy" ON "Employee".username = "Buy".username
                   WHERE "Buy".vin = '{vehicle_vin}';
                   '''.format(vehicle_vin = vin)
                )
    clerk_dict = dict(zip(clerk_details, cursor.fetchone()))
    
    cursor.execute('''
                   SELECT first_name, last_name, title, business_name, email, phone_number, street, city, state, postal_code
                   FROM "Customer" INNER JOIN
                   (
                   SELECT customerid, first_name, last_name, title, business_name 
                   FROM "CustomerBusiness"
                   Union
                   SELECT customerid, first_name, last_name, Null as title, Null as business_name
                   FROM "CustomerIndividual"
                   ) n
                   ON "Customer".customerid = n.customerid
                   WHERE "Customer".customerid IN (SELECT "Buy".customerid FROM "Buy" WHERE vin = '{vehicle_vin}');
                   '''.format(vehicle_vin = vin)
                )
    seller_dict = dict(zip(seller_details, cursor.fetchone()))

    cursor.close()
    conn.close()
    
    purchase_details = {}
    purchase_details['transaction_info'] = transaction_dict
    purchase_details ['clerk_info'] = clerk_dict 
    purchase_details ['seller_info'] = seller_dict

    return purchase_details

# Manager or owner
def get_sale_details(vin):
    conn = database.get_db_connection()
    cursor = conn.cursor()
    
    transaction_details = ["sale_date "]
    salesperson_details = ["first_name", "last_name"]
    buyer_details = ["first_name","last_name", "title", "business_name", "email", "phone_number", "street", "city", "state", "postal_code" ]
    

    cursor.execute('''
                   SELECT sale_date FROM "Sell" WHERE vin= '{vehicle_vin}';
                   '''.format(vehicle_vin = vin)
                )
    result = cursor.fetchone()
    if result is None:
        transaction_dict = dict( zip(transaction_details, [None] * len(transaction_details) ) )
        salesperson_dict = dict( zip(salesperson_details, [None] * len(salesperson_details) ) )
        buyer_dict = dict( zip(buyer_details,  [None] * len(buyer_details) ) )
    else:
        transaction_dict = dict(zip(transaction_details, result))
    
    
        cursor.execute('''
                       SELECT "Employee".first_name, "Employee".last_name
                       FROM "Employee" INNER JOIN "Sell" ON "Employee".username = "Sell".username
                       WHERE "Sell".vin = '{vehicle_vin}';
                       '''.format(vehicle_vin = vin)
                    )
        salesperson_dict = dict(zip(salesperson_details, cursor.fetchone()))
    
        cursor.execute('''
                       SELECT first_name, last_name, title, business_name, email, phone_number, street, city, state, postal_code
                       FROM "Customer" INNER JOIN
                       (
                        SELECT customerid, first_name, last_name, title, business_name 
                        FROM "CustomerBusiness" 
                        Union
                        SELECT customerid, first_name, last_name, Null as title, Null as business_name 
                        FROM "CustomerIndividual"
                       ) n
                       ON "Customer".customerid = n.customerid
                       WHERE "Customer".customerid IN (SELECT "Sell".customerid FROM "Sell" WHERE vin = '{vehicle_vin}');
                       '''.format(vehicle_vin = vin)
                    )
        buyer_dict = dict(zip(buyer_details, cursor.fetchone()))

    cursor.close()
    conn.close()
    
    sale_details = {}
    sale_details['transaction_info'] = transaction_dict
    sale_details ['salesman_info'] = salesperson_dict 
    sale_details ['buyer_info'] = buyer_dict

    return sale_details

def Is_car_sold(vin):
    conn = database.get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('''
                   SELECT sale_date FROM "Sell" WHERE vin= '{vehicle_vin}';
                   '''.format(vehicle_vin = vin)
                )
    result = cursor.fetchall()
    cursor.close()
    conn.close()
    
    if  result is not None:
        return True
    
    return False

# clerk 
def get_vehicle_status(user_name):
    conn = database.get_db_connection()
    cursor = conn.cursor()
    my_purchased_vehicle = {}
    
    cursor.execute('''
                   SELECT COUNT(vin) AS available 
                   FROM "Buy" 
                   WHERE "Buy".username = '{employee_username}' AND 
                   "Buy".vin NOT IN 
                   (
                    SELECT vin FROM "Sell"
                    UNION
                    SELECT vin FROM "Part" WHERE status NOT IN('ordered', 'received')
                   );
                   '''.format(vehicle_vin = user_name)
                )
    my_purchased_vehicle['count_available_for_purchase'] = cursor.fetchone()[0]
 
    
    cursor.execute('''
                   SELECT COUNT(vin) AS pending 
                   FROM "Buy"  
                   WHERE "Buy".username = '{employee_username}' AND 
                   "Buy".vin NOT IN (SELECT vin FROM "Sell") AND
                   "Buy".vin IN (SELECT vin FROM "Part" WHERE status IN ('ordered', 'received')
                   );
                   '''.format(vehicle_vin = user_name)
                )
    my_purchased_vehicle['count_with_pending_parts'] = cursor.fetchone()[0]


    cursor.close()
    conn.close()
    
    return my_purchased_vehicle


def collect_info(vin):
    vehicle = VehicleDetails()

    vehicle_dict = public_vehicle_details(vin)
    vehicle.set_general_info(vehicle_dict)
    
    parts_details = get_parts_list(vin)
    vehicle.set_parts_details(parts_details)
    
    purchase_details = get_purchase_details(vin)
    vehicle.set_purchase_details(purchase_details)

    sale_details = get_sale_details(vin)
    vehicle.set_sale_details(sale_details)
 
    return vehicle
