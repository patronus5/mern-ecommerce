import { useState } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, Alert } from 'reactstrap'
import { connect } from 'react-redux'
import { addItem } from '../actions/itemActions'
import PropTypes from 'prop-types'
import AppNavbar from './AppNavbar'

const AddItem = ({ isAuthenticated, addItem }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: ''
  })

  const { title, description, category, price } = formData

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async e => {
    e.preventDefault()

    const newItem = {
      title,
      description,
      category,
      price
    }

    await addItem(newItem)

    alert('Item added successfully')
  }

  return (
    <div>
      <AppNavbar />
      <Container>
        <h2 className='text-center mb-3'>Add a new Item</h2>
        {isAuthenticated ? (
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for='title'>Title</Label>
              <Input
                type='text'
                name='title'
                id='title'
                placeholder='Title of the item'
                value={title}
                onChange={onChange}
              />
              <br />
              <Label for='description'>Description</Label>
              <Input
                type='text'
                name='description'
                id='description'
                placeholder='Description of the item'
                value={description}
                onChange={onChange}
              />
              <br />
              <Label for='category'>Category</Label>
              <Input
                type='text'
                name='category'
                id='category'
                placeholder='Category of the item'
                value={category}
                onChange={onChange}
              />
              <br />
              <Label for='price'>Price</Label>
              <Input
                type='number'
                name='price'
                id='price'
                placeholder='Price of the item'
                value={price}
                onChange={onChange}
              />

              <Button color='dark' style={{ marginTop: '2rem' }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        ) : (
          <Alert className='text-center' color='danger'>
            Login to add items!
          </Alert>
        )}
      </Container>
    </div>
  )
}

AddItem.propTypes = {
  addItem: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { addItem })(AddItem)
