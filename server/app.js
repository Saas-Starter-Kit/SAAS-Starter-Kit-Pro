var express = require('express');

var dotenv = require('dotenv').config();
if (!process.env.NODE_ENV === 'production') {
  dotenv.config();
}

var cors = require('cors');
var bodyParser = require('body-parser');
const passport = require('passport');

const auth = require('./Authentication/auth_routes');
const todo_api = require('./API/todos');
const health_api = require('./API/health');

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
const port = process.env.PORT || 80;
app.listen(port);
console.log('Server listening on:', port);

module.exports = app;
