from flask import Blueprint, request, jsonify
from ..services.reports_service import ReportsService

reports_api = Blueprint('reports_api', __name__)
reports_service = ReportsService()

@reports_api.route('/report/parts-statistics', methods=['GET'])
def get_report_parts_statistics():
    report_parts_statistics_obj = reports_service.get_parts_statistics_report()
    statistics_data_list = [statistics_data_list.to_dict() for statistics_data_list in report_parts_statistics_obj]
    return jsonify(statistics_data_list), 200

@reports_api.route('/report/price-per-condition', methods=['GET'])
def get_price_per_condition():
    report_price_per_condition_obj = reports_service.get_price_per_condition()
    price_per_condition_data_list = [price_per_condition_data_list.to_dict() for price_per_condition_data_list in report_price_per_condition_obj]
    return jsonify(price_per_condition_data_list), 200

@reports_api.route('/report/avg-time-in-inventory', methods=['GET'])
def get_avg_time_in_inventory():
    report_avg_time_in_inventory_obj = reports_service.get_avg_time_in_inventory()
    avg_time_in_inventory_data_list = [avg_time_in_inventory_data_list.to_dict() for avg_time_in_inventory_data_list in report_avg_time_in_inventory_obj]
    return jsonify(avg_time_in_inventory_data_list), 200

@reports_api.route('/report/seller-history', methods=['GET'])
def get_seller_history():
    report_seller_history_obj = reports_service.get_seller_history()
    seller_history_data_list = [seller_history_data_list.to_dict() for seller_history_data_list in report_seller_history_obj]
    return jsonify(seller_history_data_list), 200