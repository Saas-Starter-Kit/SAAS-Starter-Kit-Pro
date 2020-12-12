import stripe from '../Config/stripe.js';

export const CreateCustomer = async (req, res) => {
  let email = req.body.email;

  const customer = await stripe.customers.create({ email });
  res.send(customer);
};

export const CreateSetupIntent = async (req, res) => {
  const setupIntent = await stripe.setupIntents.create({
    customer: 'cus_IY1vr2IUrT3e6Z'
  });

  res.send(setupIntent);
};

export const CreateSubscription = async (req, res) => {
  let customer = 'cus_IY1vr2IUrT3e6Z';
  let payment_method = 'pm_1HwxtwAtqjBKUOx98KEzuuWh';
  let plan = 'prod_IWXuNM17jweetX';

  // Attach the  payment method to the customer
  await stripe.paymentMethods.attach(payment_method, { customer });

  // Set it as the default payment method
  await stripe.customers.update(customer, {
    invoice_settings: { default_payment_method: payment_method }
  });

  const subscription = await stripe.subscriptions.create({
    customer: customer,
    items: [{ plan }],
    expand: ['latest_invoice.payment_intent']
  });

  res.send(subscription);
};
