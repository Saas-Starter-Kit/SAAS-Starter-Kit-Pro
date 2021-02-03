import { FETCH_FAILURE, FETCH_INIT, FETCH_SUCCESS } from '../actions/actionTypes';
import { apiErrorHandler } from '../../utils/helpers';

export const initialStateApi = {
  isLoading: false
};

export const apiReducer = (state, action) => {
  switch (action.type) {
    case FETCH_INIT:
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
      let error = action.payload;

      apiErrorHandler(error);

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
