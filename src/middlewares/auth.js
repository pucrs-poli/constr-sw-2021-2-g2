const axios = require('axios')
const config = require('../config/env')


function validate(role) {
    return async function callback(req, res, next) {
        if (!req.headers.authorization)
            return res.status(401).json();

        let requestConfig = {
            method: 'GET',
            url: `${config.keycloakURL}/realms/${config.keycloakRealm}/protocol/openid-connect/userinfo?clientSecret=${req.session.clientSecret}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: req.headers.authorization,
            },
        };

        return await axios(requestConfig)
            .then(_ => {
                if (req.session.roles.includes(role)) {
                    return next();
                }

                return res.status(401).json()

            }).catch(_ => {
                return res.status(401).json()
            })
    }
}

module.exports = { validate }