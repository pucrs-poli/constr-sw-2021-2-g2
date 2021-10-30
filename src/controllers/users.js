const keycloakAdminClient = require('../config/keycloak')


async function getAll() {
    return { status: 200, data: await keycloakAdminClient.users.find() }
}

async function get(id) {
    return await keycloakAdminClient.users.findOne({ id })
        .then(val => {
            if (val)
                return { status: 200, data: val }
            return { status: 404, data: `user not found with id=${id}` }
        })
        .catch(err => {
            return { status: 400, data: err.message }
        })
}

async function register({ username, email, firstName, lastName, emailVerified }) {

    const clientConf = await keycloakAdminClient.clients.find({ clientId: 'node-client' })
        .then(val => val[0])
        .catch(err => {
            return { status: 400, data: err.response.data }
        })

    if (clientConf.status == 400)
        return clientConf


    const currentRole = await keycloakAdminClient.clients.findRole({ id: clientConf.id, roleName: 'user' })
        .then(val => val)
        .catch(err => {
            return { status: 400, data: err.response.data }
        })

    if (currentRole.status == 400)
        return currentRole


    return await keycloakAdminClient.users.create({ username, email, firstName, lastName, emailVerified, enabled: true })
        .then(async currentUser => {
            try {
                await keycloakAdminClient.users.addClientRoleMappings({
                    id: currentUser.id,
                    clientUniqueId: clientConf.id,
                    roles: [{
                        id: currentRole.id,
                        name: currentRole.name
                    }]
                })
                return { status: 204 }
            } catch (err) {
                try {
                    await keycloakAdminClient.users.del({ id: currentUser.id })
                    return { status: 400, data: err.message }
                } catch (err) {
                    return { status: 500, data: 'User was created but failed to add client role it triggered the user deletion but this error ocurred: ' + err.message }
                }
            }
        })
        .catch(err => {
            return { status: 400, data: err.response.data }
        })
}

async function update(id, updateDict) {
    return await keycloakAdminClient.users.update({ id }, updateDict)
        .then(val => {
            if (val)
                return { status: 204 }
            return { status: 404, data: `user not found with id=${id}` }
        })
        .catch(err => {
            if (err.code === 11000)
                return { status: 400, data: 'duplicate email' }

            return { status: 400, data: err.message }
        })
}

async function resetPassword(id, password) {
    return await keycloakAdminClient.users.resetPassword({
        id,
        credential: {
            temporary: false,
            type: 'password',
            value: password
        }
    }).then(_ => {
        return { status: 204 }
    }).catch(err => {
        return { status: 400, data: err.message }
    })
}


module.exports = { getAll, get, register, update, resetPassword }