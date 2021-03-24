import { LOGIN, LOGOUT } from '../actions/actionTypes';

export const initialStateAuth = {
  isAuthenticated: false,
  user: {
    id: null,
    username: null,
    email: null,
    jwt_token: null,
    provider: null,
    photo: null
  }
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      let user = action.payload;
      //set 10 hour expires time
      let expiresIn = 36000000 * 1000 + new Date().getTime();

      localStorage.setItem('expiresIn', JSON.stringify(expiresIn));
      localStorage.setItem('user', JSON.stringify(user));

      return { isAuthenticated: true, user };
    case LOGOUT:
      localStorage.removeItem('expiresIn');
      localStorage.removeItem('user');

      let nullUser = {
        id: null,
        username: null,
        email: null,
        jwt_token: null,
        provider: null,
        photo: null
      };

      return { isAuthenticated: false, user: nullUser };
    default:
      return state;
  }
};
