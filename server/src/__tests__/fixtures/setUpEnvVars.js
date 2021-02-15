//Env variables for tests

//Firebase env vars
process.env.GOOGLE_CLOUD_PROJECT = 'example-project1';
process.env.FirebaseDatabaseUrl = 'https://example-project1.firebaseio.com';

//user set auth secret
process.env.AUTH_SECRET = 'Secret';

//Sentry
process.env.SENTRY_DSN = 'https://3de53d3b8bbc4078bfc589a522222320@o512746.ingest.sentry.io/xxxxx';

//Postgres credentials,
//Make a seperate db for tests
process.env.DB_PASSWORD = 'password';
process.env.DB_USER = 'postgres';
process.env.DB_HOST = 'localhost';
process.env.DB_NAME = 'db5';
process.env.DB_PORT = 5432;

//Stripe Secret and price for one time payment
process.env.STRIPE_SECRET = 'sk_test_xxxxxxxxxxxxx';
process.env.STRIPE_ITEM_PRICE = 1099;
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_xxxxxxxxxx';

//Send in blue env vars, multiple listIds can be added
process.env.SendInBlue_API_KEY = 'xkeysib-xxxxxxxxxxxxxxxxxx';
process.env.SendInBlue_User = 'example@eee.com';
process.env.SendInBlue_Password = 'password';
process.env.SendInBlue_ListId = 5;
