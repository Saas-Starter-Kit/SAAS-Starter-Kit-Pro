import errorNotification from '../../components/Admin/Common/errorNotification';
import { FETCH_FAILURE, FETCH_INIT, FETCH_SUCCESS } from '../actions/actionTypes';

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
      console.log(error);

      //extract out to error handler
      if (error.response) {
        console.log(error.response.data);
        let errorMessage = error.response.data.message
          ? error.response.data.message
          : 'Request Failed Please Try Again or Contact Support';
        let errorType = error.response.data.type ? error.response.data.type : '500 Server Error';
        errorNotification(errorType, errorMessage);
      } else if (error.message) {
        //firebase auth errors
        let errorType = 'Firebase Authentication Error';
        let errorMessage = error.message;
        errorNotification(errorMessage, errorType);
      }

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
