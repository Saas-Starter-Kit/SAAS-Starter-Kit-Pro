import db from '../../Database/db.js';

export const getTodos = async (req, res) => {
  let author = req.query.author;

  let text = `SELECT * FROM TODOS WHERE author=$1`;
  let values = [author];

  let queryResult = await db.query(text, values);
  res.send(queryResult.rows);
};

export const postTodo = async (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let author = req.body.author;

  console.log(req.body);

  let text = `INSERT INTO todos(title, description, author)
              VALUES ($1, $2, $3)`;
  let values = [title, description, author];

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
