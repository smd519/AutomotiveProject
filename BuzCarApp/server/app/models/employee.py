class Employee:
    def __init__(self, username, first_name, last_name, role):
        self.username = username
        self.first_name = first_name
        self.last_name = last_name
        self.role = role

    # This method can be used for instantiating from request data
    @staticmethod
    def from_dict(data):
        return Employee(**data)

    # This method facilitates easy conversion to a dict for JSON serialization
    def to_dict(self):
        return vars(self)
