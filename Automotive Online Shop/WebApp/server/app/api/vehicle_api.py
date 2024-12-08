from flask import Blueprint, request, jsonify
from ..services.vehicle_service import VehicleService
from ..models.vehicle import Vehicle
from ..models.vehicle_details import VehicleDetails

vehicle_api = Blueprint('vehicle_api', __name__)
vehicle_service = VehicleService()


@vehicle_api.route('/vehicles', methods=['POST'])
def add_vehicle():
    vehicle_data = request.json
    vehicle = Vehicle(**vehicle_data)
    created_vehicle = vehicle_service.add_vehicle(vehicle)
    return jsonify(created_vehicle.to_dict()), 201


@vehicle_api.route('/vehicles/<string:vin>', methods=['PUT'])
def update_vehicle_api(vin):
    vehicle_data = request.json
    vehicle = Vehicle(**vehicle_data)
    result = vehicle_service.modify_vehicle(vin, vehicle)

    # Check if the result is the updated Vehicle, otherwise return 400
    if isinstance(result, Vehicle):
        return jsonify(result.to_dict()), 200
    else:
        # If the result is a string message, something went wrong
        return jsonify({"error": result}), 400


# TODO: Do we need to support delete functionality?
# @vehicle_api.route('/vehicles/<string:vin>', methods=['DELETE'])
# def delete_vehicle(vin):
#     vehicle_service.remove_vehicle(vin)
#     return '', 204

@vehicle_api.route('/vehicles/<string:vin>', methods=['GET'])
def get_vehicle(vin):
    vehicle = vehicle_service.fetch_vehicle(vin)
    if vehicle:
        return jsonify(vehicle.to_dict()), 200
    return jsonify({'error': 'Vehicle not found'}), 404


@vehicle_api.route('/vehicles', methods=['GET'])
def get_vehicles():
    vehicle_objects = vehicle_service.fetch_all_vehicles()
    vehicles_dict_list = [vehicle.to_dict() for vehicle in vehicle_objects]
    return jsonify(vehicles_dict_list), 200

@vehicle_api.route('/vehicles/type', methods=['GET'])
def get_vehicle_types():
    vehicle_types_objects = vehicle_service.fetch_all_vehicle_types()
    vehicle_types_dict_list = [vehicle.to_dict() for vehicle in vehicle_types_objects]
    return jsonify(vehicle_types_dict_list), 200

@vehicle_api.route('/vehicles/manufacturer', methods=['GET'])
def get_vehicle_manufacturer():
    vehicle_manufacturer_objects = vehicle_service.fetch_all_vehicle_manufacturer()
    vehicle_manufacturer_dict_list = [vehicle.to_dict() for vehicle in vehicle_manufacturer_objects]
    return jsonify(vehicle_manufacturer_dict_list), 200

@vehicle_api.route('/vehicles/details/<string:vin>', methods=['GET'])
def get_vehicle_details(vin):
    vehicle = vehicle_service.fetch_details(vin)
    if vehicle:
        return jsonify(vehicle.to_dict()), 200
    return jsonify({'error': 'Vehicle not found'}), 404