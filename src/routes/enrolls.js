const express = require('express');
const authHandler = require('../middlewares/auth');
const enrollsController = require('../controllers/enrolls');

const router = express.Router();


router.get('/',
    async (req, res, _) => {
        let { status, out } = await enrollsController.getAll(req.query);
        return res.status(status).json(out);
    }
);

router.get('/:id',
    async (req, res, _) => {
        let { status, out } = await enrollsController.get(req.params.id);
        return res.status(status).json(out);
    }
);

router.post('/',
    authHandler,
    async (req, res, _) => {
        let { status, out } = await enrollsController.post(req.body);
        return res.status(status).json(out);
    }
);

router.put('/:id',
    authHandler,    
    async (req, res, _) => {
        let { status, out } = await enrollsController.update(req.params.id, req.body);
        if(status != 204)
            return res.json(status).json(out);
        return res.status(status);
    }
);

router.patch('/:id',
    authHandler,
    async (req, res, _) => {
        let { status, out } = await enrollsController.update(req.params.id, req.body);
        if(status != 204)
            return res.json(status).json(out);
        return res.status(status);
    }
);

router.delete('/:id',
    authHandler,
    async (req, res, _) => {
        let { status, out } = await enrollsController.delete(req.params.id);
        if(status != 204)
            return res.json(status).json(out);
        return res.status(status);
    }
);

module.exports = router;
