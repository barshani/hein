var express = require('express');
var router = express.Router();
const admins = require('../controllers/admin');

router.post('/', admins.addNew);
router.get('/:userID', admins.getOne);
router.get('/', admins.getAll);
router.delete('/', admins.deleteOne);

module.exports = router;