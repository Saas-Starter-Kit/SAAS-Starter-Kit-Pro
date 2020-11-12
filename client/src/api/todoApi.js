//API requests related to todos
import axios from 'axios';

//Send Firebase auth token to authenticate against our own server
export const postTodoApi = async (data) => {
  let result = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/post/todo`, data);
  return result;
};

export const fetchTodoApi = async (params) => {
  let result = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/get/todos`, {
    params
  });
  return result;
};

export const deleteTodoApi = async (data) => {
  let result = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/delete/todo`, {
    data
  });

  return result;
};
