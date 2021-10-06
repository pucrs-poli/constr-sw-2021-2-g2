const axios = require('axios')
const config = require('../config/env')
const User = require('../models/user')


const ADMIN = "admin"


async function validate_user(username) {
    let user = await User.findOne({ username })
    return !!user && user.enabled
}


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

        return await axios(requestConfig)
            .then(val => {
                if(role === ADMIN){
                    return next()
                }

                validate_user(val.data.preferred_username)
                .then(result => {
                    if(result){
                        return next()
                    }
                    
                    return res.status(401).json()
                })

            }).catch(_ => {
                return res.status(401).json()
            })
    }
}

module.exports = { validate }