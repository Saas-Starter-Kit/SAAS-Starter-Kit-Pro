//API requests related to todos
import axios from 'axios';

//Send Firebase auth token to authenticate against our own server
export const postTodoApi = async (data) => {
  const result = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/post/todo`, data);
  return result;
};
