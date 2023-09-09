import { sendEmail } from '../../Config/email.js';
import { GetStripeCustomer } from '../../Services/stripe/stripeCustomer.js';
import { CancelPlanbySubId } from '../../Model/sql/org/org.js';

export const TrialWillEnd = async (event) => {
  let customer = event.data.object.customer;

  let StripeRes = await GetStripeCustomer(customer);

  let email = StripeRes.email;

  let price = event.data.object.plan.amount * 0.01;
  let locals = { price };

  let template = 'trial expiring';
  await sendEmail(email, template, locals);
};

export const PastDue = async (event) => {
  let customer = event.data.object.customer;

  let StripeRes = await GetStripeCustomer(customer);

  let email = StripeRes.email;

  let template = 'past due';
  await sendEmail(email, template);
};

export const Unpaid = async (event) => {
  let customer = event.data.object.customer;

  let StripeRes = await GetStripeCustomer(customer);

  let email = StripeRes.email;

  let subscription_id = event.data.object.id;

  await CancelPlanbySubId(subscription_id);

  let template = 'unpaid';
  await sendEmail(email, template);
};
