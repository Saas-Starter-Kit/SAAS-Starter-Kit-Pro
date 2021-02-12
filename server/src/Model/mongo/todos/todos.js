import mongoose from 'mongoose';
const objectId = mongoose.Types.ObjectId;
import { Todos } from '../../../Database/mongo/models.js';

export const postTodoModel = async (title, description, author, app_id) => {
  let todo = new Todos({ title, description, author, app_id: objectId(app_id) });
  await todo.save();
  return todo
};

export const getTodosModel = async (app_id) => {
  return await Todos.find({ app_id });
};

export const putTodoModel = async (title, description, author, todo_id) => {
  try {
    return await Todos.findByIdAndUpdate(todo_id,
      { $set: { title, author, description } }, {useFindAndModify: false});
  } catch(e) {
    throw new Error(e)
  }
  
};

export const deleteTodoModel = async (todo_id) => {
  return await Todos.findByIdAndDelete(todo_id);
};
