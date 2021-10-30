const mongoose = require('mongoose')
const config = require('./env')


mongoose.connect(config.databaseURI, { useNewUrlParser: true })
    .then(_ => {
        console.log('Successfully conected to MongoDB')
    }).catch(err => {
        console.log('Could not connect to MongoDB with error:')
        console.log(err)
        process.exit(-1)
    })