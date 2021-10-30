const KeycloakAdminClient = require('@keycloak/keycloak-admin-client').default
const config = require('../config/env')

const kcAdminClient = new KeycloakAdminClient({
    baseUrl: config.keycloakURL,
    realmName: config.keycloakRealm
})

module.exports = kcAdminClient