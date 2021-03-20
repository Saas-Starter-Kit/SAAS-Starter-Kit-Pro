import stripe from '../../Config/stripe.js';
import { sendEmail } from '../../Config/email.js';
import moment from 'moment';
import {
  cancelSubscriptionModel,
  createSubscriptionModel
} from '../../Model/mongo/stripe/stripeSubscription.js';

export const UpdateSubscription = async (req, res) => {
  let subscription_id = req.body.subscription_id;
  let payment_method = req.body.payment_method;
  let price = req.body.planSelect;
  let id = req.body.subscription_item;
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

  //Subscription id stays the same only subscription item changes.
  //so no need to update database.
  //optionally add a field to the database for different membership tiers
  //see createSubscription() as an example
};

export const GetSubscription = async (req, res) => {
  let subscription_id = req.query.subscription_id;

  const subscription = await stripe.subscriptions.retrieve(subscription_id);

  res.status(200).send(subscription);
};

export const CreateSubscription = async (req, res) => {
  let customer_id = req.body.customer;
  let payment_method = req.body.payment_method;
  let email = req.body.email;
  let price = req.body.planSelect;
  let planType = req.body.planType;
  let org_id = req.body.org_id;

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

  let subscriptionId = subscription.id;

  if (subscription.status === 'succeeded' || subscription.status === 'trialing') {
    //update db to users subscription
    await createSubscriptionModel(org_id, subscriptionId, planType);

    //send email confirm for subscription creation
    let amount = subscription.plan.amount * 0.01;
    let start_date = moment(subscription.created * 1000).format('MMM Do YYYY');
    let trial_end = moment(subscription.trial_end * 1000).format('MMM Do YYYY');
    let template = 'start subscription';
    let locals = { amount, start_date, trial_end };
    await sendEmail(email, template, locals);

    res.status(200).send(subscription);
  } else {
    //if subscription fails send error message
    res
      .status(400)
      .send({ type: 'Stripe Purchase Error', message: 'Stripe Server Side Purchase Failed' });
    return;
  }
};

export const CancelSubscription = async (req, res) => {
  let org_id = req.body.org_id;
  let email = req.body.email;
  let subscription_id = req.body.subscription_id;

  //delete subscription and send back response
  const subscription = await stripe.subscriptions.del(subscription_id);

  if (subscription.status === 'canceled') {
    //update our own db for canceled subscription
    await cancelSubscriptionModel(org_id);

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
