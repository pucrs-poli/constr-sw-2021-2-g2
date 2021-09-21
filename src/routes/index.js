const express = require('express');
const students = require('./students');
const enroll = require('./enrolls');

const router = express.Router();

router.use('/alunos', students);
router.use('/alunos/:studentId/matriculas', enroll);


module.exports = router;
