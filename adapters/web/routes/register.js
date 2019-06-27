const router = require('express').Router();
const registerController = require('../controllers/registerController');

router.post('/', registerController.newOne);

module.exports = router;
