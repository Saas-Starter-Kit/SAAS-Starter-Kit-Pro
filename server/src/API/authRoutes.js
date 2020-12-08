import express from 'express';
import db from '../Database/db.js';
import { setToken } from '../Config/passport.js';
import firebase from 'firebase-admin';

const admin = firebase.initializeApp();
const router = express.Router();

//Example of authenticated route
//router.get('/private', requireAuth, (req, res) => {
//  res.send('Accessed Private Endpoint');
//});

//sign in or sign up user then send jwt token
router.post('/sendtoken');

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

export default router;
