const ObjectID = require('mongodb').ObjectID
const Enroll = require('../models/enrolls')
const config = require('../config/env')
const studentsController = require('./students')


const axios = require('axios');


async function getAll(studentId, filters) {
    return { status: 200, data: await Enroll.find({ studentId: ObjectID(studentId), ...filters }) }

}

async function get(studentId, id) {
    return Enroll.findOne({ studentId: ObjectID(studentId), _id: id })
        .then(val => {
            if (val)
                return { status: 200, data: val }
            return { status: 404, data: `enroll not found with id=${id} and studentId=${studentId}` }
        })
        .catch(err => {
            return { status: 400, data: err.message }
        })
}

async function register(accessToken, studentId, { semester, classId }) {
    let { status, data } = await studentsController.get(studentId)
    if (status !== 200)
        return { status, data }

    let { isValid, status, msg } = checkClass(accessToken, classId);
    if (!isValid)
        return { status: status, data: msg }

    return Enroll.create({ semester, studentId, classId: new ObjectID() })
        .then(_ => {
            return { status: 204 }
        })
        .catch(err => {
            if (err.code === 11000)
                return { status: 400, data: 'duplicate entry' }

            return { status: 400, data: err.message }
        })
}

async function update(accessToken, studentId, id, updateDict) {
    if (updateDict.studentId) {
        let { status, data } = await studentsController.get(updateDict.studentId)
        if (status !== 200)
            return { status, data }
    }

    if (updateDict.classId) {
        let { isValid, _, _ } = checkClass(accessToken, updateDict.classId);
        if (!isValid)
            return { status: 404, data: `class not found with id=${updateDict.classId}` }
    }

    return Enroll.findOneAndUpdate({ studentId: ObjectID(studentId), _id: id }, updateDict, { new: true })
        .then(val => {
            if (val)
                return { status: 204 }
            return { status: 404, data: `enroll not found with id=${id} and studentId=${studentId}` }
        })
        .catch(err => {
            if (err.code === 11000)
                return { status: 400, data: 'duplicate entry' }

            return { status: 400, data: err.message }
        })
}

async function remove(studentId, id) {
    return Enroll.findOneAndRemove({ studentId: ObjectID(studentId), _id: id })
        .then(val => {
            if (val)
                return { status: 204 }
            return { status: 404, data: `enroll not found with id=${id} and studentId=${studentId}` }
        })
        .catch(err => {
            return { status: 400, data: err.message }
        })
}


async function checkClass(accessToken, classId) {
    return await axios({
        method: 'GET',
        url: `${config.classURL}/classes/${classId}`,
        headers: {
            'Authorization': accessToken
        }
    }).then(res => {
        if (res.statusCode === 200)
            return true, 200, 'successfully recovered class'

        return false, res.statusCode, res.data
    }).catch(err => {
        return false, err.response.statusCode, err.response.data
    })
}

module.exports = { getAll, get, register, update, remove }