import React from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async event => {
    event.preventDefault()

    const cardElement = elements.getElement(CardElement)

    const { setupIntent, error } = await stripe.confirmCardSetup(
      setupIntent.client_secret,
      {
        payment_method: { card: cardElement },
      }
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    </>
  )
}

export default CheckoutForm
