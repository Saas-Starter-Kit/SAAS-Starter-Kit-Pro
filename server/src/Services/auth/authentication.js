import { setToken } from '../../Middleware/auth.js';
import firebaseAdmin from '../../Config/firebase.js';
import { sendEmail } from '../../Config/email.js';
import { UpdateContact } from '../users/contacts.js';
import { UpdateCustomer } from '../stripe/stripeCustomer.js';
import {
  saveUsertoDB,
  getUser,
  updateUsernameModel,
  updateEmailModel
} from '../../Model/mongo/auth/authentication.js';

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
  if (userExists) {
    res.status(400).send({ type: 'Failed Sign Up', message: 'User Already Exists' });
    return;
  }

  //decode the firebase token recieved from frontend and save firebase uuid
  let decodedToken = await firebaseAdmin.auth().verifyIdToken(token);

  let firebaseId = decodedToken.user_id;

  //save user firebase info to our own db, and get unique user database id
  let result = await saveUsertoDB(email, username, firebaseId);

  let userId = result.id;

  res.send({ token: setToken(userId) });
};

export const Login = async (req, res) => {
  let token = req.body.token;
  let email = req.body.email;

  //decode the firebase token recieved from frontend
  let decodedToken = await firebaseAdmin.auth().verifyIdToken(token);

  let firebaseId = decodedToken.user_id;

  //Check if User exists
  let user = await getUser(email);

  //If user not found send error message
  if (!user) {
    //delete user from firebase
    await firebaseAdmin.auth().deleteUser(firebaseId);
    res.status(400).send({ type: 'Failed Login', message: 'User Does Not Exists' });
    return;
  }

  let user_id = user.id;
  let stripe_customer_id = user.stripe_customer_id;
  let subscription_id = user.subscription_id;

  res.send({ token: setToken(user_id), stripe_customer_id, subscription_id });
};

export const updateUsername = async (req, res, next) => {
  try {
    let id = req.body.id;
    let username = req.body.username;
    let email = req.body.curEmail;
    let user = await getUser(email);
    let uid = user.firebase_user_id;
    console.log(user, uid);

    firebaseAdmin.auth().updateUser(uid, {
      displayName: username
    });

    await updateUsernameModel(username, id);

    res.status(200).send('Update Successful');
  } catch (e) {
    next(e);
  }
};

export const updateEmail = async (req, res, next) => {
  try {
    let id = req.body.id;
    let email = req.body.email;
    let oldEmail = req.body.oldEmail;

    let user = await getUser(oldEmail);
    let uid = user.firebase_user_id;
    let stripe_id = user.stripe_customer_id;

    firebaseAdmin.auth().updateUser(uid, {
      email
    });

    await updateEmailModel(email, id);
    await UpdateCustomer(stripe_id, email);
    await UpdateContact(email, oldEmail);

    res.status(200).send('Update Successful');
  } catch (e) {
    next(e);
  }
};
