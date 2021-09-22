const app = require('./src/config/express')
const config = require('./src/config/env')

require('./src/config/database')

app.listen(config.apiPort, () => {
    console.log(
        `API Server -${config.apiName}- started and listening on http://${config.apiURL}:${config.apiPort}/ (${config.env})`
    )
})

module.exports = app