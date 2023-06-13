const mongoose = require('mongoose')
const config = require('config')

const databaseURI = config.get('dbURI')

mongoose
    .connect(databaseURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
    .catch((e) => {
        console.log('connection error: ' + e.message)
    })

const db = mongoose.connection

module.exports = db