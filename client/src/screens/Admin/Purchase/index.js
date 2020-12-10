import React from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"

const Purchase = () => {
  const stripe = useStripe()
  const elements = useElements()

  return <div>Purchase</div>
}

export default Purchase
