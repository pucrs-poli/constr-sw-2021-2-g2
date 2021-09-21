const Enroll = require("../models/enrolls");


async function getAll() {
    return await Enroll.find();
}


async function get(id) {
    let data = await Enroll.findById(id);

    return { error: false, data };
}


async function register({ semester, classId, studentId }) {
    let data = await Enroll.create({ semester, classId, studentId });

    return { error: false, data };
}


async function update(id, updateDict) {
    let data = await Enroll.findOneAndUpdate({ _id: id }, updateDict, { new: true });

    return { error: false, data };
}


async function remove(id) {
    let data = await Enroll.findOneAndDelete({ _id: id });

    return { error: false, data };
}


module.exports = { getAll, get, register, update, remove };