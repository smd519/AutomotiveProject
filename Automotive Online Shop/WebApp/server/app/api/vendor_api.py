from flask import Blueprint, request, jsonify
from ..services.vendor_service import VendorService

vendor_api = Blueprint('vendor_api', __name__)
vendor_service = VendorService()

@vendor_api.route('/vendors', methods=['GET'])
def get_vendors():
    vendor_objects = vendor_service.fetch_all_vendors()
    vendor_dict_list = [vendor.to_dict() for vendor in vendor_objects]
    return jsonify(vendor_dict_list), 200


@vendor_api.route('/vendors/<string:name>', methods=['GET'])
def get_vendors_by_name(name):
    vendor_objects = vendor_service.fetch_vendors_by_name(name)
    vendor_dict_list = [vendor.to_dict() for vendor in vendor_objects]
    return jsonify(vendor_dict_list), 200
