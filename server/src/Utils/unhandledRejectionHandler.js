export const unhandledRejectionHandler = (err) => {
  console.log(err);

  let message = 'Request Failed Try Again or Contact Support';
  res.status(500).send({ message });
};
