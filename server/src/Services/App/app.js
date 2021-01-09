import db from '../../Database/db.js';

export const getApp = async (req, res) => {
  let user_id = req.query.user_id;

  console.log(user_id);

  let text = `
      SELECT
        a.app_id,
        a.app_name,
        r.user_id,
        r.is_admin, 
        r.is_user
      FROM
        app a
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

  let text = `INSERT INTO app(app_name)
              VALUES ($1)
              RETURNING app_id`;
  let values = [name];

  let queryResult = await db.query(text, values);
  res.send(queryResult.rows);
};

export const putApp = async (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let author = req.body.author;
  let todo_id = req.body.todo_id;

  let text = `UPDATE todos SET title= $1, description=$2, author=$3
              WHERE todo_id = $4`;
  let values = [title, description, author, todo_id];

  let queryResult = await db.query(text, values);
  res.send(queryResult.rows);
};

export const deleteApp = async (req, res) => {
  let todo_id = req.body.todo_id;

  let text = `DELETE FROM todos 
              WHERE todo_id=$1`;
  let values = [todo_id];

  let queryResult = await db.query(text, values);
  res.send(queryResult.rows);
};
