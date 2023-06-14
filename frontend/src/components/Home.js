import { useEffect } from 'react'
import AppNavbar from './AppNavbar'
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Container} from 'reactstrap'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { getItems } from '../actions/itemActions'
import { addToCart } from '../actions/cartActions'

const Home = () => {
  const dispatch = useDispatch()
  const { items } = useSelector(state => state.item)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const user = useSelector(state => state.auth.user)

  useEffect(() => {
    dispatch(getItems())
  }, [dispatch])

  const onAddToCart = async (id, productId) => {
    await dispatch(addToCart(id, productId, 1))
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

Home.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  addToCart: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Home
