CREATE TABLE IF NOT EXISTS customers (
  customer_id serial PRIMARY KEY ,
  customer_name VARCHAR ( 60 ) NOT NULL,
  customer_email VARCHAR (100),
  customer_password VARCHAR (150) NOT NULL
);


CREATE TABLE IF NOT EXISTS products (
	product_id serial PRIMARY KEY,
	product_title VARCHAR (100) NOT NULL,
	product_price decimal(5,2) NOT NULL,
	product_description VARCHAR (250) NOT NULL,
	product_image VARCHAR(350) NOT NULL,
	product_category INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS users (
	user_id serial PRIMARY KEY,
	user_email VARCHAR (100),
	user_name VARCHAR (60) NOT NULL,
	user_password VARCHAR (100) NOT NULL,
	user_role VARCHAR (10) NOT NULL,
	user_avatar VARCHAR(350) NOT NULL
);

CREATE TABLE IF NOT EXISTS categories (
	category_id serial PRIMARY KEY,
	category_name VARCHAR (20),
	category_image VARCHAR (350)
);
