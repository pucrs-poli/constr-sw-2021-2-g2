const express = require('express')
const authHandler = require('../middlewares/auth')
const studentsController = require('../controllers/students')
const { body, param, query, validationResult } = require('express-validator')

const router = express.Router()


router.get('/',
    // header('Authorization').isString(),
    // authHandler.validate(),
    query('name').isString().optional(),
    query('email').isEmail().optional(),
    query('birthday').isDate().optional(),
    query('phone').matches(/\+\d{2}\(\d{2}\)\d{5}-\d{4}/).optional(),
    async(req, res, _) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array())
        }

        let { status, data } = await studentsController.getAll(req.query)
        return res.status(status).json(data)
    }
)

router.get('/:id',
    // header('Authorization').isString(),
    // authHandler.validate(),
    param('id').isString(),
    async(req, res, _) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array())
        }

        let { status, data } = await studentsController.get(req.params.id)
        return res.status(status).json(data)
    }
)

router.post('/',
    // header('Authorization').isString(),
    // authHandler.validate(),
    body('name').isString(),
    body('email').isEmail(),
    body('birthday').isDate(),
    body('phone').matches(/\+\d{2}\(\d{2}\)\d{5}-\d{4}/),
    async(req, res, _) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array())
        }

        let { status, data } = await studentsController.register(req.body)
        return res.status(status).json(data)
    }
)

router.put('/:id',
    // header('Authorization').isString(),
    // authHandler.validate(),
    param('id').isString(),
    body('name').isString(),
    body('email').isEmail(),
    body('birthday').isDate(),
    body('phone').matches(/\+\d{2}\(\d{2}\)\d{5}-\d{4}/),
    async(req, res, _) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array())
        }

        let { status, data } = await studentsController.update(req.params.id, req.body)
        return res.status(status).json(data)
    }
)

router.patch('/:id',
    // header('Authorization').isString(),
    // authHandler.validate(),
    param('id').isString(),
    body('name').isString().optional(),
    body('email').isEmail().optional(),
    body('birthday').isDate().optional(),
    body('phone').matches(/\+\d{2}\(\d{2}\)\d{5}-\d{4}/).optional(),
    async(req, res, _) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array())
        }

        let { status, data } = await studentsController.update(req.params.id, req.body)
        return res.status(status).json(data)
    }
)

router.delete('/:id',
    // header('Authorization').isString(),
    // authHandler.validate(),
    param('id').isString(),
    async(req, res, _) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array())
        }

        let { status, data } = await studentsController.remove(req.params.id)
        return res.status(status).json(data)
    }
)

module.exports = router