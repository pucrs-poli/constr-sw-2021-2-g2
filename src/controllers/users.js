

async function getAll(kcAdminClient) {
    return kcAdminClient.users.find().then(val => {
        console.log(val)
    }).catch(error => {
        console.log(error)
    });
}

async function get(kcAdminClient, id) {
    return kcAdminClient.users.fineOne({
        id: id
    }).then(val => {
        console.log(val)
    }).catch(error => {
        console.log(error)
    })
}

async function register(kcAdminClient, { username, email, firstName, lastName, emailVerified, enabled }) {
    return kcAdminClient.users.create({
        username,
        email,
        firstName,
        lastName,
        emailVerified,
        enabled,
    }).then(val => {
        console.log(val)
    }).catch(error => {
        console.log(error)
    })
}

async function update(kcAdminClient, id, updateDict) {
    return kcAdminClient.users.update(
        { id },
        updateDict
    ).then(val => {
        console.log(val)
    }).catch(error => {
        console.log(error)
    })
}


module.exports = { getAll, get, register, update }