const express = require('express');
const router = express.Router();
const iklanRoutes = require('./iklanRoutes');

// Router Iklan 
router.use('/api/iklans', iklanRoutes)


module.exports = router