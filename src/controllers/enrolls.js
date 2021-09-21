const enrollsService = require("../services/enrolls");



async function getAll() {
    return { status: 200, out: await enrollsService.getAll() }

}


async function get(id) {
    let out = await enrollsService.get(id);

    let status;
    if (out.error)
        status = 404
    else
        status = 200;

    return { status, out: out.data }
}


async function register({ semester, classId, studentId }) {
    // Do get request to make sure class exists

    let out = await enrollsService.register({ semester, classId, studentId });

    let status;
    if (out.error)
        status = 400
    else
        status = 200

    return { status, out: out.data }
}


async function update(id, updateDict) {
    let out = await enrollsService.update(id, updateDict);

    let status;
    if (out.error)
        status = 400
    else
        status = 200

    return { status, out: out.data }
}


async function remove(id) {
    let out = await enrollsService.remove(id);

    let status;
    if (out.error)
        status = 400
    else
        status = 200

    return { status, out: out.data }
}


module.exports = { getAll, get, register, update, remove };