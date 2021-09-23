const ObjectID = require('mongodb').ObjectID
const Enroll = require('../models/enrolls')
const config = require('../config/env')
const studentsController = require('./students')


const axiosInstance = require('axios').create({ baseUrl: config.classURL })


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

async function register(studentId, { semester, classId }) {
    let { status, data } = await studentsController.get(studentId)
    if (status !== 200)
        return { status, data }

    // if (!checkClass(classId))
    //     return { status: 404, data: `class not found with id=${classId}` }

    // test code
    classId = new ObjectID();

    return Enroll.create({ semester, studentId, classId })
        .then(_ => {
            return { status: 204 }
        })
        .catch(err => {
            if (err.code === 11000)
                return { status: 400, data: 'duplicate entry' }

            return { status: 400, data: err.message }
        })
}

async function update(studentId, id, updateDict) {
    if (updateDict.studentId) {
        let { status, data } = await studentsController.get(updateDict.studentId)
        if (status !== 200)
            return { status, data }
    }

    if (updateDict.classId && !(await checkClass(updateDict.classId)))
        return { status: 404, data: `class not found with id=${updateDict.classId}` }


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


async function checkClass(classId) {
    let authParams = {
        username: config.classUsername,
        password: config.classPassword
    }
    let resp = await axios.post(`${config.classURL}/login`, authParams)
    let cookie = resp.headers["set-cookie"][0]
    axiosInstance.defaults.headers.Cookie = cookie

    return await axiosInstance.get(`${config.classURL}/${classId}`, { responseType: 'json' })
        .then(res => {
            if (res.statusCode === 200)
                return true
            return false
        })
        .catch(_ => {
            return false
        })
}

module.exports = { getAll, get, register, update, remove }