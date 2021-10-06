const User = require('../models/user')


async function getAll(filters) {
    return { status: 200, data: await User.find(filters) }
}

async function get(id) {
    return User.findById(id)
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
    return User.create({ username, email, firstName, lastName, emailVerified, enabled: true })
        .then(_ => {
            return { status: 204 }
        })
        .catch(err => {
            if (err.code === 11000)
                return { status: 400, data: 'duplicate email' }

            return { status: 400, data: err.message }
        })
}

async function update(id, updateDict) {
    return User.findOneAndUpdate({ _id: id }, updateDict, { new: true })
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


module.exports = { getAll, get, register, update }