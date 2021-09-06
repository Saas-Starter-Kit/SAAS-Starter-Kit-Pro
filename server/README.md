# Node Postgres Auth API Server

Node-Express Authentication and CRUD API Server to Postgres Database.

Companion Server to Decoupled React Nextjs Front End App.

### Postgres Setup (Required)

https://www.postgresql.org/

I will assume basic Postgres knowledge

1. Subsitute Postgres credentials into .env.example and rename file to .env
2. Create Tables in a Postgres Database based on commands found in /Database/schema.sql file
3. Set any AUTH_SECRET you wish
   <br/> <br/>

### Env Var

When adding new env var make sure to add it to the Fargate AWS class otherwise
it will not work in production if you are using the provided AWS infrastructure.
