const express = require('express')
const { body, validationResult } = require('express-validator')
const authenticationController = require('../controllers/authentication')

const router = express.Router()


router.post('/',
    body('username').isString(),
    body('password').isString(),
    body('grantType').isString(),
    body('clientId').isString(),
    body('clientSecret').isString(),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        let { status, data } = await authenticationController.getToken(req, req.body)
        return res.status(status).json(data)
    }
)


module.exports = router
