import express from 'express';

import './src/Config/dotenv.js';
import './src/Config/stripe.js';

import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import morgan from 'morgan';

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
app.use((err, req, res, next) => {
  let message = null;

  if (err.raw) {
    message = err.raw.message;
  } else if (err.message) {
    message = err.message;
  } else if (err.sqlMessage) {
    message = err.sqlMessage;
  }

  console.error(err);

  message ? res.status(500).send({ message: message }) : res.status(500).send(err);
});

//server setup
const port = process.env.PORT || 80;
app.listen(port);
console.log('Server listening on:', port);

process.on('unhandledRejection', (err) => {
  console.log(err);
});

export default app;
