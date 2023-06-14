const { Router } = require('express')
const authController = require('../controllers/authControllers')
const auth = require('../middlewares/auth')

const router = Router()

// Register a new user
router.post('/register', authController.signup)
// Login with a user credential
router.post('/login', authController.login)
// Fetch a user infomation with jwt token
router.get('/user', auth, authController.get_user)

module.exports = router