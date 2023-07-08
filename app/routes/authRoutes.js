const router = require('express').Router();
const {login, register, verify, getProfile, getAllProfile, updateProfile} = require('../controller/authController');

// middleware
const auth = require('../../middleware/authentication');
const isAdmin = require('../../middleware/isAdmin')

// Auth Users
router.post('/auth/login', login);
router.post('/auth/register', register);
router.post('/auth/verify', verify);
router.get('/auth/profile', auth, getProfile);
router.get('/auth/allProfile', auth, isAdmin, getAllProfile);
router.put('/auth/profile', auth, updateProfile);




module.exports = router;