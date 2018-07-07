CREATE DATABASE store;

USE store;

CREATE TABLE IF NOT EXISTS products (
item_id INTEGER(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price DECIMAL(6,2) NOT NULL,
stock_quantity INTEGER(7) NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('test_product5', 'test_dept5', 5.25, 1);