import { LOGIN, LOGOUT, FETCH_FAILURE, FETCH_SUCCESS, FETCH_INIT } from './actionTypes';

export const Login = (user) => {
  return {
    type: LOGIN,
    payload: user
  };
};

export const Logout = {
  type: LOGOUT
};

export const Fetch_init = {
  type: FETCH_INIT
};

export const Fetch_failure = (error) => {
  return {
    type: FETCH_FAILURE,
    payload: error
  };
};
export const Fetch_success = {
  type: FETCH_SUCCESS
};
