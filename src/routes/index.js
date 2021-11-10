const express = require('express')
const students = require('./students')
const enrolls = require('./enrolls')

const router = express.Router()

router.use('/alunos', students)
router.use('/alunos/:studentId/matriculas', enrolls)
router.get('/', (_, res) => res.send({ status: 'Ok' }))

module.exports = router