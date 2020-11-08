const { Pool } = require('pg');

// Meant for heroku db env var
let connectionString =
  process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_URL
    : `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

let pool = new Pool({
  connectionString
});

// Alternate Syntax
// let pool = new Pool({
//  user: process.env.DB_USER,
//  host: process.env.DB_HOST,
//  database: process.env.DB_NAME,
//  password: process.env.DB_PASSWORD,
//  port: process.env.DB_PORT
// })

module.exports = pool;
