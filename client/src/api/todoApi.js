//API requests related to todos
import axios from 'axios';

const axiosBase = process.env.REACT_APP_SERVER_URL;

//Send Firebase auth token to authenticate against our own server
export const postTodoApi = async (data) => {
  let result = await axios.post(`${axiosBase}/api/post/todo`, data);
  return result;
};

export const fetchTodoApi = async (params) => {
  let result = await axios.get(`${axiosBase}/api/get/todos`, {
    params
  });
  return result;
};

export const deleteTodoApi = async (data) => {
  await axios.delete(`${axiosBase}/api/delete/todo`, {
    data
  });
};

export const putTodoApi = async (data) => {
  await axios.put(`${axiosBase}/api/put/todo`, data);
};
