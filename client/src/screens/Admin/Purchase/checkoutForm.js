import React, { useState, useEffect, useContext } from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import axios from "axios"
import AuthContext from "../../../utils/authContext"

const CheckoutForm = () => {
  const { authState } = useContext(AuthContext)
  const [setupIntentState, setSetupIntent] = useState()

  const stripe = useStripe()
  const elements = useElements()

  const createSetupIntent = async event => {
    let data = { customer: authState.user }
    const result = await axios.post("http://localhost/stripe/wallet", data)
    setSetupIntent(result.data)
  }

  useEffect(() => {
    if (authState.user) createSetupIntent()
    console.log(authState)
  }, [authState])

  const handleSubmit = async event => {
    event.preventDefault()

    const cardElement = elements.getElement(CardElement)

    const { setupIntent, error } = await stripe.confirmCardSetup(
      setupIntentState.client_secret,
      {
        payment_method: { card: cardElement },
      }
    )

    console.log(setupIntent.payment_method)

    let data = {
      payment_method: setupIntent.payment_method,
      customer: authState.user,
    }

    let result = await axios.post("http://localhost/stripe/subscription", data)
    console.log(
      result.data.latest_invoice.payment_intent.status === "succeeded"
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe && !setupIntentState}>
          Pay
        </button>
      </form>
      <button onClick={() => console.log(authState, setupIntentState)}>
        DDDDDD
      </button>
    </>
  )
}

export default CheckoutForm
