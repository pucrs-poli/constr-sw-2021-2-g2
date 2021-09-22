const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const { keycloak, memoryStore } = require('../middlewares/auth.js')
const router = require('../routes')


router.get('/', (_, res) => res.send({ status: 'Ok' }))

let config = require('./env')

const app = express()
app.use(session({ store: memoryStore, secret: config.secret, resave: false, saveUninitialized: false }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(keycloak.middleware())

app.use('/api/', router)

module.exports = app
