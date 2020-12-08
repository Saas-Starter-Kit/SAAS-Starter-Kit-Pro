import passport from 'passport';
import { Strategy, ExtractJWT } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import db from '../Database/db.js';

export const setToken = (user) => {
  let opts = {
    expiresIn: '7d'
  };
  let secret = process.env.AUTH_SECRET;

  return jwt.sign({ user }, secret, opts);
};

export const requireAuth = passport.authenticate('jwt', { session: false });

passport.use(
  new Strategy(
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
