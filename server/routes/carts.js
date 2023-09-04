var express = require('express');
var router = express.Router();
const carts = require('../controllers/cart');

router.post('/', carts.add);
router.get('/', carts.getItem);
router.get('/:userID', carts.getAll);
router.delete('/', carts.delete);
router.patch('/:userID', carts.updateDetails);

module.exports = router;