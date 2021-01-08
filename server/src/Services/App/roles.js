import db from '../../Database/db.js';

export const getRole = async (req, res) => {
  let name = req.body.name;

  console.log(req.body);

  let text = `INSERT INTO app(app_name)
              VALUES ($1)
              RETURNING app_id`;
  let values = [name];

  let queryResult = await db.query(text, values);
  res.send(queryResult.rows);
};

export const postRole = async (req, res) => {
  let app_id = req.body.app_id;
  let user_id = req.body.user_id;
  let is_admin = req.body.is_admin;
  let is_user = req.body.is_user;

  let text = `INSERT INTO roles(app_id, user_id, is_admin, is_user)
              VALUES ($1, $2, $3, $4)`;
  let values = [app_id, user_id, is_admin, is_user];

  let queryResult = await db.query(text, values);
  res.send(queryResult.rows);
};
