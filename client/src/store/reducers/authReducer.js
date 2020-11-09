import { LOGIN, LOGOUT } from '../actions/action_types';

export const initialStateAuth = {
  isAuthenticated: false,
  user: null
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      let user = action.payload;
      //set 10 hour expires time
      let expiresIn = 36000000 * 1000 + new Date().getTime();
      console.log(user);

      localStorage.setItem('expiresIn', JSON.stringify(expiresIn));
      localStorage.setItem('user', JSON.stringify(user));

      return { isAuthenticated: true, user: user };
    case LOGOUT:
      localStorage.removeItem('expiresIn');
      localStorage.removeItem('user');
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};
