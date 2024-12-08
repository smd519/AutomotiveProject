# Commands

### Create Vehicle
```json
POST /api/vehicles
```
Body:
```json
{
  "vin": "9999G35765A484905",
  "model_name": "Pilot",
  "manufacturer": "Honda",
  "model_year": 2000,
  "fuel_type": "Gas",
  "mileage": 400000,
  "color": ["Orange", "Black"],
  "description": "Used",
  "condition": "Excellent",
  "type": "SUV"
}
```
### Update Vehicle
```json
PUT /api/vehicle/<VIN>
```
Body:
```json
{
  "vin": "9999G35765A484905",
  "model_name": "Pilot",
  "manufacturer": "Honda",
  "model_year": 2000,
  "fuel_type": "Gas",
  "mileage": 400000,
  "color": ["Red", "Pink"],
  "description": "Used",
  "condition": "Excellent",
  "type": "SUV"
}
```
# Queries
### View Vehicle

```json
GET /api/vehicles/<VIN>
```

### View All Vehicles
```json
GET /api/vehicles
```

### View Vehicle Type
```json
GET /api/vehicles/type
```
### View Vehicle Manufacturer
```json
GET /api/vehicles/manufacturer
```

### Get ALL Vendors
```json
GET /api/vendors
```

### Get Vendor by Name
```json
GET /api/vendors/<name>
```

### View Vehicle Details by VIN
```json
GET /api/vehicles/details/<VIN>
```

### Login to Application
```json
POST /api/login
```
Body:
```json
{
  "username": "clerk",
  "password": "pass2"
}
```

* Note: this endpoint support lower case and matches all names that is in `%name%` format. Useful for typeaheads.