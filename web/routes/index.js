const express = require('express');
const { authenticate } = require('../middlewares/passport');
const usersRoutes = require('./users');
const authRoutes = require('./auth');
const registerRoutes = require('./register');
const debitsRoutes = require('./debits');
const roundsRoutes = require('./rounds');
const moviesRoutes = require('./movies');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/register', registerRoutes);

router.use(authenticate());

router.use('/users', usersRoutes);
router.use('/rounds', roundsRoutes);
router.use('/movies', moviesRoutes);
router.use('/debits', debitsRoutes);

module.exports = router;
