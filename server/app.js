import express from 'express';

import './src/Config/dotenv.js';
import './src/Config/stripe.js';

import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import morgan from 'morgan';

import { errorHandler } from './src/Utils/errorHandler.js';
import { unhandledRejectionHandler } from './src/Utils/unhandledRejectionHandler.js';

//initialize sentry
import './src/Config/sentry.js';

import auth from './src/API/auth.js';
import todoApi from './src/API/todos.js';
import healthApi from './src/API/health.js';
import stripeApi from './src/API/stripe.js';
import stripeWebhook from './src/API/stripeWebhooks.js';
import appApi from './src/API/app.js';
import roleApi from './src/API/roles.js';
import usersApi from './src/API/users.js';

const app = express();

//stripe webhooks must be called before bodyparser middleware
app.use('/stripe', stripeWebhook);

//Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

//API routes
app.use('/', healthApi);
app.use('/stripe', stripeApi);
app.use('/auth', auth);
app.use('/api', todoApi);
app.use('/api', appApi);
app.use('/api', roleApi);
app.use('/api', usersApi);

// error handling
app.use(errorHandler);
process.on('unhandledRejection', unhandledRejectionHandler);

//server setup
const port = process.env.PORT || 80;
app.listen(port);
console.log('Server listening on:', port);

export default app;
