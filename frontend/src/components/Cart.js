import React, { useState, useEffect } from 'react'
import AppNavbar from './AppNavbar'
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Alert, Container } from 'reactstrap'
import { connect } from 'react-redux'
import { getCart, deleteFromCart } from '../actions/cartActions'
import Checkout from './Checkout'
import { checkout } from '../actions/orderActions'

const Cart = ({  user, cart, isAuthenticated, checkout, getCart, deleteFromCart }) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (isAuthenticated && !cart.loading && !loaded) {
      getCart(user._id)
      setLoaded(true)
    }
  }, [isAuthenticated, cart.loading, loaded])

  const onDeleteFromCart = (id, itemId) => {
    deleteFromCart(id, itemId)
  }

  return (
    <div>
      <AppNavbar />
      {isAuthenticated ? (
        <>
          {cart.cart ? null : (
            <Alert color="info" className="text-center">
              Your cart is empty!
            </Alert>
          )}
        </>
      ) : (
        <Alert color="danger" className="text-center">
          Login to View!
        </Alert>
      )}

      {isAuthenticated && !cart.loading && loaded && cart.cart ? (
        <Container>
          <div className="row">
            {cart.cart.items.map((item) => (
              <div className="col-md-4" key={item.productId}>
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">{item.name}</CardTitle>
                    <CardSubtitle tag="h6">Rs. {item.price}</CardSubtitle>
                    <CardText>Quantity - {item.quantity}</CardText>
                    <Button color="danger" onClick={() => onDeleteFromCart(user._id, item.productId)}>
                      Delete
                    </Button>
                  </CardBody>
                </Card>
                <br />
              </div>
            ))}
            <div className="col-md-12">
              <Card>
                <CardBody>
                  <CardTitle tag="h5">Total Cost = Rs. {cart.cart.bill}</CardTitle>
                  <Checkout user={user._id} amount={cart.cart.bill} checkout={checkout} />
                </CardBody>
              </Card>
            </div>
          </div>
        </Container>
      ) : null}
    </div>
  )
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
})

export default connect(mapStateToProps, { getCart, deleteFromCart, checkout })(Cart)
