const express = require('express')
const authHandler = require('../middlewares/auth')
const enrollsController = require('../controllers/enrolls')
const { body, param, query, validationResult } = require('express-validator')

const router = express.Router({ mergeParams: true })


router.get('/',
    authHandler.validate,
    param('studentId').isString(),
    query('semester').isString().optional(),
    query('classId').isString().optional(),
    async (req, res, _) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        let { status, data } = await enrollsController.getAll(req.params.studentId, req.query)
        return res.status(status).json({ data })
    }
)

router.get('/:id',
    authHandler.validate,
    param('studentId').isString(),
    param('id').isString(),
    async (req, res, _) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        let { status, data } = await enrollsController.get(req.params.studentId, req.params.id)
        return res.status(status).json({ data })
    }
)

router.post('/',
    authHandler.validate,
    param('studentId').isString(),
    body('semester').isString(),
    body('classId').isString(),
    async (req, res, _) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        let { status, data } = await enrollsController.register(req.params.studentId, req.body)
        return res.status(status).json({ data })
    }
)

router.put('/:id',
    authHandler.validate,
    param('studentId').isString(),
    param('id').isString(),
    body('semester').isString(),
    body('studentId').isString(),
    body('classId').isString(),
    async (req, res, _) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        let { status, data } = await enrollsController.update(req.params.studentId, req.params.id, req.body)
        return res.status(status).json({ data })
    }
)

router.patch('/:id',
    authHandler.validate,
    param('studentId').isString(),
    param('id').isString(),
    body('semester').isString().optional(),
    body('studentId').isString().optional(),
    body('classId').isString().optional(),
    async (req, res, _) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        let { status, data } = await enrollsController.update(req.params.studentId, req.params.id, req.body)
        return res.status(status).json({ data })
    }
)

router.delete('/:id',
    authHandler.validate,
    param('studentId').isString(),
    param('id').isString(),
    async (req, res, _) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        let { status, data } = await enrollsController.remove(req.params.studentId, req.params.id)
        return res.status(status).json({ data })
    }
)

module.exports = router
