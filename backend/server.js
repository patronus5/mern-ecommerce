const express = require('express')
const path = require('path')
const db = require('./db')

const authRoutes = require('./routes/auth')
const itemRoutes = require('./routes/item')
const cartRoutes = require('./routes/cart')
const orderRoutes = require('./routes/order')

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())

app.use('/api', authRoutes)
app.use('/api', itemRoutes)
app.use('/api', cartRoutes)
app.use('/api', orderRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (_, res) => {
        res.sendFile(path.resolve__dirname, 'client', 'build', 'index.html')
    })
}

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
    // console.log('MongoDB database connection established successfully')
    app.listen(PORT, () => {
        console.log('Server is running on Port: ' + PORT)
    })
})