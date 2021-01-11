// Use body-parser to retrieve the raw body as a buffer
import stripe from '../../Config/stripe.js';

export const WebHookHandler = async (req, res) => {
  //  console.log(req);
  console.log(req.body);

  const sig = req.headers['stripe-signature'];
  let endpointSecret = 'whsec_vw5NKlrUS9QM5d62zq1QdVz8C6s0bgnn';

  let event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

  console.log(event.type);

  /* 
      There are many reasons why a customer payment might fail
      it is best to notify the customer and handle it on a  
      case by case basis rather than delete their subscription
      programatically. 
  */

  switch (event.type) {
    case 'invoice.payment_failed':
      //send email notification
      break;
    case 'invoice.invoice.payment_action_required ':
      //send email notification
      break;
    case 'customer.subscription.trial_will_end':
      //send email notification
      break;
    case 'customer.subscription.past_due':
      //send email notification
      break;
    case 'customer.subscription.unpaid':
      //send email notification
      break;
    case 'customer.subscription.canceled':
      //send email notification
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
};
