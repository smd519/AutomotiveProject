class SellerHistory:
    
    def __init__(self, customerid, customer_name, vehicles_sold, avg_purchase_price, avg_quantity, avg_parts_cost):
        self.customerid = customerid
        self.customer_name = customer_name
        self.vehicles_sold = vehicles_sold
        self.avg_purchase_price = avg_purchase_price
        self.avg_quantity = avg_quantity
        self.avg_parts_cost = avg_parts_cost

    # This method can be used for instantiating from request data
    @staticmethod
    def from_dict(data):
        return SellerHistory(**data)

    # This method facilitates easy conversion to a dict for JSON serialization
    def to_dict(self):
        return vars(self)