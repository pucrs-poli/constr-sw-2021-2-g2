const KeycloakAdminClient = require('@keycloak/keycloak-admin-client').default
const config = require('../config/env')


async function getToken(req, { username, password, grantType, clientId, clientSecret }) {
    let kcAdminClient = new KeycloakAdminClient({
        baseUrl: config.keycloakURL,
        realmName: config.keycloakRealm
    })

    return kcAdminClient.auth({
        username,
        password,
        grantType,
        clientId,
        clientSecret
    }).then(_ => {
        req.session.logged = true
        req.session.grantType = grantType
        req.session.clientId = clientId

        return {
            status: 200,
            data: {
                accessToken: kcAdminClient.accessToken,
                refreshToken: kcAdminClient.refreshToken
            }
        }
    }).catch(error => {
        return { status: 401, data: error.response.data }
    })
}


module.exports = { getToken }
