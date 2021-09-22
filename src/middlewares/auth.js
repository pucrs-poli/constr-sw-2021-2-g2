const axios = require('axios');
const config = require('../config/env')


async function validate(req, res, next) {
    if (!req.headers.authorization)
        return res.status(401).json();

    let requestConfig = {
        method: 'GET',
        url: `http://${config.apiURL}:8080/auth/realms/API/protocol/openid-connect/userinfo`,
        headers: {
            Authorization: req.headers.authorization,
        },
    };

    return await axios(requestConfig)
        .then(resp => {
            if(resp.status === 200)
                return next()

            return res.status(401)
        })
        .catch(error => {
            return res.status(401);
        });
}


module.exports = { validate }