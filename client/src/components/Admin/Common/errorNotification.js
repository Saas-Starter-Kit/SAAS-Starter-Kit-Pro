import { Button, notification, Space } from 'antd';

const errorNotification = (errorType, errorMessage) => {
  let errorTitle = errorType ? errorType : 'Error Detected';
  let errorDescription = errorMessage
    ? errorMessage
    : 'There was an error, please contact support or try again';

  notification.error({
    message: errorTitle,
    description: errorDescription
  });

  return;
};

export default errorNotification;
