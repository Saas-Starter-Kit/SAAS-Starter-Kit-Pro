import { loadStripe } from "@stripe/stripe-js"

const stripeConfig = loadStripe(process.env.GATSBY_STRIPE_PUBLIC_KEY)

export default stripeConfig
