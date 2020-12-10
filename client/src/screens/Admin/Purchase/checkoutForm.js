import React, { useState, useEffect } from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import axios from "axios"

const CheckoutForm = () => {
  const [setupIntentState, setSetupIntent] = useState()

  const stripe = useStripe()
  const elements = useElements()

  const createSetupIntent = async event => {
    const result = await axios.post("http://localhost/stripe/wallet")
    setSetupIntent(result.data)
  }

  useEffect(() => {
    createSetupIntent()
  }, [])

  const handleSubmit = async event => {
    event.preventDefault()

    const cardElement = elements.getElement(CardElement)

    const { setupIntent, error } = await stripe.confirmCardSetup(
      setupIntentState.client_secret,
      {
        payment_method: { card: cardElement },
      }
    )

    console.log(setupIntent)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe && !setupIntentState}>
          Pay
        </button>
      </form>
      <button onClick={() => console.log(setupIntentState)}> DDDDDD</button>
    </>
  )
}

export default CheckoutForm
