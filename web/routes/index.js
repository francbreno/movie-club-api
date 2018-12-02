const express = require('express');
const userRoutes = require('./users');
const authRoutes = require('./auth');
const debitsRoutes = require('./debits');
const indicationsRoutes = require('./indications');
const moviesRoutes = require('./movies');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/indications', indicationsRoutes);
router.use('/movies', moviesRoutes);
router.use('/debits', debitsRoutes);

module.exports = router;
