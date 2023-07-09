const router = require ('express').Router();
const {
    getIklan,
    getIklanById,
    createIklan,
    updateIklan,
    deleteIklan,
} = require('../controller/iklanController');
const auth = require('../../middleware/authentication');
const isAdmin = require('../../middleware/isAdmin')

// Router CRUD Iklan
router.get('/', getIklan);
router.get('/:id', getIklanById);
router.post('/', auth, isAdmin,createIklan);
router.put('/:id', auth, isAdmin,updateIklan);
router.delete('/:id',auth, isAdmin, deleteIklan);

module.exports = router;
