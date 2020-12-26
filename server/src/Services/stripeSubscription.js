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
  await stripe.paymentMethods.attach(payment_method, { customer: customer_id });

  // Set it as the default payment method
  await stripe.customers.update(customer_id, {
    invoice_settings: { default_payment_method: payment_method }
  });

  const subscription = await stripe.subscriptions.create({
    customer: customer_id,
    items: [{ plan }],
    expand: ['latest_invoice.payment_intent'],
    trial_period_days: 14
  });

  let subscritionId = subscription.id;

  if (subscription.status === 'succeeded' || subscription.status === 'trialing') {
    //update db to users subscription
    let text = `UPDATE users SET is_paid_member=$1, subscription_id=$3
                WHERE email = $2`;
    let values = ['true', email, subscritionId];

    let queryResult = await db.query(text, values);
    console.log(queryResult);

    if (queryResult) res.send(subscription);
  } else {
    //if subscription fails send error message
    res
      .status(400)
      .send({ type: 'Stripe Purchase Error', message: 'Stripe Server Side Purchase Failed' });
    return;
  }
};

export const CancelSubscription = async (req, res) => {
  let email = req.body.email;

  //check if email exists
  let query = `SELECT * FROM users
                WHERE email=$1`;

  let values = [email];

  //check if user exists
  const user = await db.query(query, values);

  console.log(user.rows[0].subscription_id);
  let subscription_id = user.rows[0].subscription_id;

  //delete subscription and send back response
  const subscription = await stripe.subscriptions.del(subscription_id);

  if (subscription.status === 'canceled') {
    let text = `UPDATE users SET is_paid_member=$1, subscription_id=$2
               WHERE email=$3`;
    let values = ['false', '', email];

    await db.query(text, values);

    res
      .status(200)
      .send({ type: 'Request Successful', message: 'Subscription Successfully Canceled' });
  } else {
    res.status(400).send({
      type: 'Subscription Cancel Failed',
      message: 'Subscription Cancel Failed, please contact support'
    });
  }
};
