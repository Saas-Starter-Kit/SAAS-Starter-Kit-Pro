import stripe from '../Config/stripe.js';

export const CreateCustomer = async (req, res) => {
  let email = req.body.email;

  const customer = await stripe.customers.create({ email });
  res.send(customer);
};

export const CreateSetupIntent = async (req, res) => {
  const setupIntent = await stripe.setupIntents.create({
    customer: 'cus_IY1vr2IUrT3e6Z'
  })
  
  res.send(setupIntent);
};
