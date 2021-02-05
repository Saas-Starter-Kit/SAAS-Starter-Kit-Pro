import stripe from '../../Config/stripe.js';
import { setToken } from '../../Middleware/auth.js';
import { createCustomerModel } from '../../Model/sql/stripe/stripeCustomer.js';

export const CreateCustomer = async (req, res) => {
  let email = req.body.email;
  let userId = req.body.userId;

  //check if stripe customer already exists
  const existingCustomers = await stripe.customers.list({
    email
  });

  //if stripe customer exists send error message
  if (existingCustomers.data.length != 0) {
    res.status(400).send({ type: 'Failed Stripe Sign Up', message: 'User Already Exists' });
    return;
  }

  const customer = await stripe.customers.create({
    email,
    metadata: {
      databaseUID: userId
    }
  });

  //save stripe id to our own db
  let result = await createCustomerModel(customer, email);

  console.log(result);

  //send jwt token for user auth requests
  let token = setToken(userId);

  res.send({ stripe: result, token });
};

export const UpdateCustomer = async (stripe_id, email) => {
  await stripe.customers.update(stripe_id, { email });
};
