import db from '../../Database/db.js';
import { sendEmail } from '../../Config/email.js';

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

export const InviteUsers = async (req, res) => {
  //let app_id = req.query.app_id;
  let app_id = 7;

  let text = `
      SELECT
        r.role_id,
        r.role,
        u.id,
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
