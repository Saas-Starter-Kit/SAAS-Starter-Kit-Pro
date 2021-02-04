import db from '../../../Database/db.js';

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
