import db from '../../Database/db.js';
import { setToken } from '../../Config/passport.js';
import { saveUsertoDB, getUser } from './authHelpers.js';
import firebaseAdmin from '../../Config/firebase.js';
import { sendEmail } from '../../Config/email.js';

export const verifyEmail = async (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  //remove spaces from url
  let redirectUrl = encodeURI(req.body.redirectUrl);

  let template = 'verify email';
  let locals = { redirectUrl, username };

  //send verification email
  await sendEmail(email, template, locals);
  res.status(200).send('Email Successfully Sent');
};

export const SignUp = async (req, res) => {
  let token = req.body.token;
  let username = req.body.username;
  let email = req.body.email;

  //First Check if User exists
  let userExists = await getUser(email);

  //If user exists send error message, otherwise continue code
  if (userExists.rows.length !== 0) {
    res.status(400).send({ type: 'Failed Sign Up', message: 'User Already Exists' });
    return;
  }

  //decode the firebase token recieved from frontend and save firebase uuid
  let decodedToken = await firebaseAdmin.auth().verifyIdToken(token);

  let firebaseId = decodedToken.user_id;

  //save user firebase info to our own db, and get unique user database id
  let databaseQuery = await saveUsertoDB(email, username, firebaseId);

  let userId = databaseQuery.rows[0].id;

  res.send({ token: setToken(userId) });
};

export const Login = async (req, res) => {
  let token = req.body.token;
  let email = req.body.email;

  //decode the firebase token recieved from frontend
  let decodedToken = await firebaseAdmin.auth().verifyIdToken(token);

  let firebaseId = decodedToken.user_id;

  console.log(firebaseId);
  //Check if User exists
  let user = await getUser(email);

  //If user not found send error message
  if (user.rows.length === 0) {
    //delete user from firebase
    await firebaseAdmin.auth().deleteUser(firebaseId);
    res.status(400).send({ type: 'Failed Login', message: 'User Does Not Exists' });
    return;
  }

  let user_id = user.rows[0].id;
  let stripe_customer_id = user.rows[0].stripe_customer_id;
  let subscription_id = user.rows[0].subscription_id;

  res.send({ token: setToken(user_id), stripe_customer_id, subscription_id });
};

export const updateUsername = async (req, res) => {
  let id = req.body.id;
  let username = req.body.username;

  console.log(id, username);

  let text = `UPDATE users SET username=$1
              WHERE id = $2`;
  let values = [username, id];

  let queryResult = await db.query(text, values);

  if (queryResult.rows.length === 0) {
    res.status(500).send({
      type: 'Database Logic Error',
      message: 'Update Failed, please try again or cantact support'
    });
  }

  console.log(queryResult);
  res.send(queryResult.rows);
};

export const updateEmail = async (req, res) => {
  let id = req.body.id;
  let email = req.body.email;

  let text = `UPDATE users SET email=$1
              WHERE id = $2`;
  let values = [email, id];

  let queryResult = await db.query(text, values);

  if (queryResult.rows.length === 0) {
    res.status(500).send({
      type: 'Database Logic Error',
      message: 'Update Failed, please try again or cantact support'
    });
  }

  console.log(queryResult);
  res.send(queryResult);
};
