import express from 'express';
import './src/Config/dotenv.js';

console.log(process.env.StripeSecret);

import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import morgan from 'morgan';

import('./src/Config/stripe.js');
import auth from './src/Authentication/authRoutes.js';
import todoApi from './src/API/todos.js';
import healthApi from './src/API/health.js';

const app = express();

//Middleware
app.use(cors());
app.use(morgan('dev'));
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

export default app;
