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
  console.log(req.query);
  console.log(req.body);
  res.status(200).send('All ok');
};
