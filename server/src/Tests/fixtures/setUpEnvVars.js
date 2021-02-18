//Env variables for tests

//Postgres credentials,
//Make a seperate db for tests,
//These credentials are not mocked
process.env.DB_PASSWORD = 'password';
process.env.DB_USER = 'postgres';
process.env.DB_HOST = 'localhost';
process.env.DB_NAME = 'testdb';
process.env.DB_PORT = 5432;

//Firebase env vars
process.env.GOOGLE_CLOUD_PROJECT = 'example-project1';
process.env.FIREBASE_DATABASE_URL = 'https://example1.firebaseio.com';
process.env.FIREBASE_PROJECT_ID = 'example1';
process.env.FIREBASE_CLIENT_EMAIL = 'firebase-adminsdk-z30fn@example1.iam.gserviceaccount.com';
process.env.FIREBASE_PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----KEY\n-----END PRIVATE KEY-----\n';

//user set auth secret
process.env.AUTH_SECRET = 'Secret';

//Sentry
process.env.SENTRY_DSN = 'https://xxxxx@xxxxxx.ingest.sentry.io/xxxxx';

//Stripe Secret and price for one time payment
process.env.STRIPE_SECRET = 'sk_test_xxxxxxxxxxxxx';
process.env.STRIPE_ITEM_PRICE = 1099;
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_xxxxxxxxxx';

//Send in blue env vars, multiple listIds can be added
process.env.SendInBlue_API_KEY = 'xkeysib-xxxxxxxxxxxxxxxxxx';
process.env.SendInBlue_User = 'example@gmail.com';
process.env.SendInBlue_Password = 'password';
process.env.SendInBlue_ListId = 5;
