import stripe from '../../Config/stripe.js';

export const CreateCustomer = async (email, account_id) => {
  //check if stripe customer already exists
  const existingCustomers = await stripe.customers.list({
    email
  });

  //if stripe customer exists set error message
  if (existingCustomers.data.length != 0) {
    throw new Error('Stripe User Already Exists');
  }

  const customer = await stripe.customers.create({
    email,
    metadata: {
      databaseUID: account_id
    }
  });

  return customer;
};

export const UpdateCustomer = async (stripe_id, email) => {
  await stripe.customers.update(stripe_id, { email });
};
