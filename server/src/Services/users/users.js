import db from '../../Database/db.js';
import { sendEmail } from '../../Config/email.js';
import { getUser } from '../auth/authHelpers.js';

export const GetAppUsers = async (req, res) => {
  let app_id = req.query.app_id;

  let text = `
      SELECT
        r.role_id,
        r.role,
        r.user_id,
        u.username,
        u.email
      FROM
        roles r
      INNER JOIN users u 
        ON r.user_id = u.id
      WHERE r.app_id=$1
  `;

  let values = [app_id];

  let queryResult = await db.query(text, values);
  res.send(queryResult.rows);
};

export const InviteUser = async (req, res) => {
  let senderEmail = req.body.inviterEmail;
  let inviterDisplayName = req.body.inviterDisplayName;
  let inviteRecipient = req.body.inviteRecipient;
  let domainUrl = req.body.domainUrl;
  let app_id = 7;
  let isSignup;
  let redirectUrl;

  console.log(senderEmail, inviterDisplayName, inviteRecipient);

  //check user exists
  let userExists = await getUser(inviteRecipient);

  //If user doesnt exist, require sign up process,
  //if not use login flow
  if (userExists.rows.length !== 0) {
    redirectUrl = `${domainUrl}/auth/login/?app_id=${app_id}&isInviteFlow=${true}`;
    isSignup = false;
  } else {
    redirectUrl = `${domainUrl}/auth/signup/?app_id=${app_id}&isInviteFlow=${true}`;
    isSignup = true;
  }

  //send email with url containing all the variables
  let template = 'invite';
  let locals = { inviterDisplayName, senderEmail, redirectUrl, isSignup };

  await sendEmail(inviteRecipient, template, locals);
  res.status(200).send({ type: 'Success', message: 'Invite successfully sent' });
};
