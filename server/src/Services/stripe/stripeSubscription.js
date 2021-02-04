import stripe from '../../Config/stripe.js';
import db from '../../Database/db.js';
import { getUser } from '../../Model/sql/auth/authentication.js';
import { sendEmail } from '../../Config/email.js';
import moment from 'moment';

export const UpdateSubscription = async (req, res) => {
  let subscription_id = req.body.subscriptionId;
  let payment_method = req.body.payment_method;
  let price = req.body.planSelect;
  let id = req.body.subscriptionItem;
  let planType = req.body.planType;
  let email = req.body.email;

  const subscription = await stripe.subscriptions.update(subscription_id, {
    default_payment_method: payment_method,
    items: [{ id, price }]
  });

  //send confirm email
  let amount = subscription.plan.amount_decimal * 0.01;
  let template = 'update subscription';
  let locals = { amount, planType };
  await sendEmail(email, template, locals);

  res.status(200).send(subscription);

  //optionally add a field to the database for different membership tiers
  //see createSubscription() as an example
};

export const GetSubscription = async (req, res) => {
  let email = req.query.email;

  //check if user exists
  const user = await getUser(email);

  //If subscription not found send non-error message
  if (!user.rows[0].subscription_id) {
    res.status(200).send({ type: 'No Subscription', message: 'Subscription Not Found' });
    return;
  }

  let subscription_id = user.rows[0].subscription_id;

  const subscription = await stripe.subscriptions.retrieve(subscription_id);

  res.send(subscription);
};

export const CreateSubscription = async (req, res) => {
  let customer_id = req.body.customer.stripeCustomerKey;
  let payment_method = req.body.payment_method;
  let email = req.body.customer.email;
  let price = req.body.planSelect;

  // Attach the  payment method to the customer
  await stripe.paymentMethods.attach(payment_method, { customer: customer_id });

  // Set it as the default payment method for the customer account
  await stripe.customers.update(customer_id, {
    invoice_settings: { default_payment_method: payment_method }
  });

  const subscription = await stripe.subscriptions.create({
    customer: customer_id,
    items: [{ price }],
    default_payment_method: payment_method,
    trial_period_days: 14
  });

  let subscritionId = subscription.id;

  if (subscription.status === 'succeeded' || subscription.status === 'trialing') {
    //update db to users subscription
    let text = `UPDATE users SET is_paid_member=$1, subscription_id=$3
                WHERE email = $2`;
    let values = ['true', email, subscritionId];

    await db.query(text, values);

    //send email confirm for subscription creation
    let amount = subscription.plan.amount * 0.01;
    let start_date = moment(subscription.created * 1000).format('MMM Do YYYY');
    let trial_end = moment(subscription.trial_end * 1000).format('MMM Do YYYY');

    let template = 'start subscription';
    let locals = { amount, start_date, trial_end };
    await sendEmail(email, template, locals);

    res.send(subscription);
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

  //check if user exists
  const user = await getUser(email);

  console.log(user.rows[0].subscription_id);
  let subscription_id = user.rows[0].subscription_id;

  //delete subscription and send back response
  const subscription = await stripe.subscriptions.del(subscription_id);

  if (subscription.status === 'canceled') {
    let text = `UPDATE users SET is_paid_member=$1, subscription_id=$2
               WHERE email=$3`;
    let values = ['false', '', email];

    await db.query(text, values);

    //cancel subscription confirm email
    let template = 'cancel subscription';
    await sendEmail(email, template);

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
