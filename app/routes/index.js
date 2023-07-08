const express = require('express');
const router = express.Router();
const iklanRoutes = require('./iklanRoutes');
const authRoutes = require ('./authRoutes')



// Router Auth
router.use('/api', authRoutes)
// Router Iklan 
router.use('/api/iklans', iklanRoutes)


module.exports = router