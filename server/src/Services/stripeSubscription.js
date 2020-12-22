import stripe from '../Config/stripe.js';
import db from '../Database/db.js';

export const GetSubscription = async (req, res) => {
  let email = req.query.email;

  console.log(email);

  //check if email exists
  let query1 = `SELECT * FROM users
                WHERE email=$1`;

  let values1 = [email];

  //check if user exists
  const user = await db.query(query1, values1);
  if (!user) res.send('User Not Found');

  console.log(user.rows[0].subscription_id);
  let subscription_id = user.rows[0].subscription_id;

  console.log(subscription_id);

  const subscription = await stripe.subscriptions.retrieve(subscription_id);

  res.send(subscription);
};

export const CreateSubscription = async (req, res) => {
  let customer_id = req.body.customer.stripeCustomerKey;
  let payment_method = req.body.payment_method;
  let email = req.body.customer.email;
  let plan = req.body.planSelect;

  // Attach the  payment method to the customer
  await stripe.paymentMethods.attach(payment_method, { customer: customer_id }).catch((err) => {
    console.log(err);
    res.status(500).send('Server Side Purchase Failed');
    throw new Error('Stripe Attach Payment Failed');
  });

  // Set it as the default payment method
  await stripe.customers
    .update(customer_id, {
      invoice_settings: { default_payment_method: payment_method }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Server Side Purchase Failed');
      throw new Error('Stripe Set Payment Failed');
    });

  const subscription = await stripe.subscriptions
    .create({
      customer: customer_id,
      items: [{ plan }],
      expand: ['latest_invoice.payment_intent'],
      trial_period_days: 14
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Server Side Purchase Failed');
      throw new Error('Stripe Create Subscription Failed');
    });

  let subscritionId = subscription.id;

  if (subscription.status === 'succeeded' || subscription.status === 'trialing') {
    //update db to users subscription
    let text = `UPDATE users SET is_paid_member=$1, subscription_id=$3
                WHERE email = $2`;
    let values = ['true', email, subscritionId];

    let queryResult = await db.query(text, values).catch((err) => {
      res.status(500).send('Server Side Purchase Failed');
      throw new Error('Database Query Failed');
    });

    if (queryResult) res.send(subscription);
  } else {
    //if subscription fails send error message
    res.status(500).send('Server Side Purchase Failed');
    throw new Error('Subscription Status not succeeded');
  }
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
