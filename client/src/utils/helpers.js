//misc utility functions
import errorNotification from '../components/Common/errorNotification';

export const silentAuth = (LogIn, LogOut) => {
  let user, expiresAt;

  user = JSON.parse(localStorage.getItem('user'));
  expiresAt = JSON.parse(localStorage.getItem('expiresIn'));

  if (user && new Date().getTime() < expiresAt) {
    LogIn(user);
  } else if (!user || new Date().getTime() > expiresAt) {
    LogOut();
  }
};

export const apiErrorHandler = (error) => {
  if (error.response) {
    //error messages from server with response data
    if (error.response.data.type && error.response.data.message) {
      let errorMessage = error.response.data.message;
      let errorType = error.response.data.type;
      errorNotification(errorType, errorMessage);
    } else {
      console.log(error.response.data);
      let errorMessage = error.response.data.message
        ? error.response.data.message
        : 'Request Failed Please Try Again or Contact Support';
      let errorType = error.response.data.type ? error.response.data.type : '500 Server Error';
      errorNotification(errorType, errorMessage);
    }
  } else if (error.type && error.message) {
    let errorType = error.type;
    let errorMessage = error.message;
    errorNotification(errorType, errorMessage);
  } else if (error.message && error.code) {
    let errorType = error.code;
    let errorMessage = error.message;
    errorNotification(errorType, errorMessage);
  } else {
    let errorType = 'An Error Occurred';
    let errorMessage = 'There was an Error, please try again or contact support';
    errorNotification(errorType, errorMessage);
  }
};
