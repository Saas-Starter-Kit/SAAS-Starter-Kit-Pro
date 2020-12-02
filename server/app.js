var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const passport = require('passport');
const auth = require('./Authentication/auth_routes');
const todo_api = require('./API/todos');
const health_api = require('./API/health');

//Env variables setup
const env = process.env.NODE_ENV;
console.log(`Testing for: ${env}`);
try {
  switch (env) {
    case 'development':
      require('dotenv').config({
        path: `${__dirname}/dev.env`
      });
      break;
    case 'production':
      require('dotenv').config({
        path: `${__dirname}/.env`
      });
      break;
    default:
      Error('Unrecognized Environment');
  }
} catch (err) {
  Error('Error trying to run file');
}

const app = express();

//Middleware
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

//API routes
app.use('/', health_api);
app.use('/auth', auth);
app.use('/api', todo_api);

//server setup
const port = process.env.PORT || 3001;
app.listen(port);
console.log('Server listening on:', port);

module.exports = app;
