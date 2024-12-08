from ..queries.employee_details import is_employee, get_details

class EmployeeService:
     def fetch_details(self, username):
        return get_details(username)

     def verify_credntial(self, username, password):
        return is_employee(username, password) 