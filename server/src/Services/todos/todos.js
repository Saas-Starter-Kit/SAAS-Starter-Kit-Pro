import db from '../../Database/db.js';

export const getTodos = async (req, res) => {
  let app_id = req.query.app_id;

  let text = `SELECT * FROM TODOS WHERE app_id=$1`;
  let values = [app_id];

  let queryResult = await db.query(text, values);
  res.send(queryResult.rows);
};

export const postTodo = async (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let author = req.body.author;
  let app_id = req.body.app_id;

  console.log(req.body);

  let text = `INSERT INTO todos(title, description, author, app_id)
              VALUES ($1, $2, $3, $4)`;
  let values = [title, description, author, app_id];

  let queryResult = await db.query(text, values);
  res.send(queryResult.rows);
};

export const putTodo = async (req, res) => {
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

export const deleteTodo = async (req, res) => {
  let todo_id = req.body.todo_id;

  let text = `DELETE FROM todos 
              WHERE todo_id=$1`;
  let values = [todo_id];

  let queryResult = await db.query(text, values);
  res.send(queryResult.rows);
};
