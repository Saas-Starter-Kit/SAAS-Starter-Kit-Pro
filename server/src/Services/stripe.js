import stripe from '../Config/stripe.js';

export const CreateCustomer = async (req, res) => {
  let email = req.body.email;

  const customer = await stripe.customers.create({ email });
  res.send(customer);
};
