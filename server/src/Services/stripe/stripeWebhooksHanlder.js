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
    case 'payment_intent.created':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!');
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
};
