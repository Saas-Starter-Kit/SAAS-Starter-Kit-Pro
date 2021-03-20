import { Todos } from '../../../Database/mongo/models.js';

export const postTodoModel = async (title, description, author, org_id) => {
  let todo = new Todos({ title, description, author, org_id });
  await todo.save();
  return todo;
};

export const getTodosModel = async (org_id) => {
  await Todos.find({ org_id });
};

export const putTodoModel = async (title, description, author, todo_id) => {
  await Todos.findByIdAndUpdate({ _id: todo_id }, { title, author, description });
};

export const deleteTodoModel = async (todo_id) => {
  await Todos.findByIdAndDelete({ _id: todo_id });
};
