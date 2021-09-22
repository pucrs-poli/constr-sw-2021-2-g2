var session = require('express-session')
var Keycloak = require('keycloak-connect')
const config = require('../config/env')

let _keycloak

let keycloakConfig = {
    clientId: config.keycloakClientId,
    bearerOnly: true,
    serverUrl: 'http://localhost:8080/auth',
    realm: 'Demo-Realm',
    credentials: {
        secret: config.keycloakClientSecret
    }
}


function initKeycloak() {
    if (!_keycloak) {
        var memoryStore = new session.MemoryStore()
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig)
    }
    return _keycloak
}

function getKeycloak() {
    if (!_keycloak) {
        console.error('Keycloak has not been initialized. Please called init first.')
    }
    return _keycloak
}

module.exports = { initKeycloak, getKeycloak }