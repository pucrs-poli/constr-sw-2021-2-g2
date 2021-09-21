const authenticator = async function (req, res, next) {
    if (req.session.logged)
        return await next()

    return res.status(401).json({ data: 'unauthorized' })
}


module.exports = authenticator
