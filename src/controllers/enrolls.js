const Enroll = require("../models/enrolls");
var ObjectID = require('mongodb').ObjectID;


async function getAll(studentId, filters) {
    return { status: 200, data: await Enroll.find({ studentId: ObjectID(studentId), ...filters }) }

}

async function get(studentId, id) {
    return await Enroll.findOne({studentId: ObjectID(studentId), _id: id})
        .then(val => {
            if (val)
                return { status: 200, data: val };
            return { status: 404, data: 'id not found' }
        })
        .catch(err => {
            return { statu: 500, data: err.message };
        });
}

async function register(studentId, { semester, classId }) {
    // Test code
    classId = new ObjectID();

    return await Enroll.create({ semester, studentId, classId })
        .then(_ => {
            return { status: 204 };
        })
        .catch(err => {
            if (err.code === 11000) {
                return { status: 400, data: 'duplicate email' };
            }
            return { status: 500, data: err.message };
        });
}

async function update(studentId, id, updateDict) {
    return await Enroll.findOneAndUpdate({ _id: id, studentId: ObjectID(studentId) }, updateDict, { new: true })
        .then(val => {
            if (val)
                return { status: 204 };
            return { status: 404, data: 'id not found' }
        })
        .catch(err => {
            return { status: 500, data: err.message };
        });
}

async function remove(studentId, id) {
    return await Enroll.findOneAndRemove({ _id: id, studentId: ObjectID(studentId) })
        .then(val => {
            if (val)
                return { status: 204 }
            return { status: 404, data: 'id not found' }
        })
        .catch(err => {
            return { status: 500, data: err.message };
        });
}

module.exports = { getAll, get, register, update, remove };