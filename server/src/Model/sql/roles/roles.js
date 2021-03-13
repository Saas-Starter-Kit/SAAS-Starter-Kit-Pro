import db from '../../../Database/sql/db.js';

export const checkRoleExists = async (app_id, user_id) => {
  let text = `SELECT * FROM roles
              WHERE app_id=$1 AND user_id=$2`;
  let values = [app_id, user_id];

  let queryResult = await db.query(text, values);

  return queryResult.rows[0];
};

export const getRoleModel = async (user_id, org_id) => {
  let text = `
      SELECT
        o.id,
        o.org_name,
        r.user_id,
        r.role
      FROM
        organization o
      INNER JOIN roles r 
          ON r.org_id = o.id
      WHERE r.user_id=$1 AND r.org_id=$2
  `;

  let values = [user_id, org_id];

  let queryResult = await db.query(text, values);

  return queryResult.rows;
};

export const postRoleModel = () => {};

export const CreateOrgRole = async (org_id, user_id, role) => {
  let text = `INSERT INTO roles(org_id, user_id, role)
              VALUES($1, $2, $3)`;

  let values = [org_id, user_id, role];

  await db.query(text, values);

  return;
};

export const deleteRoleModel = async (role_id) => {
  let text = `DELETE FROM roles WHERE role_id=$1`;
  let values = [role_id];

  await db.query(text, values);

  return;
};
