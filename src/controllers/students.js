const Student = require('../models/students')
const Enrolls = require('../models/enrolls')


async function getAll(filters) {
    return { status: 200, data: await Student.find(filters) }
}

async function get(id) {
    return Student.findById(id)
        .then(val => {
            if (val)
                return { status: 200, data: val }
            return { status: 404, data: [{ msg: `student not found with id=${id}` }] }
        })
        .catch(err => {
            return { status: 400, data: [{ msg: err.message }] }
        })
}

async function register({ name, email, birthday, phone }) {
    return Student.create({ name, email, birthday, phone })
        .then(_ => {
            return { status: 204 }
        })
        .catch(err => {
            if (err.code === 11000)
                return { status: 400, data: [{ msg: 'duplicate email' }] }

            return { status: 400, data: [{ msg: err.message }] }
        })
}

async function update(id, updateDict) {
    return Student.findOneAndUpdate({ _id: id }, updateDict, { new: true })
        .then(val => {
            if (val)
                return { status: 204 }
            return { status: 404, data: [{ msg: `student not found with id=${id}` }] }
        })
        .catch(err => {
            if (err.code === 11000)
                return { status: 400, data: [{ msg: 'duplicate email' }] }

            return { status: 400, data: [{ msg: err.message }] }
        })
}

async function remove(id) {
    try {

        let result = await Student.findOneAndRemove({ _id: id })
        if (result === null)
            return { status: 404, data: [{ msg: 'User not found' }] }

        await Enrolls.deleteMany({ studentId: id })

        return { status: 204 }

    } catch (err) {
        return { status: 400, data: [{ msg: err.message }] }
    }
}

module.exports = { getAll, get, register, update, remove }