const express = require('express')
const { body, validationResult } = require('express-validator')
const authenticationController = require('../controllers/authentication')

const router = express.Router()


router.post('/',
    body('username').isString(),
    body('password').isString(),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }
        let { status, data } = await authenticationController.validate(req.body)

        if (status !== 200)
            return res.status(401).json({})

        return res.status(204).json(data)
    }
)


module.exports = router
