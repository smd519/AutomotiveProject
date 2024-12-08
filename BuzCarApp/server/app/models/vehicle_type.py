class VehicleType:

    def __init__(self, type):
        self.type = type

    @staticmethod
    def from_dict(data):
        return VehicleType(**data)

    # This method facilitates easy conversion to a dict for JSON serialization
    def to_dict(self):
        return vars(self)