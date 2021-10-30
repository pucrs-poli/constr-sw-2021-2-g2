const keycloakAdminClient = require('../config/keycloak')
const jwtDecoder = require('jwt-decode')


async function getToken(req, { username, password, grantType, clientId, clientSecret }) {
    return keycloakAdminClient.auth({
        username,
        password,
        grantType,
        clientId,
        clientSecret
    }).then(_ => {
        let accessToken = keycloakAdminClient.accessToken
        let refreshToken = keycloakAdminClient.refreshToken

        let decoded = jwtDecoder(accessToken)

        req.session.accessToken = accessToken
        req.session.roles = decoded.resource_access['node-client'].roles
        req.session.logged = true

        return {
            status: 200,
            data: {
                accessToken: accessToken,
                refreshToken: refreshToken
            }
        }
    }).catch(error => {
        return { status: 401, data: error.response.data }
    })
}


module.exports = { getToken }