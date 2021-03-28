import stripe from '../../Config/stripe.js';
import { PastDue, Unpaid, TrailWillEnd } from './stripeWebhooks.js';

export const WebHookHandler = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

  switch (event.type) {
    // use to test subscription events
    //case 'customer.subscription.created':
    //  console.log(event);
    //  break;
    case 'customer.subscription.trial_will_end':
      TrailWillEnd(event);
      break;
    case 'customer.subscription.past_due':
      PastDue(event);
      break;
    case 'customer.subscription.unpaid':
      Unpaid(event);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
};
