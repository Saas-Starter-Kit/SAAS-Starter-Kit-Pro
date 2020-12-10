import stripe from '../Config/stripe.js';

export const CreateCustomer = async (req, res) => {
  const customer = await stripe.customers.create({ email: 'AAAA2@yahoo.com' });
  res.send(customer);
};
