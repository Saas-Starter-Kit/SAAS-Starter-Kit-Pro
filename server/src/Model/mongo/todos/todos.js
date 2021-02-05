import { Todos } from '../../../Database/mongo/models.js';

export const postModelTodo = async (title, description, author, app_id) => {
  let todo = new Todos({ title, description, author, app_id });
  todo.save();
};

export const getTodosModel = async (app_id) => {
  let todos = await Todos.find({ app_id });
  return todos;
};

export const putTodoModel = async (title, description, author, todo_id) => {
  Todos.findByIdAndUpdate(todo_id, { title, author, description });
};

export const deleteTodoModel = async (todo_id) => {
  Todos.findByIdAndDelete(todo_id);
};
