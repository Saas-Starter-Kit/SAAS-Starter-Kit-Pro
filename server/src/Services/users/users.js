import { sendEmail } from '../../Config/email.js';
import { getUser } from '../../Model/sql/auth/authentication.js';
import { getAppUsersModel } from '../../Model/sql/users/users.js';

export const GetAppUsers = async (req, res, next) => {
  try {
    let app_id = req.query.app_id;

    let result = await getAppUsersModel(app_id);

    res.status(200).send(result);
  } catch (e) {
    console.log(e);
  }
};

export const InviteUser = async (req, res) => {
  let senderEmail = req.body.inviterEmail;
  let inviterDisplayName = req.body.inviterDisplayName;
  let inviteRecipient = req.body.inviteRecipient;
  let domainUrl = req.body.domainUrl;
  let app_id = req.body.app_id;
  let isSignup;
  let redirectUrl;

  //check user exists
  let userExists = await getUser(inviteRecipient);

  //If user doesnt exist, require sign up process,
  //if not use login flow
  if (!userExists) {
    redirectUrl = `${domainUrl}/auth/signup/?app_id=${app_id}&isInviteFlow=${true}`;
    isSignup = true;
  } else {
    redirectUrl = `${domainUrl}/auth/login/?app_id=${app_id}&isInviteFlow=${true}`;
    isSignup = false;
  }

  //send email with url containing all the variables
  let template = 'invite';
  let locals = { inviterDisplayName, senderEmail, redirectUrl, isSignup };

  await sendEmail(inviteRecipient, template, locals);
  res.status(200).send({ type: 'Success', message: 'Invite successfully sent' });
};
