const axios = require('axios')
const KeycloakAdminClient = require('@keycloak/keycloak-admin-client').default
const config = require('../config/env')


function validate(role) {
    return async function callback(req, res, next) {
        if (!req.headers.authorization)
            return res.status(401).json();

        let requestConfig = {
            method: 'GET',
            url: `${config.keycloakURL}/realms/${config.keycloakRealm}/protocol/openid-connect/userinfo`,
            headers: {
                Authorization: req.headers.authorization,
            },
        };

        let info
        try {
            info = await axios(requestConfig)
        } catch (error) {
            return res.status(error.response.status).json(error.response.data)
        }

        let kcAdminClient = new KeycloakAdminClient({
            baseUrl: config.keycloakURL,
            realmName: config.keycloakRealm
        })

        if (req.session.logged) {
            kcAdminClient.accessToken = req.header.accessToken
            kcAdminClient.refreshToken = req.header.refreshToken
            kcAdminClient.grantType = req.session.grantType
            kcAdminClient.clientId = req.session.clientId

            res.locals.kcAdminClient = kcAdminClient
            return next()
        }

        return res.status(401).json()
    }
}

module.exports = { validate }