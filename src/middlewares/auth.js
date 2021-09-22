var session = require('express-session')
var Keycloak = require('keycloak-connect')
const config = require('../config/env')

const memoryStore = new session.MemoryStore()

let keycloakConfig = {
    clientId: config.keycloakClientId,
    bearerOnly: true,
    serverUrl: 'http://config.API_URL:8080/auth',
    realm: 'Demo-Realm',
    credentials: {
        secret: config.keycloakClientSecret
    }
}

const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig)

module.exports = { keycloak, memoryStore }