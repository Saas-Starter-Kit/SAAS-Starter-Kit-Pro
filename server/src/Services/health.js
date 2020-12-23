export const failHealthCheck = (req, res) => {
  res.status(404).send('Failed Health Check');
  throw new Error('Request Failed');
};

export const privateRoute = (req, res) => {
  res.status(200).send('Accessed Private Endpoint');
};

/* 
    DO NOT MODIFY, '/health' is used by AWS Fargate 
    to run a health check and determine when to 
    launch a new container. 
*/

export const _healthCheck = (req, res) => {
  res.status(200).send('All ok');
};
