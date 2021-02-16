import express from 'express';

import './Config/dotenv.js';
import './Config/stripe.js';
import './Database/mongo/db.js';
import './Database/sql/db.js';

import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import limiter from './Middleware/rateLimiter.js';
import { errorHandler } from './Middleware/errorHandler.js';
import { unhandledRejectionHandler } from './Middleware/unhandledRejectionHandler.js';
import { createPermissions } from './Middleware/permissions.js';

//initialize sentry
import './Config/sentry.js';

import auth from './API/auth.js';
import todoApi from './API/todos.js';
import utilsApi from './API/utils.js';
import stripeApi from './API/stripe.js';
import stripeWebhook from './API/stripeWebhooks.js';
import appApi from './API/app.js';
import roleApi from './API/roles.js';
import usersApi from './API/users.js';

const app = express();

//stripe webhooks must be called before bodyparser middleware
app.use('/stripe', stripeWebhook);

//Middleware
app.use(cors());
app.use(limiter);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(createPermissions);

//API routes
app.use('/', utilsApi);
app.use('/stripe', stripeApi);
app.use('/auth', auth);
app.use('/api', todoApi);
app.use('/api', appApi);
app.use('/api', roleApi);
app.use('/api', usersApi);

// error handling
app.use(errorHandler);
process.on('unhandledRejection', unhandledRejectionHandler);

export default app;
