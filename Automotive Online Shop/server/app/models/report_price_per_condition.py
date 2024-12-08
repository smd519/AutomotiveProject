class PricePerCondition:
    
    def __init__(self, vehicle_type, excellent, very_good, good, fair):
        self.vehicle_type = vehicle_type
        self.excellent = excellent
        self.very_good = very_good
        self.good = good
        self.fair = fair

    # This method can be used for instantiating from request data
    @staticmethod
    def from_dict(data):
        return PricePerCondition(**data)

    # This method facilitates easy conversion to a dict for JSON serialization
    def to_dict(self):
        return vars(self)