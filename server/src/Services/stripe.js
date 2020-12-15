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

  let text = `UPDATE users SET StripeCustomerID=$1 
              WHERE email=$2
              RETURNING StripeCustomerID`;
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
    let text = `UPDATE users SET isPaidMember=$1, subscriptionId=$3
                WHERE email = $2`;
    let values = ['true', email, subscritionId];

    let callback = (q_err, q_res) => {
      if (q_err) res.send(q_err);
      res.send(subscription);
    };

    db.query(text, values, callback);
  }
};

const CancelSubscription = async (req, res) => {
  const subscription = await stripe.subscriptions.del(subscriptionId);
};

export const GetCustomer = async (req, res) => {
  let customer = await stripe.customers.retrieve('cus_IZYimwl472n7S7');

  res.send(customer);
};
