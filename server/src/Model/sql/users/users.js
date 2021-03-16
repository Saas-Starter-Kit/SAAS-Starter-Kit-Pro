import db from '../../../Database/sql/db.js';

export const getAppUsersModel = async (app_id) => {
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
  return queryResult.rows;
};

export const CreateInvite = async (org_id, randomBytes, recipient_email, sender_email) => {
  let text = `INSERT INTO invites(org_id, verify_key, recipient_email, sender_email)
              VALUES($1, $2, $3, $4)`;

  let values = [org_id, randomBytes, recipient_email, sender_email];

  await db.query(text, values);

  return;
};

export const VerifyInviteModel = async (invite_key) => {
  let text = `SELECT org_id from invites
              WHERE verify_key=$1`;

  let values = [invite_key];

  let queryResult = await db.query(text, values);

  return queryResult.rows[0];
};
