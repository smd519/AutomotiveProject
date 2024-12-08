from ..queries.vendor_queries import get_vendors_by_name, get_all_vendors

class VendorService:

    def fetch_vendors_by_name(self, vendor):
        return get_vendors_by_name(vendor)

    def fetch_all_vendors(self):
        return get_all_vendors()