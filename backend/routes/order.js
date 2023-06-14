const { Router } = require('express')
const orderController = require('../controllers/orderControllers')

const router = Router()

// Fetch all the orders of the user who have 'id'
router.get('/order/:id', orderController.get_orders)
// Creat a new order regarding the user who have 'id'
router.post('/order/:id', orderController.checkout)

module.exports = router