const express = require('express');
const { authenticate } = require('../middlewares/passport');
const usersRoutes = require('./users');
const authRoutes = require('./auth');
const debitsRoutes = require('./debits');
const indicationsRoutes = require('./indications');
const moviesRoutes = require('./movies');

moviesRoutes.all('*', authenticate());
usersRoutes.all('*', authenticate());

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/auth', authRoutes);
router.use('/indications', indicationsRoutes);
router.use('/movies', moviesRoutes);
router.use('/debits', debitsRoutes);

module.exports = router;
