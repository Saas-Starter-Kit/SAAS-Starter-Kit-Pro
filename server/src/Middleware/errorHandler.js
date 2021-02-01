export const errorHandler = (err, req, res, next) => {
  console.error(err);

  let message = 'Request Failed Try Again or Contact Support';
  res.status(500).send({ message });
};
