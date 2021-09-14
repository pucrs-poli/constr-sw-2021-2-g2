const express = require('express');
const authHandler = require('../middlewares/auth');
const studentsController = require('../controllers/students');

const router = express.Router();


router.get('/',
    async (req, res, _) => {
        let { status, out } = await studentsController.getAll(req.query);
        return res.status(status).json(out);
    }
);

router.get('/:id',
    async (req, res, _) => {
        let { status, out } = await studentsController.get(req.params.id);
        return res.status(status).json(out);
    }
);

router.post('/',
    authHandler,
    async (req, res, _) => {
        let { status, out } = await studentsController.register(req.body);
        return res.status(status).json(out);
    }
);

router.put('/:id',
    authHandler,
    async (req, res, _) => {
        let { status, out } = await studentsController.update(req.params.id, req.body);
        if (status != 204)
            return res.json(status).json(out);
        return res.status(status);
    }
);

router.patch('/:id',
    authHandler,
    async (req, res, _) => {
        let { status, out } = await studentsController.update(req.params.id, req.body);
        if (status != 204)
            return res.json(status).json(out);
        return res.status(status);
    }
);

router.delete('/:id',
    authHandler,
    async (req, res, _) => {
        let { status, out } = await studentsController.remove(req.params.id);
        if (status != 204)
            return res.json(status).json(out);
        return res.status(status);
    }
);

module.exports = router;
