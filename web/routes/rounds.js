const router = require('express').Router();
const roundController = require('../controllers/roundController');

router.get('/', roundController.all);

module.exports = router;
