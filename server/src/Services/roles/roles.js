import db from '../../Database/db.js';

export const getRole = async (req, res) => {
  let user_id = req.query.user_id;
  let app_id = req.query.app_id;

  let text = `
      SELECT
        a.app_id,
        a.app_name,
        r.user_id,
        r.role
      FROM
        app a
      INNER JOIN roles r 
          ON r.app_id = a.app_id
      WHERE r.user_id=$1 AND r.app_id=$2
  `;

  let values = [user_id, app_id];

  let queryResult = await db.query(text, values);
  res.send(queryResult.rows);
};

export const postRole = async (req, res) => {
  let app_id = req.body.app_id;
  let user_id = req.body.user_id;
  let role = req.body.role;
  console.log(app_id, user_id, role);

  const isRoleExists = await checkRoleExists(app_id, user_id);
  //If role exists for app send error message
  if (isRoleExists.rows.length !== 0) {
    res
      .status(400)
      .send({ type: 'Failed to Create Role', message: 'User already has role in this app' });
    return;
  }

  let text = `INSERT INTO roles(app_id, user_id, role)
              VALUES ($1, $2, $3)`;
  let values = [app_id, user_id, role];

  let queryResult = await db.query(text, values);
  res.send(queryResult.rows);
};

const checkRoleExists = async (app_id, user_id) => {
  let text = `SELECT * FROM roles
              WHERE app_id=$1 AND user_id=$2`;
  let values = [app_id, user_id];

  let queryResult = await db.query(text, values);

  return queryResult;
};
