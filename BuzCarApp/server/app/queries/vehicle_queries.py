from ..utils import database
from ..models.vehicle import Vehicle
from ..models.vehicle_type import VehicleType
from ..models.vehicle_manufacturer import  VehicleManufacturer



def get_vehicle(vin):
    conn = database.get_db_connection()
    cursor = conn.cursor()

    # Query to get vehicle details
    cursor.execute('''SELECT * FROM "Vehicle" WHERE vin = %s''', (vin,))
    vehicle_row = cursor.fetchone()

    # Fetch column names from cursor.description for vehicle
    vehicle_col_names = [desc[0] for desc in cursor.description]

    # Get associated colors for the vehicle
    cursor.execute('''SELECT color FROM "VehicleColor" WHERE vin = %s''', (vin,))
    colors = cursor.fetchall()  # This will return a list of tuples

    # Extract just the color strings from the tuples
    color_list = [color[0] for color in colors]

    cursor.close()
    conn.close()

    if vehicle_row:
        # Construct a dictionary for vehicle details
        vehicle_dict = dict(zip(vehicle_col_names, vehicle_row))
        # Add the color list to the vehicle dictionary
        vehicle_dict['color'] = color_list

        # Construct Vehicle
        vehicle = Vehicle.from_dict(vehicle_dict)
        return vehicle
    return None


def get_all_vehicles():
    conn = database.get_db_connection()
    cursor = conn.cursor()

    # Query to get vehicle details
    query = 'SELECT * FROM "Vehicle"'
    cursor.execute(query)

    raw_vehicle = cursor.fetchall() # This will return a list of tuples


    col_names = [desc[0] for desc in cursor.description]
    vehicle_dict = [dict(zip(col_names, vehicle)) for vehicle in raw_vehicle]

    vehicle_list = []
    for vehicle in vehicle_dict:
        cursor.execute('''SELECT color FROM "VehicleColor" WHERE vin = %s''', (vehicle['vin'],))
        colors = cursor.fetchall()
        color_list = [color[0] for color in colors]
        vehicle['color'] = color_list
        # Construct Vehicle  and add it to the vehicle list
        vehicle_list.append(Vehicle.from_dict(vehicle))
    cursor.close()
    conn.close()
    return vehicle_list

def get_all_vehicle_types():
    conn = database.get_db_connection()
    cursor = conn.cursor()

    # Query to get vehicle details
    query = 'SELECT * FROM "VehicleType"'
    cursor.execute(query)

    raw_vehicle_types = cursor.fetchall()  # This will return a list of tuples
    raw_vehicle_types_list = [type[0] for type in raw_vehicle_types]

    vehicle_types_list = []
    for type in raw_vehicle_types_list:
        vehicle_types_list.append(VehicleType(type))

    return vehicle_types_list


def get_all_vehicle_manufacturer():
    conn = database.get_db_connection()
    cursor = conn.cursor()

    # Query to get vehicle details
    query = 'SELECT * FROM "VehicleManufacturer"'
    cursor.execute(query)

    raw_vehicle_manufacturer= cursor.fetchall()  # This will return a list of tuples
    raw_vehicle_manufacturer_list = [manufacturer[0] for manufacturer in raw_vehicle_manufacturer]

    vehicle_manufacturer_list = []
    for manufacturer in raw_vehicle_manufacturer_list:
        vehicle_manufacturer_list.append(VehicleManufacturer(manufacturer))

    return vehicle_manufacturer_list