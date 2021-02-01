import db from '../../Database/db.js';

export const getApp = async (req, res) => {
  let user_id = req.query.user_id;

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
      WHERE r.user_id=$1
  `;

  let values = [user_id];

  let queryResult = await db.query(text, values);
  res.send(queryResult.rows);
};

export const postApp = async (req, res) => {
  let name = req.body.name;

  console.log(req.body);

  let text = `INSERT INTO apps(app_name)
              VALUES ($1)
              RETURNING app_id`;
  let values = [name];

  let queryResult = await db.query(text, values);
  res.send(queryResult.rows);
};

export const deleteApp = async (req, res) => {
  let app_id = req.query.app_id;

  console.log(app_id);

  let roleText = `DELETE FROM roles WHERE app_id=$1`;
  let roleValues = [app_id];

  let appText = `DELETE FROM apps WHERE app_id=$1`;
  let appValues = [app_id];

  let queryResultRole = await db.query(roleText, roleValues);

  let queryResultApp = await db.query(appText, appValues);

  res.send({ role: queryResultRole.rows, app: queryResultApp });
};
