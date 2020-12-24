import { Button, notification, Space } from 'antd';

const errorNotification = (errorMessage, errorType) => {
  let errorTitle = errorType ? errorType : 'Error Detected';
  let errorDescription = errorMessage
    ? errorMessage
    : 'There was an error, please contact support or try again';

  notification.error({
    message: errorTitle,
    description: errorDescription
  });

  console.log(errorMessage);
  console.log(errorType);
  throw new Error('An Error occured, code execution stopped');
};

export default errorNotification;
