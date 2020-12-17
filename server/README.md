# Node Postgres Auth API Server

Node-Express Authentication and CRUD API Server to Postgres Database.

Companion Server to Decoupled React Gatsby Front End App.

## Features

-Basic CRUD API routes\
-Server Side Auth token verification with Firebase Admin\
-User Sign up Flow\
-Passport JWT verification\
-Authenticated API requests\
-Returns JWT token on successful Auth \
-No ORM, SQL queries with PG library
<br/> <br/>

### Postgres Setup (Required)

https://www.postgresql.org/

I will assume basic Postgres knowledge

1. Subsitute Postgres credentials into .env.example and rename file to .env
2. Create Tables in a Postgres Database based on commands found in /Database/schema.sql file
3. Set any AUTH_SECRET you wish
   <br/> <br/>

### Firebase Setup (Required)

https://firebase.google.com/

1. Simply log in to the console
2. Create New Project or use existing project
3. Write Firebase Project-ID to .env file

### Heroku Deploy (optional)

https://www.heroku.com/home

Heroku will be the easiest and cheapest ($0/month) deployment for this server and database.

1. Create a new app and connect your own repo of this project
2. Add the Heroku Postgres Add-on under resources
3. Set up the enviroment variables from .env file under settings tab
4. The Postgres credentials will be found in the DATABASE_URL env variable
5. Use these Credentials to remotely log in to the Database with a postgres client like pgadmin or psql
6. Create Tables in the Postgres Database based on commands found in /Database/schema.sql file
7. The Heroku provided URL will be the API endpoint. Subsitute it in the GATSBY_SERVER_URL env variable of the frontend App.

Stripe

Go to settings > billings > subscriptions and emails and fill out all fields in the first box. (include pic)
