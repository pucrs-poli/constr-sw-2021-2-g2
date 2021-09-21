const studentsService = require("../services/students");



async function getAll() {
    return { status: 200, out: await studentsService.getAll() }

}


async function get(id) {
    let out = await studentsService.get(id);

    let status;
    if (out.error)
        status = 404
    else
        status = 200;

    return { status, out: out.data }
}


async function register({ name, email, birthday, phone }) {
    // Do get request do make sure class exists

    let out = await studentsService.register({ name, email, birthday, phone });

    let status;
    if (out.error)
        status = 400
    else
        status = 200

    return { status, out: out.data }
}


async function update(id, updateDict) {
    let out = await studentsService.update(id, updateDict);

    let status;
    if (out.error)
        status = 400
    else
        status = 200

    return { status, out: out.data }
}


async function remove(id) {
    let out = await studentsService.remove(id);

    let status;
    if (out.error)
        status = 400
    else
        status = 200

    return { status, out: out.data }
}


module.exports = { getAll, get, register, update, remove };