const express = require('express')

const router = express.Router()


router.post('/',
    async (req, res) => {
        req.session.logged = true;

        return res.status(204).json();
    }
)