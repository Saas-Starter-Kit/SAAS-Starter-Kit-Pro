import { Todos } from '../../../Database/mongo/models.js';

export const postTodoModel = async (title, description, author, org_id) => {
  let todo = new Todos({ title, description, author, org_id });
  await todo.save();
  return todo;
};

export const getTodosModel = async (org_id) => {
  let todos = await Todos.find({ org_id }).lean();
  todos = todos.map((item) => ({ ...item, id: item._id }));

  return todos;
};

export const putTodoModel = async (title, description, author, _id) => {
  await Todos.findByIdAndUpdate({ _id }, { title, author, description });
};

export const deleteTodoModel = async (_id) => {
  await Todos.findByIdAndDelete({ _id });
};
