import { useEffect } from 'react'
import AppNavbar from './AppNavbar'
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Container} from 'reactstrap'
import { connect } from 'react-redux'
import { getItems } from '../actions/itemActions'
import { addToCart } from '../actions/cartActions'

const Home = ({ items, user, isAuthenticated, getItems, addToCart }) => {
  useEffect(() => {
    getItems()
  }, [])

  const onAddToCart = async (id, productId) => {
    addToCart(id, productId, 1)
    alert('Item added to Cart')
  }

  return (
    <div>
      <AppNavbar />
      <Container>
        <div className="row">
          {items.map((item) => (
            <div className="col-md-4" key={item._id}>
              <Card className="mb-4">
                <CardBody>
                  <CardTitle tag="h5">{item.title}</CardTitle>
                  <CardSubtitle tag="h6">Rs. {item.price}</CardSubtitle>
                  <CardText>{item.category}</CardText>
                  {isAuthenticated ? 
                    <Button
                      color="success"
                      size="sm"
                      onClick={() => onAddToCart(user._id, item._id)}
                    >
                      Add To Cart
                    </Button> :
                    null
                  }
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => ({
  items: state.item.items,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})

export default connect(mapStateToProps, { getItems, addToCart })(Home)
