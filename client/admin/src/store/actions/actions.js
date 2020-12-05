import { LOGIN, LOGOUT } from './actionTypes';

export const Login = (user) => {
  return {
    type: LOGIN,
    payload: user
  };
};

export const Logout = {
  type: LOGOUT
};
