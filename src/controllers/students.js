const Student = require('../models/students')


async function getAll(filters) {
    return { status: 200, data: await Student.find(filters) }

}

async function get(id) {
    return await Student.findById(id)
        .then(val => {
            if (val)
                return { status: 200, data: val }
            return { status: 404, data: `student not found with id=${id}` }
        })
        .catch(err => {
            return { statu: 500, data: err.message }
        })
}

async function register({ name, email, birthday, phone }) {
    return await Student.create({ name, email, birthday, phone })
        .then(_ => {
            return { status: 204 }
        })
        .catch(err => {
            if (err.code === 11000)
                return { status: 400, data: 'duplicate email' }

            return { status: 500, data: err.message }
        })
}

async function update(id, updateDict) {
    return await Student.findOneAndUpdate({ _id: id }, updateDict, { new: true })
        .then(val => {
            if (val)
                return { status: 204 }
            return { status: 404, data: `student not found with id=${id}` }
        })
        .catch(err => {
            if (err.code === 11000)
                return { status: 400, data: 'duplicate email' }

            return { status: 500, data: err.message }
        })
}

async function remove(id) {
    return await Student.findOneAndRemove({ _id: id })
        .then(val => {
            if (val)
                return { status: 204 }
            return { status: 404, data: `student not found with id=${id}` }
        })
        .catch(err => {
            return { status: 500, data: err.message }
        })
}

module.exports = { getAll, get, register, update, remove }