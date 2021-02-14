import {
  postTodoModel,
  getTodosModel,
  putTodoModel,
  deleteTodoModel
} from '../../Model/mongo/todos/todos.js';

export const getTodos = async (req, res, next) => {
  try {
    let app_id = req.query.app_id;

    let result = await getTodosModel(app_id);

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
};

export const postTodo = async (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let author = req.body.author;
  let app_id = req.body.app_id;

  await postTodoModel(title, description, author, app_id);

  res.status(200).send('Post Successful');
};

export const putTodo = async (req, res, next) => {
  try {
    let title = req.body.title;
    let description = req.body.description;
    let author = req.body.author;
    let todo_id = req.body.todo_id.todo_id ? req.body.todo_id.todo_id : req.body.todo_id._id;

    console.log(todo_id);

    await putTodoModel(title, description, author, todo_id);

    res.status(200).send('Put Successful');
  } catch (e) {
    next(e);
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    let todo_id = req.query.todo_id;

    await deleteTodoModel(todo_id);

    res.status(200).send('Delete Successful');
  } catch (e) {
    next(e);
  }
};
