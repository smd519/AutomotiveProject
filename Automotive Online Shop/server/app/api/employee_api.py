from flask import Blueprint, request, jsonify, redirect, url_for
from ..services.employee_service import EmployeeService
from ..models.employee import Employee

employee_api = Blueprint('employee_api', __name__)
employee_service = EmployeeService()

@employee_api.route('/login', methods=['POST'])
def login():
    credential_data = request.json
    username = credential_data['username']
    password = credential_data['password']

    
    # returns True if the combination of username and password exists in the Employee table
    is_employee = employee_service.verify_credntial(username, password)
    
    if  is_employee is False:
        return {"msg": "Wrong username or password"}, 401
        #return redirect('/reports') # return to  home page


    else:
        employee = employee_service.fetch_details(username)
        # retun first_name, last_name, role.
        # to be used in top-corner as 'Sajjad Mosharraf, Manager'
        return jsonify(employee.to_dict()), 200