const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const cors = require('cors')
const router = require('../routes')

router.get('/', (_, res) => res.send({ status: 'Ok' }))

let config = require('./env')
let swaggerDocument = require('../../resources/Construcao-Software-Swagger.json')
swaggerDocument.host = config.apiURL + ':3000'

const app = express()
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(session({ store: new session.MemoryStore(), secret: config.secret, resave: false, saveUninitialized: false }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/', router)

module.exports = app