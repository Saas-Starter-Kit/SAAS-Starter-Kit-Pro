import { FETCH_FAILURE, FETCH_INIT, FETCH_SUCCESS } from '../actions/actionTypes';

export const initialStateApi = {
  isLoading: false
};

export const apiReducer = (state, action) => {
  switch (action.type) {
    case FETCH_INIT:
      console.log('dddddddddd');
      return {
        ...state,
        isLoading: true
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case FETCH_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return {
        ...state,
        isLoading: false
      };
  }
};
