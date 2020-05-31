var express = require('express');
var router = express.Router();

var loadController = require('../controllers/loadController')
router.get('/init', loadController.init);

module.exports = router;