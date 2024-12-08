class ReportPartsStatistics:
    
    def __init__(self, vendor_name, total_parts, total_cost):
        self.vendor_name = vendor_name
        self.total_parts = total_parts
        self.total_cost = total_cost

    # This method can be used for instantiating from request data
    @staticmethod
    def from_dict(data):
        return ReportPartsStatistics(**data)

    # This method facilitates easy conversion to a dict for JSON serialization
    def to_dict(self):
        return vars(self)