// Use body-parser to retrieve the raw body as a buffer
import stripe from '../../Config/stripe.js';

export const WebHookHandler = async (req, res) => {
  //  console.log(req);
  console.log(req.body);

  const sig = req.headers['stripe-signature'];
  let endpointSecret = 'whsec_vw5NKlrUS9QM5d62zq1QdVz8C6s0bgnn';

  let event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

  console.log(event.type);

  switch (event.type) {
    case 'invoice.payment_failed':
      //send email notification
      //ask to fix
      break;
    case 'invoice.payment_action_required ':
      //send email notification
      break;
    case 'customer.subscription.trial_will_end':
      //send email notification
      //link to payment page
      break;
    case 'customer.subscription.past_due':
      //send email notification
      //cancel subscription
      break;
    case 'customer.subscription.unpaid':
      //send email notification
      //cancel subscription
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
};
