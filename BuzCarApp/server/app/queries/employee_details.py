from ..utils import database
from ..models.employee import Employee


## To verify if the combination of username and passowrd exist
def is_employee(user_name, password):
    conn = database.get_db_connection()
    cursor = conn.cursor()
   
    cursor.execute('''
                   SELECT 'Found' AS match FROM "Employee" WHERE username= '{employee_username}' and password = '{employee_password}';               
                   '''.format(employee_username = user_name, employee_password = password )
                   )
    result = cursor.fetchone()
    cursor.close()
    conn.close()
    
    if result is not None:
        return True

    return False


## to pull the employee information
def get_details(user_name):
    conn = database.get_db_connection()
    cursor = conn.cursor()
    details_list = ["username", "first_name", "last_name"]
    employee_dict = {}

    cursor.execute('''
                   SELECT username, first_name, last_name FROM "Employee" WHERE username= '{employee_username}';               
                   '''.format(employee_username = user_name)
                   )
    results = cursor.fetchone()
    employee_dict = dict( zip(details_list, results) )
    
    
    cursor.execute('''
                   SELECT 'CLERK' AS role FROM "EmployeeInventoryClerk" WHERE username= '{employee_username}' 
                   UNION
                   SELECT 'SALESPERSON' AS role FROM "EmployeeSalesperson" WHERE username= '{employee_username}' 
                   UNION
                   SELECT 'MANAGER' AS role FROM "EmployeeManager" WHERE username= '{employee_username}';
                   '''.format(employee_username = user_name)
                   )
    
    results = cursor.fetchall()
    if len(results) == 3:
        employee_dict['role'] = 'OWNER'
    else:
        employee_dict['role'] = results[0][0]
        
    cursor.close()
    conn.close()

    # Construct Employee
    employee = Employee.from_dict(employee_dict)
    return employee


