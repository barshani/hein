var express = require('express');
var router = express.Router();
const favorites = require('../controllers/favorite');

router.post('/', favorites.add);
router.get('/', favorites.getItem);
router.get('/:userID', favorites.getAll);
router.delete('/', favorites.delete);

module.exports = router;