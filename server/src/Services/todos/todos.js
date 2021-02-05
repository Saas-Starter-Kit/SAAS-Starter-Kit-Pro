import {
  postTodoModel,
  getTodosModel,
  putTodoModel,
  deleteTodoModel
} from '../../Model/sql/todos/todos.js';

export const getTodos = async (req, res) => {
  let app_id = req.query.app_id;

  let result = await getTodosModel(app_id);

  res.status(200).send(result);
};

export const postTodo = async (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let author = req.body.author;
  let app_id = req.body.app_id;

  await postTodoModel(title, description, author, app_id);

  res.status(200).send('Post Successful');
};

export const putTodo = async (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let author = req.body.author;
  let todo_id = req.body.todo_id;

  await putTodoModel(title, description, author, todo_id);

  res.status(200).send('Put Successful');
};

export const deleteTodo = async (req, res) => {
  let todo_id = req.body.todo_id;

  await deleteTodoModel(todo_id);

  res.status(200).send('Delete Successful');
};
