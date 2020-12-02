const passport = require('passport');
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTStrategy = require('passport-jwt').Strategy;
const db = require('../Database/db.js');
const jwt = require('jsonwebtoken');

const setToken = (user) => {
  let opts = {
    expiresIn: '7d'
  };
  let secret = process.env.AUTH_SECRET;

  return jwt.sign({ user }, secret, opts);
};

const requireAuth = passport.authenticate('jwt', { session: false });

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.AUTH_SECRET
    },
    (jwtPayload, cb) => {
      let id = [jwtPayload];
      let query = `SELECT *
                   FROM users 
                   WHERE id=$1`;

      //check if id exists then allow endpoint
      let callback = (err, user) => {
        if (err) {
          return cb(err, false);
        }
        if (user.rows.length === 0) {
          return cb(null, false);
        }
        if (user.rows.length != 0) {
          return cb(null, jwtPayload);
        }
      };
      db.query(query, id, callback);
    }
  )
);

const exportObj = {
  requireAuth,
  setToken
};

module.exports = exportObj;
