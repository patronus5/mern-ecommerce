import React, { useState, useEffect } from 'react'
import AppNavbar from './AppNavbar'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getOrders } from '../actions/orderActions'
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Alert, Container } from 'reactstrap'

const Orders = ({ isAuthenticated, user, order, getOrders }) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (isAuthenticated && !order.loading && !loaded) {
      getOrders(user._id)
      setLoaded(true)
    }
  }, [isAuthenticated, order.loading, loaded, getOrders, user._id])

  return (
    <div>
      <AppNavbar />
      {isAuthenticated ? (
        <>
          {order.orders.length !== 0 ? null : <Alert color="info" className="text-center">You have no orders!</Alert>}
        </>
      ) : (
        <Alert color="danger" className="text-center">
          Login to View!
        </Alert>
      )}

      {isAuthenticated && !order.loading && loaded && order.orders.length ? (
        <Container>
          <div className="row">
            {order.orders.map((order) => (
              <div className="col-md-12" key={order._id}>
                <Card>
                  <CardBody>
                    <CardTitle tag="h4">
                      {order.items.length} items - Total cost: Rs. {order.bill}
                    </CardTitle>
                    <div className="row">
                      {order.items.map((item) => (
                        <div className="col-md-4" key={item.productId}>
                          <Card className="mb-2">
                            <CardBody>
                              <CardTitle tag="h5">
                                {item.name} ({item.quantity} pieces)
                              </CardTitle>
                              <CardSubtitle tag="h6">Rs. {item.price}/piece</CardSubtitle>
                            </CardBody>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
                <br />
              </div>
            ))}
          </div>
        </Container>
      ) : null}
    </div>
  )
}

Orders.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  getOrders: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  order: state.order,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
})

export default connect(mapStateToProps, { getOrders })(Orders)
