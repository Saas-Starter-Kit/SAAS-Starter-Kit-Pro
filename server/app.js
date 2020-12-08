import express from 'express';
import dotenv from 'dotenv';

if (!process.env.NODE_ENV === 'production') dotenv.config();

import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';

import('./src/Authentication/Config/stripe.js');
import auth from './src/Authentication/authRoutes.js';
import todoApi from './src/Authentication/API/todos.js';
import healthApi from './src/Authentication/API/health.js';

const app = express();

//Middleware
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

//API routes
app.use('/', healthApi);
app.use('/auth', auth);
app.use('/api', todoApi);

//server setup
const port = process.env.PORT || 80;
app.listen(port);
console.log('Server listening on:', port);

module.exports = app;
