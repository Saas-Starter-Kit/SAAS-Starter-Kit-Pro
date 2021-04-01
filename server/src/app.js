import express from 'express';

//initialize libraries
import './Config/dotenv.js';
import './Config/stripe.js';
import './Config/sentry.js';
import './Config/firebase.js';
import './Database/mongo/db.js';
import './Database/sql/db.js';

import cors from 'cors';
import morgan from 'morgan';

import limiter from './Middleware/rateLimiter.js';
import { errorHandler } from './Middleware/errorHandler.js';
import { unhandledRejectionHandler } from './Middleware/unhandledRejectionHandler.js';
import { createPermissions } from './Middleware/permissions.js';

import auth from './API/auth.js';
import todoApi from './API/todos.js';
import utilsApi from './API/utils.js';
import stripeApi from './API/stripe.js';
import stripeWebhook from './API/stripeWebhooks.js';
import roleApi from './API/roles.js';
import usersApi from './API/users.js';
import orgApi from './API/org.js';

const app = express();

//stripe webhooks must be called before bodyparser middleware
app.use('/stripe', stripeWebhook);

//Middleware
app.use(cors());
app.use(limiter);
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(createPermissions);

//API routes
app.use('/', utilsApi);
app.use('/stripe', stripeApi);
app.use('/auth', auth);
app.use('/api', orgApi);
app.use('/api', todoApi);
app.use('/api', roleApi);
app.use('/api', usersApi);

// error handling
app.use(errorHandler);
process.on('unhandledRejection', unhandledRejectionHandler);

export default app;
