import db from '../../../Database/sql/db.js';

export const postTodoModel = async (title, description, author, app_id) => {
  let text = `INSERT INTO todos(title, description, author, app_id)
              VALUES ($1, $2, $3, $4)`;
  let values = [title, description, author, app_id];

  await db.query(text, values);

  return;
};

export const getTodosModel = async (app_id) => {
  let text = `SELECT * FROM TODOS WHERE app_id=$1`;
  let values = [app_id];

  let queryResult = await db.query(text, values);

  return queryResult.rows;
};

export const putTodoModel = async (title, description, author, todo_id) => {
  let text = `UPDATE todos SET title= $1, description=$2, author=$3
              WHERE todo_id = $4`;
  let values = [title, description, author, todo_id];

  await db.query(text, values);

  return;
};

export const deleteTodoModel = async (todo_id) => {
  let text = `DELETE FROM todos 
              WHERE todo_id=$1`;
  let values = [todo_id];

  await db.query(text, values);

  return;
};
