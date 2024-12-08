class Vendor:
    def __init__(self, vendor_name, phone_number, street, city, state, postal_code):
        self.vendor_name = vendor_name
        self.phone_number = phone_number
        self.street = street
        self.city = city
        self.state = state
        self.postal_code = postal_code

    @staticmethod
    def from_dict(data):
        return Vendor(**data)

    # This method facilitates easy conversion to a dict for JSON serialization
    def to_dict(self):
        return vars(self)
