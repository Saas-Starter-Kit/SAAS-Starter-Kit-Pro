import db from '../../Database/db.js';
import { sendEmail } from '../../Config/email.js';
import { getUser } from '../auth/authHelpers.js';

export const GetAppUsers = async (req, res) => {
  //let app_id = req.query.app_id;
  let app_id = 7;

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

  console.log(senderEmail, inviterDisplayName, inviteRecipient);

  //check user exists
  let userExists = await getUser(inviteRecipient);

  //If user doesnt exist, require sign up process
  if (userExists.rows.length !== 0) {
    isSignup = false;
  } else {
    isSignup = true;
  }

  //let redirectedUrl = `${domainUrl}/?app_id=${app_id}&inviterEmail=${inviterEmail}&inviteRecipient=${inviteRecipient}&inviterDisplayName=${inviterDisplayName}`;

  let redirectUrl = `${domainUrl}/auth/login/?app_id=${app_id}&isInviteFlow=${true}`;

  //send email with url containing all the vars
  let template = 'invite';
  let locals = { inviterDisplayName, senderEmail, redirectUrl };

  await sendEmail(inviteRecipient, template, locals);
  res.status(200).send({ type: 'Success', message: 'Invite successfully sent' });
};
