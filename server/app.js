import express from 'express';

import './src/Config/dotenv.js';
import './src/Config/stripe.js';

import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import morgan from 'morgan';

import { errorHandler } from './src/Utils/errorHandler.js';
import { unhandledRejectionHandler } from './src/Utils/unhandledRejectionHandler';

import auth from './src/API/authRoutes.js';
import todoApi from './src/API/todos.js';
import healthApi from './src/API/health.js';
import stripeApi from './src/API/stripe.js';

const app = express();

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

// error handling
app.use(errorHandler);
process.on('unhandledRejection', unhandledRejectionHandler);

//server setup
const port = process.env.PORT || 80;
app.listen(port);
console.log('Server listening on:', port);

export default app;
