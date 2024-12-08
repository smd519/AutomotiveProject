class VehicleDetails:
    def __init__(self):
        self.general_details = dict()
        self.parts_details = dict()
        self.purchase_details = dict()
        self.sale_details = dict()
        
    def set_general_info(self, data_dict):
        details_list = ["vin", "type", "manufacturer","model_name", "model_year", "fuel_type", "mileage", "description", "condition", "color", "sale_price"]
        self.general_details = {key: data_dict[key] for key in details_list}
        

    def set_parts_details(self, data_list):
        self.parts_details = data_list
 
    def set_purchase_details(self, data_dict):
        self.purchase_details = data_dict
        
    def set_sale_details(self, data_dict):
        self.sale_details = data_dict
        
    # This method can be used for instantiating from request data
    @staticmethod
    def from_dict(data):
        return VehicleDetails(**data)

    # This method facilitates easy conversion to a dict for JSON serialization
    def to_dict(self):
        return vars(self)

# vin, manufacturer, model_name, model_year, fuel_type, color, mileage, description, condition, type