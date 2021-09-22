const axios = require('axios');
const qs = require('qs');
const config = require('../config/env')


async function validate({ username, password }) {
    var data = qs.stringify({
        'grant_type': 'password',
        'client_id': config.keycloakClientId,
        'client_secret': config.keycloakClientSecret,
        'username': username,
        'password': password
    });
    var requestConfig = {
        method: 'post',
        url: 'http://localhost:8080/auth/realms/Demo-Realm/protocol/openid-connect/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    return await axios(requestConfig)
        .then(resp => {
            return { status: resp.status, data: resp.data }
        })
        .catch(error => {
            return { status: error.response.status };
        });
}


module.export = { validate }
