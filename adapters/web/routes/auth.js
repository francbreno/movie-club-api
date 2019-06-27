const router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/', authController.newOne);
router.get('/me', authController.show);

module.exports = router;
