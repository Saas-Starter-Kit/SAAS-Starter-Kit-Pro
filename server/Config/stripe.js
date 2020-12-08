import Stripe from 'stripe';

const stripe = Stripe(process.env.StripeSecret);

export default stripe;
