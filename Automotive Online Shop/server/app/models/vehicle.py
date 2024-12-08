class Vehicle:
    def __init__(self, vin, manufacturer, model_name, model_year, fuel_type, color, mileage, description, condition, type):
        self.vin = vin
        self.manufacturer = manufacturer
        self.model_name = model_name
        self.model_year = model_year
        self.fuel_type = fuel_type
        self.color = color
        self.mileage = mileage
        self.description = description
        self.condition = condition
        self.type = type

    # This method can be used for instantiating from request data
    @staticmethod
    def from_dict(data):
        return Vehicle(**data)

    # This method facilitates easy conversion to a dict for JSON serialization
    def to_dict(self):
        return vars(self)
