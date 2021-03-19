CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  firebase_user_id VARCHAR(255),
  verify_key VARCHAR(255),
  is_email_verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_name VARCHAR,
  primary_email VARCHAR(255) REFERENCES users(email),
  stripe_customer_id VARCHAR(255),
  subscription_id VARCHAR(255),
  plan_type VARCHAR(255)
);

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  org_id UUID REFERENCES organizations(id),
  user_id UUID REFERENCES users(id),
  role VARCHAR(255)
);

CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description VARCHAR(1000),
  author VARCHAR(255),
  org_id UUID REFERENCES organizations(id)
);

CREATE TABLE invites (
  id SERIAL PRIMARY KEY,
  org_id UUID REFERENCES organizations(id),
  verify_key VARCHAR(255),
  recipient_email VARCHAR(255),
  sender_email VARCHAR (255)
);