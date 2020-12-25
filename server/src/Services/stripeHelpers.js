import stripe from '../Config/stripe.js';

export const CreateSetupIntent = async (req, res) => {
  let customer_id = req.body.customer.stripeCustomerKey;
  console.log(customer_id);

  const setupIntent = await stripe.setupIntents.create({
    customer: customer_id
  });

  console.log(setupIntent);

  res.send(setupIntent);
};

export const AttachPaymentMethod = async (req, res) => {
  let customer_id = req.body.customer.stripeCustomerKey;
  let payment_method = req.body.payment_method;

  if (!customer_id || !payment_method) {
    res.send('Missing Required info');
    return;
  }

  // Attach the  payment method to the customer
  await stripe.paymentMethods.attach(payment_method, { customer: customer_id });

  // Set it as the default payment method
  const result = await stripe.customers.update(customer_id, {
    invoice_settings: { default_payment_method: payment_method }
  });

  res.send(result);
};

export const RemovePaymentMethod = async (req, res) => {
  let paymentMethod = req.body.payment;

  const paymentMethods = await stripe.paymentMethods.detach(paymentMethod);

  res.send(paymentMethods);
};

export const GetWallet = async (req, res) => {
  let customer = req.query.customer;

  const paymentMethods = await stripe.paymentMethods.list({
    customer: customer,
    type: 'card'
  });

  res.send(paymentMethods);
};
