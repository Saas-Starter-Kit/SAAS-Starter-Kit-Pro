import stripe from '../../Config/stripe.js';

export const CreateStripeCustomer = async (email, user_id, org_id) => {
  const customer = await stripe.customers.create({
    email,
    metadata: {
      org_id,
      user_id
    }
  });

  return customer;
};

export const UpdateStripeCustomer = async (stripe_id, email) => {
  await stripe.customers.update(stripe_id, { email });
};

export const DeleteStripeCustomer = async (stripe_id) => {
  await stripe.customers.del(stripe_id);
};

export const GetStripeCustomer = async (stripe_id) => {
  const customer = await stripe.customers.retrieve(stripe_id);
  return customer;
};
