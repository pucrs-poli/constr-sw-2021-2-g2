const axios = require('axios');
const qs = require('qs');
const config = require('../config/env')


async function getToken({ clientId, clientSecret }) {
    var data = qs.stringify({
        'grant_type': 'client_credentials',
        'client_id': clientId,
        'client_secret': clientSecret
    });
    var requestConfig = {
        method: 'post',
        url: `http://${config.apiURL}:8080/auth/realms/API/protocol/openid-connect/token`,
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


module.exports = { getToken }
