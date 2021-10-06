const express = require('express')
const authHandler = require('../middlewares/auth')
const usersController = require('../controllers/users')
const { body, param, validationResult } = require('express-validator')

const router = express.Router()


router.get('/',
    authHandler.validate('admin'),
    async (req, res, _) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        let { status, data } = await usersController.getAll()
        return res.status(status).json({ data })
    }
)

router.get('/:id',
    authHandler.validate('admin'),
    param('id').isString(),
    async (req, res, _) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }
        
        let { status, data } = await usersController.get(req.params.id)
        return res.status(status).json({ data })
    }
)

router.post('/',
    authHandler.validate('admin'),
    body('username').isString(),
    body('email').isString(),
    body('firstName').isString(),
    body('lastName').isString(),
    body('emailVerified').isString(),
    async (req, res, _) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        let { status, data } = await usersController.register(req.body)
        return res.status(status).json({ data })
    }
)

router.put('/:id',
    authHandler.validate('admin'),
    param('id').isString(),
    body('username').isString(),
    body('email').isString(),
    body('firstName').isString(),
    body('lastName').isString(),
    body('emailVerified').isString(),
    body('enabled').isString(),
    async (req, res, _) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        let { status, data } = await usersController.update(req.params.id, req.body)
        return res.status(status).json({ data })
    }
)

router.patch('/:id',
    authHandler.validate('admin'),
    param('id').isString(),
    body('username').isString().optional(),
    body('email').isString().optional(),
    body('firstName').isString().optional(),
    body('lastName').isString().optional(),
    body('emailVerified').isString().optional(),
    body('enabled').isString().optional(),
    async (req, res, _) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        let { status, data } = await usersController.update(req.params.id, req.body)
        return res.status(status).json({ data })
    }
)

router.delete('/:id',
    authHandler.validate('admin'),
    param('id').isString(),
    async (req, res, _) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        let { status, data } = await usersController.update(req.params.id, { enabled: false })
        return res.status(status).json({ data })
    }
)

module.exports = router
