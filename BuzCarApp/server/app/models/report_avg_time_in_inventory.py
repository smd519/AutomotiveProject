class AvgTimeInInventory:
    
    def __init__(self, vehicle_type, average_days):
        self.vehicle_type = vehicle_type
        self.average_days = average_days

    # This method can be used for instantiating from request data
    @staticmethod
    def from_dict(data):
        return AvgTimeInInventory(**data)

    # This method facilitates easy conversion to a dict for JSON serialization
    def to_dict(self):
        return vars(self)