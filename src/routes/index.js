const express = require('express')
const students = require('./students')
const enroll = require('./enrolls')
const authentication = require('./authentication')

const router = express.Router()

router.use('/alunos', students)
router.use('/alunos/:studentId/matriculas', enroll)
router.use('/login', authentication)
router.get('/', (_, res) => res.send({ status: 'Ok' }))

module.exports = router
