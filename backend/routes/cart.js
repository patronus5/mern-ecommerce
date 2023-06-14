const { Router } = require('express')
const cartController = require('../controllers/cartControllers')

const router = Router()

// Fetch all items in the cart of the user who have 'id'
router.get('/cart/:id', cartController.get_cart_items)
// Add an item to the cart of the user who have 'id'
router.post('/cart.:id', cartController.add_cart_item)
// Remove an item from the cart of the user who have 'id'
router.delete('/cart/:userId/:itemId', cartController.delete_item)

module.exports = router