const express = require('express');

const router = express.Router();
const roundController = require('../controllers/roundController');
const ratingController = require('../controllers/ratingController');
const watcherController = require('../controllers/watcherController');

router.get('/', roundController.all);
router.get('/current', roundController.show);

router.post('/', roundController.newOne);
router.post('/:id/watchers', watcherController.all);
router.post('/:id/ratings', ratingController.newOne);

router.delete('/:id', roundController.del);

module.exports = router;
