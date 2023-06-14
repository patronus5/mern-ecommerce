import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const STRIPE_PUBLISHABLE = 'pk_test_51NIwSSCI9inDxXGfZEeieRzG6wrvKRo36pTKzxAwtRdbI7OcKqGbEGxdYShqT8agMw5rihr3xoQkpGlCPGI3z1EW00wwZ8Wy8m'

const Checkout = ({ amount, user, checkout }) => {
  const onToken = (token) => {
    checkout(user, token.id)
  }

  return (
    <StripeCheckout
      amount={amount * 100}
      token={onToken}
      currency='INR'
      stripeKey={STRIPE_PUBLISHABLE}
    />
  )
}

export default Checkout
