from ..commands.vehicle_commands import create_vehicle, update_vehicle, delete_vehicle
from ..queries.vehicle_queries import get_vehicle, get_all_vehicles, get_all_vehicle_types, get_all_vehicle_manufacturer
from ..queries.vehicle_details import collect_info

class VehicleService:
    def add_vehicle(self, vehicle):
        return create_vehicle(vehicle)

    def modify_vehicle(self, vin, vehicle):
        return update_vehicle(vin, vehicle)

    def remove_vehicle(self, vin):
        return delete_vehicle(vin)

    def fetch_vehicle(self, vin):
        return get_vehicle(vin)

    def fetch_all_vehicles(self):
        return get_all_vehicles()

    def fetch_all_vehicle_types(self):
        return get_all_vehicle_types()

    def fetch_all_vehicle_manufacturer(self):
        return get_all_vehicle_manufacturer()
    
    # Sajjad
    def fetch_details(self, vin):
        return collect_info(vin)