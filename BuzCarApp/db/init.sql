-- First, we drop the database if it exists
DROP DATABASE IF EXISTS cs6400_fall23_team060; 

-- Now we create the database with the specified collation
CREATE DATABASE cs6400_fall23_team060
    WITH ENCODING 'UTF8'
    LC_COLLATE='en_US.utf8'
    LC_CTYPE='en_US.utf8'
    TEMPLATE=template0;


-- Connect to the database
\c cs6400_fall23_team060;

-- ENUMS
CREATE TYPE fuel_type AS ENUM ('Gas', 'Diesel', 'Natural Gas', 'Hybrid', 'Plugin Hybrid', 'Battery', 'Fuel Cell');
CREATE TYPE condition_type AS ENUM ('Excellent', 'Very Good', 'Good', 'Fair');
CREATE TYPE part_status AS ENUM ('ordered', 'received', 'installed');


-- Tables

-- Table `VehicleType`
CREATE TABLE "VehicleType" (
  "type" VARCHAR(45) NOT NULL,
  PRIMARY KEY ("type")
);

-- Table `VehicleManufacturer`
CREATE TABLE "VehicleManufacturer" (
  "manufacturer" VARCHAR(45) NOT NULL,
  PRIMARY KEY ("manufacturer")
);

-- Table `Vehicle`
CREATE TABLE "Vehicle" (
  "vin" CHAR(17) NOT NULL,
  "type" VARCHAR(45) NOT NULL,
  "manufacturer" VARCHAR(45) NOT NULL,
  "model_name" VARCHAR(45) NOT NULL,
  "model_year" INT NOT NULL,
  "fuel_type" fuel_type NOT NULL,
  "mileage" INT NOT NULL,
  "description" VARCHAR(250),
  "condition" condition_type NOT NULL,
  PRIMARY KEY ("vin"),
  FOREIGN KEY ("type") REFERENCES "VehicleType" ("type") ON DELETE CASCADE,
  FOREIGN KEY ("manufacturer") REFERENCES "VehicleManufacturer" ("manufacturer") ON DELETE CASCADE
);

-- Table `VehicleColor`
CREATE TABLE "VehicleColor" (
  "vin" CHAR(17) NOT NULL,
  "color" VARCHAR(45) NOT NULL,
  PRIMARY KEY ("vin", "color"),
  FOREIGN KEY ("vin") REFERENCES "Vehicle" ("vin") ON DELETE CASCADE
);

-- Table `Vendor`
CREATE TABLE "Vendor" (
  "vendor_name" VARCHAR(100) NOT NULL,
  "phone_number" VARCHAR(16) NOT NULL,
  "street" VARCHAR(45) NOT NULL,
  "city" VARCHAR(45) NOT NULL,
  "state" VARCHAR(45) NOT NULL,
  "postal_code" VARCHAR(16) NOT NULL,
  PRIMARY KEY ("vendor_name")
);

-- Table `PartsOrder`
CREATE TABLE "PartsOrder" (
  "vin" CHAR(17) NOT NULL,
  "ordinal" CHAR(3) NOT NULL,
  "vendor_name" VARCHAR(45) NOT NULL,
  PRIMARY KEY ("vin", "ordinal"),
  FOREIGN KEY ("vin") REFERENCES "Vehicle" ("vin") ON DELETE CASCADE,
  FOREIGN KEY ("vendor_name") REFERENCES "Vendor" ("vendor_name") ON DELETE CASCADE
);

-- Table `Part`
CREATE TABLE "Part" (
  "vin" CHAR(17) NOT NULL,
  "ordinal" CHAR(3) NOT NULL,
  "part_number" VARCHAR(45) NOT NULL,
  "quantity" INT NOT NULL,
  "status" part_status NOT NULL,
  "cost" DECIMAL(8,2) NOT NULL,
  "description" VARCHAR(250),
  PRIMARY KEY ("vin", "ordinal", "part_number"),
  FOREIGN KEY ("vin") REFERENCES "Vehicle" ("vin") ON DELETE CASCADE,
  FOREIGN KEY ("vin", "ordinal") REFERENCES "PartsOrder" ("vin", "ordinal") ON DELETE CASCADE
);

-- Table `Customer`
CREATE TABLE "Customer" (
  "customerid" SERIAL PRIMARY KEY,
  "email" VARCHAR(45),
  "phone_number" VARCHAR(16) NOT NULL,
  "street" VARCHAR(45) NOT NULL,
  "city" VARCHAR(45) NOT NULL,
  "state" VARCHAR(45) NOT NULL,
  "postal_code" VARCHAR(16) NOT NULL
);

