const mongoose = require('mongoose')
const config = require('../config')

mongoose.Promise = global.Promise

const database = () => {
    mongoose.connect(config.db, {
        useMongoClient: true
    })

    const db = mongoose.connection

    if (config.env === 'development') {
        mongoose.set('debug', true)
    }

    db.on('error', err => {
        console.warn(err)
    })

    db.on('disconnected', () => {
        console.warn('disconnected')
    })

    db.on('open', () => {
        console.log('Connected to MongoDB', config.db)
    })
}

module.exports = database
