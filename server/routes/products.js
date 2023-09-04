const express = require('express');
const router = express.Router();
const products = require('../controllers/product');

router.get('/', products.getAll);
router.get('/:id', products.getOne);

router.post('/', products.addNew);
router.patch('/:id', products.updateDetails);
router.delete('/:id', products.deleteOne);

module.exports = router;
