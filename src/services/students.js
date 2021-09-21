const Student = require("../models/students");


async function getAll() {
    return await Student.find();
}


async function get(id) {
    let data = await Student.findById(id);

    return { error: false, data };
}


async function register({ name, email, birthday, phone }) {
    phone = phone.replace("\s", "");

    let data = await Student.create({ name, email, birthday, phone });

    return { error: false, data };
}


async function update(id, updateDict) {
    let data = await Student.findOneAndUpdate({ _id: id }, updateDict, { new: true });

    return { error: false, data };
}


async function remove(id) {
    let data = await Student.findOneAndDelete({ _id: id });

    return { error: false, data };
}


module.exports = { getAll, get, register, update, remove };