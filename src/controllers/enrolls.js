

async function getAll(){
    return {status: 200, out: "potato"}
}


async function get(id){
    return {status: 200, out: "potato"}
}


async function register({name, email}){
    return {status: 200, out: "potato"}
}


async function update(id, updateDict){
    return {status: 200, out: "potato"}
}


async function remove(id){
    return {status: 200, out: "potato"}
}


module.exports = { getAll, get, register, update, remove };