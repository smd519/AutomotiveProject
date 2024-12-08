class VehicleManufacturer:

    def __init__(self, manufacturer):
        self.manufacturer = manufacturer

    @staticmethod
    def from_dict(data):
        return VehicleManufacturer(**data)

    # This method facilitates easy conversion to a dict for JSON serialization
    def to_dict(self):
        return vars(self)