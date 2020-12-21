//API requests related to authentication
import axios from 'axios';
import { navigate } from 'gatsby';

const axiosBase = process.env.GATSBY_SERVER_URL;

export const LoginToServer = async (token) => {
  const data = { token };

  const result = await axios.post(`${axiosBase}/auth/login`, data);

  return result;
};

export const SignupToServer = async (email, username, token) => {
  const data = { email, username, token };

  const result = await axios.post(`${axiosBase}/auth/signup`, data);

  return result;
};

export const updateUserNameApi = async (id, username) => {
  const data = { id, username };

  await axios.put(`${axiosBase}/auth/put/username`, data);

  navigate('/login');
};

export const updateEmailApi = async (id, email) => {
  const data = { id, email };

  await axios.put(`${axiosBase}/auth/put/email`, data);

  navigate('/login');
};
