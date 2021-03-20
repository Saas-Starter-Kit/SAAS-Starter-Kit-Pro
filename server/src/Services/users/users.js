import { sendEmail } from '../../Config/email.js';
import { getUser } from '../../Model/mongo/auth/authentication.js';
import {
  getAppUsersModel,
  CreateInvite,
  VerifyInviteModel
} from '../../Model/mongo/users/users.js';
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

  //If user doesnt exist, require sign up flow,
  //If exists use login flow
  if (!userExists) {
    redirectUrl = `${domainUrl}/auth/signup/?isInviteFlow=${true}&verify_key=${randomBytes}`;
    isSignup = true;
  } else {
    redirectUrl = `${domainUrl}/auth/login/?&isInviteFlow=${true}&verify_key=${randomBytes}`;
    isSignup = false;
  }

  await CreateInvite(org_id, randomBytes, recipient_email, sender_email);

  //send invite through email
  let template = 'invite';
  let locals = { sender_email, sender_display_name, redirectUrl, isSignup };

  await sendEmail(recipient_email, template, locals);
  res.status(200).send({ type: 'Success', message: 'Invite successfully sent' });
};

export const VerifyInvite = async (req, res) => {
  let invite_key = req.body.invite_key;

  let result = await VerifyInviteModel(invite_key);

  if (!result) {
    //send verify failed error
    let error = { type: 'Verify Key Invalid', message: 'Invite verification failed' };
    res.status(400).send(error);
  } else {
    let org_id = result.org_id;
    res.send({ org_id });
  }
};
