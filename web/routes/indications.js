const express = require('express');

const router = express.Router();
const indicationController = require('../controllers/indicationController');

const extractBody = (req, res, next) => {
  const { movie_id } = req.body;
};

router.get('/', indicationController.all);

router.get('/current', indicationController.current);

router.post('/', indicationController.newIndication);

router.post('/:id/watchers', indicationController.watchers);

router.post('/:id/ratings', indicationController.ratings);

router.delete('/:id', indicationController.deleteIndication);

module.exports = router;
