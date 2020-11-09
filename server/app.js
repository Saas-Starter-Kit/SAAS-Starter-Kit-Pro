var express = require('express');
require('dotenv').config();
var cors = require('cors');
var bodyParser = require('body-parser');
const passport = require('passport');
const auth = require('./Authentication/auth_routes');
const todo_api = require('./API/todos');

const app = express();

//Middleware
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

//Authentication
app.use('/auth', auth);
app.use('/api', todo_api);

//server setup
const port = process.env.PORT || 3001;
app.listen(port);
console.log('Server listening on:', port);

module.exports = app;
