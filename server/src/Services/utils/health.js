export const failHealthCheck = (req, res) => {
  res.status(500).send({ message: 'Failed Health Check' });
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
  let var3 = process.env.TEST_VAR;
  res.status(200).send('All ok' + var3);
};
