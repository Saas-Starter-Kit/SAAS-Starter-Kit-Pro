import db from '../../../Database/sql/db.js';

export const checkRoleExists = async (app_id, user_id) => {
  let text = `SELECT * FROM roles
              WHERE app_id=$1 AND user_id=$2`;
  let values = [app_id, user_id];

  let queryResult = await db.query(text, values);

  return queryResult.rows[0];
};

export const getRoleModel = async (user_id, app_id) => {
  let text = `
      SELECT
        a.app_id,
        a.app_name,
        r.user_id,
        r.role
      FROM
        apps a
      INNER JOIN roles r 
          ON r.app_id = a.app_id
      WHERE r.user_id=$1 AND r.app_id=$2
  `;

  let values = [user_id, app_id];

  let queryResult = await db.query(text, values);

  return queryResult.rows;
};

export const postRoleModel = async (app_id, user_id, role) => {
  let text = `INSERT INTO roles(app_id, user_id, role)
              VALUES ($1, $2, $3)`;
  let values = [app_id, user_id, role];

  await db.query(text, values);

  return;
};

export const deleteRoleModel = async (role_id) => {
  let text = `DELETE FROM roles WHERE role_id=$1`;
  let values = [role_id];

  await db.query(text, values);

  return;
};
