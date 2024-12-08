from ..queries.reports_queries import get_parts_statistics_report_data, get_price_per_condition_report_data, get_avg_time_in_inventory_report_data, get_seller_history_report_data

class ReportsService:
    def get_parts_statistics_report(self):
        return get_parts_statistics_report_data()
    
    def get_price_per_condition(self):
        return get_price_per_condition_report_data()
    
    def get_avg_time_in_inventory(self):
        return get_avg_time_in_inventory_report_data()
    
    def get_seller_history(self):
        return get_seller_history_report_data()