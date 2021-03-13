import stripe from '../../Config/stripe.js';

export const CreateCustomer = async (email, user_id, org_id) => {
  const customer = await stripe.customers.create({
    email,
    metadata: {
      org_id,
      user_id
    }
  });

  return customer;
};

export const UpdateCustomer = async (stripe_id, email) => {
  await stripe.customers.update(stripe_id, { email });
};
