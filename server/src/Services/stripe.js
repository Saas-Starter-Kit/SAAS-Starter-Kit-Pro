import stripe from '../Config/stripe.js';
import db from '../Database/db.js';

export const CreateCustomer = async (req, res) => {
  let email = req.body.email;
  let userId = req.body.userId;

  const customer = await stripe.customers.create({
    email,
    metadata: {
      databaseUID: userId
    }
  });

  let text = `UPDATE users SET stripe_customer_id=$1 
              WHERE email=$2
              RETURNING stripe_customer_id`;
  let values = [customer.id, email];

  let callback = (q_err, q_res) => {
    if (q_err) console.log(q_err);
    res.send(q_res.rows[0]);
  };

  //save stripe customer id to database
  db.query(text, values, callback);
};

export const CreateSetupIntent = async (req, res) => {
  let customer_id = req.body.customer.stripeCustomerKey;
  console.log(customer_id);

  if (customer_id) {
    const setupIntent = await stripe.setupIntents.create({
      customer: customer_id
    });

    res.send(setupIntent);
  } else {
    res.send('Customer Key Not Found');
  }
};

export const CreateSubscription = async (req, res) => {
  let customer_id = req.body.customer.stripeCustomerKey;
  let payment_method = req.body.payment_method;
  let email = req.body.customer.email;
  let plan = req.body.planSelect;

  console.log(plan);
  if (!customer_id || !payment_method || !email || !plan) {
    res.send('Missing Required info');
    return;
  }

  // Attach the  payment method to the customer
  await stripe.paymentMethods.attach(payment_method, { customer: customer_id });

  // Set it as the default payment method
  await stripe.customers.update(customer_id, {
    invoice_settings: { default_payment_method: payment_method }
  });

  const subscription = await stripe.subscriptions.create({
    customer: customer_id,
    items: [{ plan }],
    expand: ['latest_invoice.payment_intent']
  });

  if (!subscription) {
    res.send('Failed to create subscription');
    return;
  }

  let subscritionId = subscription.id;

  if (subscription.latest_invoice.payment_intent.status === 'succeeded') {
    //update db to users subscription
    let text = `UPDATE users SET is_paid_member=$1, subscription_id=$3
                WHERE email = $2`;
    let values = ['true', email, subscritionId];

    let callback = (q_err, q_res) => {
      if (q_err) res.send(q_err);
      res.send(subscription);
    };

    db.query(text, values, callback);
  }
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
  let customer = req.query.customer;

  const paymentMethod = await stripe.paymentMethods.detach('pm_1Hz1pcAtqjBKUOx9JxMTtmn4');

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

export const CancelSubscription = async (req, res) => {
  let email = req.body.email;

  //check if email exists
  let query1 = `SELECT * FROM users
                WHERE email=$1`;

  let values1 = [email];

  //check if user exists
  const user = await db.query(query1, values1);
  if (!user) res.send('User Not Found');

  console.log(user.rows[0].subscription_id);
  let subscription_id = user.rows[0].subscription_id;

  //delete subscription and send back response
  const subscription = await stripe.subscriptions.del(subscription_id);
  if (!subscription) res.send('Subscription Cancel failed');

  if (subscription.status === 'canceled') {
    let text2 = `UPDATE users SET is_paid_member=$1, subscription_id=$2
               WHERE email=$3`;
    let values2 = ['false', '', email];

    let serverUpdate = await db.query(text2, values2);

    if (!serverUpdate) res.send('Subscription Cancel Failed');
    if (serverUpdate.command === 'UPDATE') res.send('Subscription Successfully Canceled');
  } else {
    res.send("'Subscription Cancel Failed'");
  }
};
