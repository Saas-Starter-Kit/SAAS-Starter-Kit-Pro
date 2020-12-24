import db from '../Database/db.js';
import { setToken } from '../Config/passport.js';
import firebase from 'firebase-admin';
import { saveUsertoDB, getUser } from './authHelpers.js';

const admin = firebase.initializeApp();

export const SignUp = async (req, res) => {
  let token = req.body.token;
  let username = req.body.username;
  let email = req.body.email;

  //First Check if User exists
  let userExists = await getUser(email).catch((err) => {
    console.log(err);
    res.status(500).send('Database Query Failed');
    throw new Error('Database Query Failed');
  });

  console.log(userExists);

  //If user exists send error message, otherwise continue code
  if (!userExists.message === 'User Not Found') {
    res.status(500).send({ message: 'User Already Exists' });
    throw new Error('User Already exists in Database');
  }

  //decode the firebase token recieved from frontend and save firebase uuid
  let decodedToken = await admin
    .auth()
    .verifyIdToken(token)
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error signing up');
      throw new Error('Firebase Token Decode error');
    });

  let firebaseId = decodedToken.user_id;

  //save user firebase info to our own db, and get unique user database id
  let databaseQuery = await saveUsertoDB(email, username, firebaseId).catch((err) => {
    console.log(err);
    res.status(500).send('Error signing up');
    throw new Error('Error Saving User Info to Database');
  });

  let userId = databaseQuery.rows[0].id;

  console.log(userId);

  res.send({ token: setToken(userId) });
};

export const Login = async (req, res) => {
  let token = req.body.token;
  let email = req.body.email;

  //decode the firebase token recieved from frontend
  await admin
    .auth()
    .verifyIdToken(token)
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error signing up');
      throw new Error('Firebase Token Decode error');
    });

  //Check if User exists
  let user = await getUser(email).catch((err) => {
    console.log(err);
    res.status(500).send('Database Query Failed');
    throw new Error('Database Query Failed');
  });

  //If user not found send error message
  if (user.message === 'User Not Found') {
    res.status(500).send(user.message);
    throw new Error(user.message);
  }

  let user_id = user.rows[0].id;
  let stripe_customer_id = user.rows[0].stripe_customer_id;

  res.send({ token: setToken(user_id), stripe_customer_id });
};

export const updateUsername = (req, res) => {
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

export const updateEmail = (req, res) => {
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
