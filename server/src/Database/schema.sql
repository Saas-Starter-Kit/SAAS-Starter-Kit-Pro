CREATE TABLE apps (
  app_id SERIAL PRIMARY KEY,
  app_name VARCHAR
);

CREATE TABLE roles (
  role_id SERIAL PRIMARY KEY,
  app_id INT REFERENCES app(app_id),
  user_id INT REFERENCES users(id),
  role VARCHAR
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255) UNIQUE,
  stripe_customer_id VARCHAR,
  firebase_user_id VARCHAR,
  is_paid_member BOOLEAN DEFAULT FALSE,
  subscription_id VARCHAR
);

CREATE TABLE todos (
  todo_id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description VARCHAR(1000),
  author VARCHAR(255) REFERENCES users(username),
  app_id INT REFERENCES app(app_id)
);


