const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/', userController.all);
router.post('/', userController.newOne);

module.exports = router;
