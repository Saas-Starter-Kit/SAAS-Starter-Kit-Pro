import { LOGIN, LOGOUT } from './action_types';

export const Login = (user) => {
  return {
    type: LOGIN,
    payload: user
  };
};

export const Logout = {
  type: LOGOUT
};
