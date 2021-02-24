//Env variables for tests

//Postgres credentials,
//A seperate db for tests is recommended,
//These credentials and the database are not mocked
process.env.DB_PASSWORD = 'password';
process.env.DB_USER = 'postgres';
process.env.DB_HOST = 'localhost';
process.env.DB_NAME = 'testdb';
process.env.DB_PORT = 5432;

//user set auth secret, mocked
process.env.AUTH_SECRET = 'Secret';
