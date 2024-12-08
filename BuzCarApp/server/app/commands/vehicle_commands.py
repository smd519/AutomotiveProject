from ..utils import database


def create_vehicle(vehicle):
    conn = database.get_db_connection()
    cursor = conn.cursor()

    # Create the Vehicle
    cursor.execute('''
    INSERT INTO "Vehicle" (vin, model_name, manufacturer, model_year, fuel_type, mileage, description, condition, type)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    ''', (
        vehicle.vin,
        vehicle.model_name,
        vehicle.manufacturer,
        vehicle.model_year,
        vehicle.fuel_type,
        vehicle.mileage,
        vehicle.description,
        vehicle.condition,
        vehicle.type
    ))

    # Create the associated colors in VehicleColor table
    for color in vehicle.color:
        cursor.execute('''INSERT INTO "VehicleColor" (vin, color) VALUES (%s, %s)''', (vehicle.vin, color))

    conn.commit()
    cursor.close()
    conn.close()
    return vehicle


def update_vehicle(vin, vehicle):
    # Confirm both VIN present in the request and body are the same
    if vin != vehicle.vin:
        return f"VIN {vin} in request does not match the VIN in body: {vehicle.vin}"

    conn = database.get_db_connection()
    cursor = conn.cursor()

    # Execute the update query with the new values
    cursor.execute('''
    UPDATE "Vehicle"
    SET model_name = %s, 
        manufacturer = %s, 
        model_year = %s, 
        fuel_type = %s, 
        mileage = %s, 
        description = %s, 
        condition = %s, 
        type = %s
    WHERE vin = %s;
    ''', (
        vehicle.model_name,
        vehicle.manufacturer,
        vehicle.model_year,
        vehicle.fuel_type,
        vehicle.mileage,
        vehicle.description,
        vehicle.condition,
        vehicle.type,
        vehicle.vin  # We are expecting the VIN to be present in the request
    ))
    # Check how many rows were updated
    updated_rows = cursor.rowcount

    if updated_rows < 1:
        return f"No vehicle with VIN {vin} was found to update."

    # Delete the previous Color first
    cursor.execute('''DELETE FROM "VehicleColor" WHERE vin = %s''', (vehicle.vin,))

    # Create the associated colors in VehicleColor table
    for color in vehicle.color:
        cursor.execute('''INSERT INTO "VehicleColor" (vin, color) VALUES (%s, %s)''', (vehicle.vin, color))

    conn.commit()



    cursor.close()
    conn.close()

    return vehicle


def delete_vehicle(vin):
    pass
