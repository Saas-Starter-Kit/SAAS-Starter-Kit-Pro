// Use body-parser to retrieve the raw body as a buffer
import stripe from '../../Config/stripe.js';

export const WebHookHandler = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

  switch (event.type) {
    case 'invoice.payment_failed':
      //send email notification
      //ask to fix
      console.log(event);
      break;
    case 'invoice.payment_action_required':
      //send email notification
      console.log(event);
      break;
    case 'customer.subscription.trial_will_end':
      //send email notification
      //link to payment page
      console.log(event);
      break;
    case 'customer.subscription.past_due':
      //send email notification
      //cancel subscription
      console.log(event);
      break;
    case 'customer.subscription.unpaid':
      //send email notification
      //cancel subscription
      console.log(event);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
};
