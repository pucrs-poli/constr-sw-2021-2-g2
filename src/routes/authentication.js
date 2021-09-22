const express = require('express')
const { body, validationResult } = require('express-validator')
const authenticationController = require('../controllers/authentication')

const router = express.Router()


router.post('/',
    body('clientId').isString(),
    body('clientSecret').isString(),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }
        let { status, data } = await authenticationController.getToken(req.body)

        if (status !== 200)
            return res.status(401).json({})

        return res.status(200).json(data)
    }
)


module.exports = router
