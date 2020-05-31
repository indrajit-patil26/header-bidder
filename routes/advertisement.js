var express = require('express');
var router = express.Router();

// Require controller module
var advertisement_controller = require('../controllers/advertisementController');

// Routes

router.get('/', advertisement_controller.index);

// Fetch random advertisement
router.get('/fetch_random', advertisement_controller.fetch_random);
      
// Fetch all advertisements
router.get('/fetch_all', advertisement_controller.fetch_all);

module.exports = router