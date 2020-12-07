import { stripe } from '../Stripe/stripe';

const db = require('../Database/db.js');

const requireAuth = require('./passport_config').requireAuth;
const setToken = require('./passport_config').setToken;

const firebase = require('firebase-admin');
const admin = firebase.initializeApp();

const express = require('express');
const router = express.Router();

//Example of authenticated route
router.get('/private', requireAuth, (req, res) => {
  res.send('Accessed Private Endpoint');
});

//sign in or sign up user then send jwt token
router.post('/sendtoken', (req, res) => {
  let token = req.body.token;
  let username = req.body.username;
  console.log(username);

  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      let name = username;
      let email = decodedToken.email;
      console.log(name, email);

      saveUsertoDB(email, name);
    })
    .catch((error) => {
      res.send('error loggin in');
      console.log(error);
    });

  const saveUsertoDB = (email, username) => {
    /* Save user to our own db and get unique key from db */

    //check if email exists
    let query1 = `SELECT * FROM users
                  WHERE email=$1`;

    //if email not found insert into database
    let query2 = `INSERT INTO users (username, email)
                  VALUES($1, $2)
                  RETURNING id`;

    let values1 = [email];

    let values2 = [username, email];

    //signup user, called inside callback1
    let callback2 = (q_err, q_res) => {
      if (q_err) {
        console.log(q_err);
        res.status(500).send(q_err);
      }
      //send back user id after signup
      if (q_res.rows[0]) {
        let id = q_res.rows[0].id;

        //jwt token login after signup
        res.send({ token: setToken(id) });
      }
    };

    //Check if user exists callback
    let callback1 = (q_err, q_res) => {
      if (q_err) {
        console.log(q_err);
        res.status(500).send(q_err);
      }
      if (q_res.rows.length != 0) {
        //if user exists then jwt login
        let id = q_res.rows[0].id;

        res.send({ token: setToken(id) });
      }
      if (q_res.rows.length === 0) {
        //if email not found, create user in db
        db.query(query2, values2, callback2);
      }
    };

    //check if user exists
    db.query(query1, values1, callback1);
  };
});

/*
JWT is sessionless, so logout only needs to be implemented
client side. 
*/

const putUsername = (req, res) => {
  let id = req.body.id;
  let username = req.body.username;

  let text = `UPDATE users SET username=$1
              WHERE id = $2`;
  let values = [username, id];

  let callback = (q_err, q_res) => {
    if (q_err) console.log(q_err);
    res.json(q_res.rows);
  };

  db.query(text, values, callback);
};

router.put('/put/username', putUsername);

const putEmail = (req, res) => {
  let id = req.body.id;
  let email = req.body.email;

  let text = `UPDATE users SET email=$1
              WHERE id = $2`;
  let values = [email, id];

  let callback = (q_err, q_res) => {
    if (q_err) console.log(q_err);
    res.json(q_res.rows);
  };

  db.query(text, values, callback);
};

router.put('/put/email', putEmail);

module.exports = router;
