const router = require ('express').Router();
const {
    getIklan,
    getIklanById,
    createIklan,
    updateIklan,
    deleteIklan,
} = require('../controller/iklanController');

// Router CRUD Iklan
router.get('/', getIklan);
router.get('/:id', getIklanById);
router.post('/',  createIklan);
router.put('/:id',  updateIklan);
router.delete('/:id',  deleteIklan);

module.exports = router;
