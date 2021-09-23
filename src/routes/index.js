const express = require('express')
const students = require('./students')
const enrolls = require('./enrolls')
const users = require('./users')
const authentication = require('./authentication')

const router = express.Router()

router.use('/alunos', students)
router.use('/alunos/:studentId/matriculas', enrolls)
router.use('/login', authentication)
router.use('/users', users)
router.get('/', (_, res) => res.send({ status: 'Ok' }))

module.exports = router
