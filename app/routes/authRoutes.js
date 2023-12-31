const router = require('express').Router();
const {login, register, getProfile, getAllProfile, updateProfile} = require('../controller/authController');

// middleware
const auth = require('../../middleware/authentication');
const isAdmin = require('../../middleware/isAdmin')

// Auth Users
router.post('/auth/login', login);
router.post('/auth/register', register);
router.get('/auth/profile', auth, getProfile);
router.get('/auth/allProfile', auth, isAdmin, getAllProfile);
router.put('/auth/profile', auth, updateProfile);




module.exports = router;