import { loadStripe } from '@stripe/stripe-js';

const stripeConfig = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default stripeConfig;
