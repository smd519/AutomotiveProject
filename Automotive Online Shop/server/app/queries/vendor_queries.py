from ..utils import database
from ..models.vendor import Vendor

def get_vendors_by_name(vendor):
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM \"Vendor\" WHERE LOWER(\"vendor_name\") LIKE LOWER(%s)",
                   ('%' + vendor + '%',))
    vendors_row = cursor.fetchall()
    col_names = [desc[0] for desc in cursor.description]

    vendor_dict = [dict(zip(col_names, vendor)) for vendor in vendors_row]

    vendor_list = []
    for vendor in vendor_dict:
        vendor_list.append(Vendor.from_dict(vendor))

    return vendor_list

def get_all_vendors():
    conn = database.get_db_connection()
    cursor = conn.cursor()
    query = 'SELECT * FROM "Vendor"'
    cursor.execute(query)
    vendors_row = cursor.fetchall()
    col_names = [desc[0] for desc in cursor.description]

    vendor_dict = [dict(zip(col_names, vendor)) for vendor in vendors_row]

    vendor_list = []
    for vendor in vendor_dict:
        vendor_list.append(Vendor.from_dict(vendor))

    return vendor_list



