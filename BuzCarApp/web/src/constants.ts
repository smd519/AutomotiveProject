export const PAGES = {
  VEHICLE_DETAIL: '/vehicle-detail',
  VEHICLE_SEARCH: '/',
  REPORT_PARTS_STATISTICS: '/report-parts-statistics',
  REPORT_PRICE_PER_CONDITION: '/report-price-per-condition',
  REPORT_AVG_TIME_IN_INVENTORY: '/report-avg-time-in-inventory',
  REPORT_SELLER_HISTORY: '/report-seller-history',
  REPORT_MONTHLY_SALES: '/report-monthly-sales',
} as const;

// TODO: replace this dummy value with a query cuz manufacturer list can change
export const MANUFACTURERS = [
  'Acura',
  'Alfa Romeo',
  'Aston Martin',
  'Audi',
  'Bentley',
  'BMW',
  'Buick',
  'Honda',
];

export const FUEL_TYPE = [
  'Battery',
  'Diesel',
  'Fuel Cell',
  'Gas',
  'Hybrid',
  'Natural Gas',
  'Plugin Hybrid',
];

export const CONDITION = ['Excellent', 'Fair', 'Good', 'Very Good'];

export const VEHICLE_TYPE = [
  'Convertible',
  'Coupe',
  'Minivan',
  'Other',
  'Sedan',
  'SUV',
  'Truck',
  'Van',
];
export const COLOR = [
  'Aluminum',
  'Beige',
  'Black',
  'Blue',
  'Bronze',
  'Brown',
  'Claret',
  'Copper',
  'Cream',
  'Gold',
  'Gray',
  'Green',
  'Maroon',
  'Metallic',
  'Navy',
  'Orange',
  'Pink',
  'Purple',
  'Red',
  'Rose',
  'Rust',
  'Silver',
  'Tan',
  'Turquoise',
  'White',
  'Yellow',
];

// TODO: THESE ARE PLACEHOLDERS, CHANGE AS NEEDED
export const CLERK_ALLOWED_ACTIONS = {
  ADD_VEHICLE: 'ADD_VEHICLE',
  ADD_CUSTOMER: 'ADD_CUSTOMER',
  ENTER_PARTS_ORDER: 'ENTER_PARTS_ORDER',
} as const;

// TODO: THESE ARE PLACEHOLDERS, CHANGE AS NEEDED
export const SALESPERSON_ALLOWED_ACTIONS = {
  SEARCH_INVENTORY: 'SEARCH_INVENTORY',
  ADD_CUSTOMER: 'ADD_CUSTOMER',
  ADD_SALES_TRANSACTION: 'ADD_SALES_TRANSACTION',
} as const;
// TODO: THESE ARE PLACEHOLDERS, CHANGE AS NEEDED
export const MANAGER_ALLOWED_ACTIONS = {
  VIEW_INVENTORY: 'VIEW_INVENTORY',
  VIEW_PURCHASE_HISTORY: 'VIEW_PURCHASE_HISTORY',
  VIEW_SALES_TRANSACTION: 'VIEW_SALES_TRANSACTION',
  VIEW_PARTS_ORDER_HISTORY: 'VIEW_PARTS_ORDER_HISTORY',
  VIEW_REPORTS: 'VIEW_REPORTS',
} as const;

export const OWNER_ALLOWED_ACTIONS = {
  ...CLERK_ALLOWED_ACTIONS,
  ...SALESPERSON_ALLOWED_ACTIONS,
  ...MANAGER_ALLOWED_ACTIONS,
} as const;

export const ROLE_MAP = {
  CLERK: CLERK_ALLOWED_ACTIONS,
  SALESPERSON: SALESPERSON_ALLOWED_ACTIONS,
  MANAGER: MANAGER_ALLOWED_ACTIONS,
  OWNER: OWNER_ALLOWED_ACTIONS,
} as const;
