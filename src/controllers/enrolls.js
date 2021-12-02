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
            return { status: 404, data: [{ msg: `enroll not found with id=${id} and studentId=${studentId}` }] }
        })
        .catch(err => {
            return { status: 400, data: [{ msg: err.message }] }
        })
}

async function register(accessToken, studentId, { semester, classId }) {
    let { status, data } = await studentsController.get(studentId)
    if (status !== 200)
        return { status, data }

    let { isValid, classStatus, msg } = await checkClass(accessToken, classId);
    if (!isValid)
        return { status: classStatus, data: [{ msg }] }

    return Enroll.create({ semester, studentId, classId: new ObjectID() })
        .then(_ => {
            return { status: 204 }
        })
        .catch(err => {
            if (err.code === 11000)
                return { status: 400, data: [{ msg: 'duplicate entry' }] }

            return { status: 400, data: [{ msg: err.message }] }
        })
}

async function update(accessToken, studentId, id, updateDict) {
    if (updateDict.studentId) {
        let { status, data } = await studentsController.get(updateDict.studentId)
        if (status !== 200)
            return { status, data }
    }

    if (updateDict.classId) {
        let { isValid, _, ignored } = checkClass(accessToken, updateDict.classId);
        if (!isValid)
            return { status: 404, data: [{ msg: `class not found with id=${updateDict.classId}` }] }
    }

    return Enroll.findOneAndUpdate({ studentId: ObjectID(studentId), _id: id }, updateDict, { new: true })
        .then(val => {
            if (val)
                return { status: 204 }
            return { status: 404, data: [{ msg: `enroll not found with id=${id} and studentId=${studentId}` }] }
        })
        .catch(err => {
            if (err.code === 11000)
                return { status: 400, data: [{ msg: 'duplicate entry' }] }

            return { status: 400, data: [{ msg: err.message }] }
        })
}

async function remove(studentId, id) {
    return Enroll.findOneAndRemove({ studentId: ObjectID(studentId), _id: id })
        .then(val => {
            if (val)
                return { status: 204 }
            return { status: 404, data: [{ msg: `enroll not found with id=${id} and studentId=${studentId}` }] }
        })
        .catch(err => {
            return { status: 400, data: [{ msg: err.message }] }
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
            return { isValid: true, classStatus: 200, msg: 'successfully recovered class' }

        return { isValid: false, classStatus: res.statusCode, msg: res.data }
    }).catch(err => {
        if (err.response)
            return { isValid: false, classStatus: err.response.statusCode, msg: err.response.data }
        return { isValid: false, classStatus: 500, msg: "class server not accessible" }
    })
}

module.exports = { getAll, get, register, update, remove }