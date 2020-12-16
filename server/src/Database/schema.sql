

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  stripe_customer_id VARCHAR,
  is_paid_member BOOLEAN DEFAULT FALSE,
  subscription_id VARCHAR
);

CREATE TABLE todos (
  todo_id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description VARCHAR(1000),
  author VARCHAR(255) REFERENCES users(username)
);


