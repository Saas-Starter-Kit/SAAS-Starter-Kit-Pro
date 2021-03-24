import { setToken } from '../../Middleware/auth.js';
import firebaseAdmin from '../../Config/firebase.js';
import { sendEmail } from '../../Config/email.js';
import { UpdateStripeCustomer } from '../stripe/stripeCustomer.js';
import { UpdateContact } from '../users/contacts.js';
import { verifyUser } from '../../Model/sql/auth/authentication.js';
import { CreateContact } from '../users/contacts.js';
import { nanoid } from 'nanoid';
import { GetOrgsbyEmail } from '../../Model/sql/org/org.js';
import {
  saveUsertoDB,
  getUser,
  updateUsernameModel,
  updateEmailModel
} from '../../Model/mongo/auth/authentication.js';

export const CreateUser = async (req, res) => {
  let verify_key = req.body.verify_key;

  //verify signup key
  let result = await verifyUser(verify_key);
  let user_id = result.id;
  let username = result.username;
  let email = result.email;

  //save contact to email marketing and sales crm
  let FIRSTNAME = username.split(' ')[0];
  await CreateContact(email, FIRSTNAME);

  //send welcome email
  let template = 'welcome';
  let locals = { FIRSTNAME };
  await sendEmail(email, template, locals);

  res.send({ token: setToken(user_id), user_id, username, email });
};

export const SignUp = async (req, res) => {
  let token = req.body.token;
  let username = req.body.username;
  let email = req.body.email;
  let invite_key = req.body.invite_key;
  let isInviteFlow = req.body.isInviteFlow;
  //remove spaces from url
  let confirmEmailUrl = encodeURI(req.body.confirmEmailUrl);

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

  //generate random bytes for user email verify
  const randomBytes = nanoid();
  confirmEmailUrl = `
    ${confirmEmailUrl}/?key=${randomBytes}&isInviteFlow=${isInviteFlow}&invite_key=${invite_key}
  `;

  //send verification email
  let template = 'verify email';
  let locals = { confirmEmailUrl, username };
  await sendEmail(email, template, locals);

  //save user firebase info to our own db, and get unique user database id
  await saveUsertoDB(email, username, firebaseId, randomBytes);

  res.send('Email Confirm Sent');
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

  res.send({ token: setToken(user_id) });
};

export const updateUsername = async (req, res, next) => {
  let id = req.body.id;
  let username = req.body.username;
  let email = req.body.curEmail;

  let user = await getUser(email);
  let uid = user.firebase_user_id;

  await firebaseAdmin.auth().updateUser(uid, {
    displayName: username
  });

  await updateUsernameModel(username, id);

  res.status(200).send('Update Successful');
};

export const updateEmail = async (req, res) => {
  let id = req.body.id;
  let email = req.body.email;
  let oldEmail = req.body.oldEmail;

  let user = await getUser(oldEmail);
  let uid = user.firebase_user_id;

  await firebaseAdmin.auth().updateUser(uid, {
    email
  });

  //if the update email is an organization primary email,
  //update the email in stripe for all the orgs.
  let orgs = await GetOrgsbyEmail(oldEmail);
  if (orgs) {
    orgs.map(async (org) => {
      await UpdateStripeCustomer(org.stripe_customer_id, email);
    });
  }

  await updateEmailModel(email, id);
  await UpdateContact(email, oldEmail);

  res.status(200).send('Update Successful');
};
