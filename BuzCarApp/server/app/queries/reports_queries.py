from ..utils import database
from ..models.report_parts_statistics import ReportPartsStatistics
from ..models.report_price_per_condition import PricePerCondition
from ..models.report_avg_time_in_inventory import AvgTimeInInventory
from ..models.report_seller_history import SellerHistory

def get_parts_statistics_report_data():
    conn = database.get_db_connection()
    cursor = conn.cursor()

    # Query to get parts statistics report data
    query = 'SELECT v.vendor_name, sum(p.quantity) as total_parts, sum(p.cost*p.quantity) as total_cost ' \
                'FROM "Vendor" v INNER JOIN "PartsOrder" po ON v.vendor_name = po.vendor_name ' \
                'INNER JOIN "Part" p ON po.vin = p.vin AND po.ordinal = p.ordinal '\
                'GROUP BY v.vendor_name'
    cursor.execute(query)
    report_results = cursor.fetchall()

    col_names = [desc[0] for desc in cursor.description]
    results_dict = [dict(zip(col_names, statistics)) for statistics in report_results]

    statistics_data_list = []
    for statistics in results_dict:
        statistics_data_list.append(ReportPartsStatistics.from_dict(statistics))

    cursor.close()
    conn.close()

    return statistics_data_list

def get_price_per_condition_report_data():
    conn = database.get_db_connection()
    cursor = conn.cursor()

    # Query to get price per condition report data
    query = """SELECT pt.type as vehicle_type, \
            COALESCE(sum(case when pt.condition = 'Excellent' then round(pt.avg_purchase_price,2) end),trunc(0)) excellent,\
            COALESCE(sum(case when pt.condition = 'Very Good' then round(pt.avg_purchase_price,2) end),trunc(0)) "very_good",\
            COALESCE(sum(case when pt.condition = 'Good' then round(pt.avg_purchase_price,2) end),trunc(0)) good,\
            COALESCE(sum(case when pt.condition = 'Fair' then round(pt.avg_purchase_price,2) end),trunc(0)) fair \
            FROM \
            (SELECT vt.type, v.condition, avg(b.purchase_price) as "avg_purchase_price" \
            FROM "Vehicle" v \
            RIGHT JOIN "VehicleType" vt on vt.type = v.type \
            LEFT JOIN "Buy" b on b.vin = v.vin \
            GROUP BY v.condition, vt.type \
            ) pt GROUP BY pt.type"""
    cursor.execute(query)
    report_results = cursor.fetchall()
    col_names = [desc[0] for desc in cursor.description]
    results_dict = [dict(zip(col_names, pricepercondition)) for pricepercondition in report_results]

    pricepercondition_data_list = []
    for pricepercondition in results_dict:
        pricepercondition_data_list.append(PricePerCondition.from_dict(pricepercondition))

    cursor.close()
    conn.close()

    return pricepercondition_data_list


def get_avg_time_in_inventory_report_data():
    conn = database.get_db_connection()
    cursor = conn.cursor()

    # Query to get average time in inventory report data
    query = """ (SELECT v.type AS vehicle_type, avg(date_part('day', s.sale_date - b.purchase_date))::text as average_days
                    FROM "Vehicle" v
                    INNER JOIN "Buy" b ON v.vin = b.vin
                    INNER JOIN "Sell" s ON v.vin = s.vin
                    GROUP BY v.type)
                    UNION
                    select t.vehicle_type, 'N/A' AS average_days from
                    ((SELECT DISTINCT vt.type AS vehicle_type
                    FROM "VehicleType" vt
                    WHERE vt.type 
                    NOT IN (SELECT distinct type FROM "Vehicle" v))
                    union
                    (select distinct type from "VehicleType" v where v.type in 
                    (select distinct v2.type from "Vehicle" v2 where v2.vin not in (select s.vin from "Sell" s))
                    except
                    (select distinct v2.type from "Vehicle" v2 where v2.vin in (select s.vin from "Sell" s)))) t"""
    cursor.execute(query)
    report_results = cursor.fetchall()
    col_names = [desc[0] for desc in cursor.description]
    results_dict = [dict(zip(col_names, avgtimeininventory)) for avgtimeininventory in report_results]

    avgtimeininventory_data_list = []
    for avgtimeininventory in results_dict:
        avgtimeininventory_data_list.append(AvgTimeInInventory.from_dict(avgtimeininventory))

    cursor.close()
    conn.close()

    return avgtimeininventory_data_list


def get_seller_history_report_data():
    conn = database.get_db_connection()
    cursor = conn.cursor()

    # Query to get average time in inventory report data
    query = """ SELECT b.customerid ,   
                    case when ci.first_name is null then cb.business_name else CONCAT(ci.first_name, ' ', ci.last_name) end AS customer_name,
                    COUNT(b.vin) AS vehicles_sold, round(AVG(b.purchase_price),2) AS avg_purchase_price, 
                    round(MAX(p.avgquantity),2) AS avg_quantity, round(MAX(p.avgcost),2)  AS avg_parts_cost
                    FROM "Buy" b 
                    LEFT JOIN "CustomerIndividual" ci ON b.customerid = ci.customerid
                    LEFT JOIN "CustomerBusiness" cb ON b.customerid = cb.customerid
                    LEFT JOIN (Select vin, AVG(quantity) as avgquantity, AVG(cost*quantity) as avgcost from "Part" p 
                    GROUP BY vin) p ON p.vin = b.vin
                    GROUP BY b.customerid, customer_name
                    ORDER BY vehicles_sold DESC, avg_purchase_price ASC"""
    cursor.execute(query)
    report_results = cursor.fetchall()
    col_names = [desc[0] for desc in cursor.description]
    results_dict = [dict(zip(col_names, seller_history)) for seller_history in report_results]

    seller_history_data_list = []
    for seller_history in results_dict:
        seller_history_data_list.append(SellerHistory.from_dict(seller_history))

    cursor.close()
    conn.close()

    return seller_history_data_list



