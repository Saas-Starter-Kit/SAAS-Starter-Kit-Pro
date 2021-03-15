import { sendEmail } from '../../Config/email.js';
import { getUser } from '../../Model/sql/auth/authentication.js';
import { getAppUsersModel } from '../../Model/sql/users/users.js';
import db from '../../Database/sql/db.js';
import { nanoid } from 'nanoid';

export const GetAppUsers = async (req, res) => {
  let org_id = req.query.org_id;

  let result = await getAppUsersModel(org_id);

  res.status(200).send(result);
};

export const InviteUser = async (req, res) => {
  let sender_email = req.body.sender_email;
  let sender_display_name = req.body.sender_display_name;
  let recipient_email = req.body.recipient_email;
  let domainUrl = req.body.domainUrl;
  let org_id = req.body.org_id;
  let isSignup;
  let redirectUrl;
  const randomBytes = nanoid();

  //check user exists
  let userExists = await getUser(recipient_email);

  let text = `INSERT INTO invites(org_id, verify_key, recipient_email, sender_email)
              VALUES($1, $2, $3, $4)`;

  let values = [org_id, randomBytes, recipient_email, sender_email];

  await db.query(text, values);

  //If user doesnt exist, require sign up process,
  //if exists use login flow
  if (!userExists) {
    redirectUrl = `${domainUrl}/auth/signup/?key=${randomBytes}&isInviteFlow=${true}&verify_key=${randomBytes}`;
    isSignup = true;
  } else {
    redirectUrl = `${domainUrl}/auth/login/?key=${randomBytes}&isInviteFlow=${true}&verify_key=${randomBytes}`;
    isSignup = false;
  }

  //send email with url containing all the variables
  let template = 'invite';
  let locals = { sender_email, sender_display_name, redirectUrl, isSignup };

  await sendEmail(recipient_email, template, locals);
  res.status(200).send({ type: 'Success', message: 'Invite successfully sent' });
};

export const VerifyInvite = async (req, res) => {
  let invite_key = req.body.invite_key;

  let text = `SELECT * from invites
              WHERE verify_key=$1`;

  let values = [invite_key];

  let result = await db.query(text, values);
  let org_id = result.rows[0].org_id;

  if (result === 0) {
    //send verify failed error
  }

  res.send({ org_id });
};