-- Table `CustomerIndividual`
CREATE TABLE "CustomerIndividual" (
  "driver_license_number" CHAR(16) NOT NULL,
  "customerid" INT NOT NULL,
  "first_name" VARCHAR(64) NOT NULL,
  "last_name" VARCHAR(64) NOT NULL,
  PRIMARY KEY ("driver_license_number"),
  FOREIGN KEY ("customerid") REFERENCES "Customer" ("customerid") ON DELETE CASCADE
);

-- Table `CustomerBusiness`
CREATE TABLE "CustomerBusiness" (
  "tax_id_number" CHAR(16) NOT NULL,
  "customerid" INT NOT NULL,
  "business_name" VARCHAR(100) NOT NULL,
  "title" VARCHAR(64) NOT NULL,
  "first_name" VARCHAR(64) NOT NULL,
  "last_name" VARCHAR(64) NOT NULL,
  PRIMARY KEY ("tax_id_number"),
  FOREIGN KEY ("customerid") REFERENCES "Customer" ("customerid") ON DELETE CASCADE
);

-- Table `Employee`
CREATE TABLE "Employee" (
  "username" VARCHAR(16) NOT NULL,
  "password" VARCHAR(16) NOT NULL,
  "first_name" VARCHAR(64) NOT NULL,
  "last_name" VARCHAR(64) NOT NULL,
  PRIMARY KEY ("username")
);

-- Table `EmployeeInventoryClerk`
CREATE TABLE "EmployeeInventoryClerk" (
  "username" VARCHAR(16) NOT NULL,
  PRIMARY KEY ("username"),
  FOREIGN KEY ("username") REFERENCES "Employee" ("username") ON DELETE CASCADE
);

-- Table `EmployeeSalesperson`
CREATE TABLE "EmployeeSalesperson" (
  "username" VARCHAR(16) NOT NULL,
  PRIMARY KEY ("username"),
  FOREIGN KEY ("username") REFERENCES "Employee" ("username") ON DELETE CASCADE
);

-- Table `EmployeeManager`
CREATE TABLE "EmployeeManager" (
  "username" VARCHAR(16) NOT NULL,
  PRIMARY KEY ("username"),
  FOREIGN KEY ("username") REFERENCES "Employee" ("username") ON DELETE CASCADE
);

-- Table `Sell`
CREATE TABLE "Sell" (
  "vin" CHAR(17) NOT NULL,
  "customerid" INT NOT NULL,
  "username" VARCHAR(16) NOT NULL,
  "sale_date" TIMESTAMP NOT NULL,
  PRIMARY KEY ("vin"),
  FOREIGN KEY ("vin") REFERENCES "Vehicle" ("vin") ON DELETE CASCADE,
  FOREIGN KEY ("customerid") REFERENCES "Customer" ("customerid") ON DELETE CASCADE,
  FOREIGN KEY ("username") REFERENCES "Employee" ("username") ON DELETE CASCADE
);

-- Table `Buy`
CREATE TABLE "Buy" (
  "vin" CHAR(17) NOT NULL,
  "customerid" INT NOT NULL,
  "username" VARCHAR(16) NOT NULL,
  "purchase_date" TIMESTAMP NOT NULL,
  "purchase_price" DECIMAL(12,2) NOT NULL,
  PRIMARY KEY ("vin"),
  FOREIGN KEY ("vin") REFERENCES "Vehicle" ("vin") ON DELETE CASCADE,
  FOREIGN KEY ("customerid") REFERENCES "Customer" ("customerid") ON DELETE CASCADE,
  FOREIGN KEY ("username") REFERENCES "Employee" ("username") ON DELETE CASCADE
);

-- Populate VehicleManufacturer
INSERT INTO "VehicleManufacturer" ("manufacturer") VALUES 
('Acura'),
('Alfa Romeo'),
('Aston Martin'),
('Audi'),
('Bentley'),
('BMW'),
('Buick'),
('Cadillac'),
('Chevrolet'),
('Chrysler'),
('Dodge'),
('Ferrari'),
('FIAT'),
('Ford'),
('Geeley'),
('Genesis'),
('GMC'),
('Honda'),
('Hyundai'),
('INFINITI'),
('Jaguar'),
('Jeep'),
('Karma'),
('Kia'),
('Lamborghini'),
('Land Rover'),
('Lexus'),
('Lincoln'),
('Lotus'),
('Maserati'),
('MAZDA'),
('McLaren'),
('Mercedes-Benz'),
('MINI'),
('Mitsubishi'),
('Nissan'),
('Nio'),
('Porsche'),
('Ram'),
('Rivian'),
('Rolls-Royce'),
('smart'),
('Subaru'),
('Tesla'),
('Toyota'),
('Volkswagen'),
('Volvo'),
('XPeng');

-- Populate VehicleType
INSERT INTO "VehicleType" ("type") VALUES 
('Sedan'),
('Coupe'),
('Convertible'),
('Truck'),
('Van'),
('Minivan'),
('SUV'),
('Other');