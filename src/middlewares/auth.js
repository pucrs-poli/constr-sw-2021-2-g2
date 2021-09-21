const authenticator = async function (req, res, next) {
    return await next()
}


module.exports = authenticator
