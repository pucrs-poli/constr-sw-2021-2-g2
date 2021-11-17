const express = require('express')
const students = require('./students')
const enrolls = require('./enrolls')

const router = express.Router()

router.use('/students', students)
router.use('/students/:studentId/enrolls', enrolls)
router.get('/', (_, res) => res.send({ status: 'Ok' }))

module.exports = router