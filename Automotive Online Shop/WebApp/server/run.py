from flask import Flask
from app.api.vehicle_api import vehicle_api
from app.api.vendor_api import vendor_api
from app.api.reports_api import reports_api
from app.api.employee_api import employee_api
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.register_blueprint(vehicle_api, url_prefix='/api')
app.register_blueprint(vendor_api, url_prefix='/api')
app.register_blueprint(reports_api, url_prefix='/api')
app.register_blueprint(employee_api, url_prefix='/api')

if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0', port=8000)
