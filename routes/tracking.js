var express = require('express');
var router = express.Router();

// Require controller module
var tracking_controller = require('../controllers/trackingController');

// Routes

// Fetch random advertisement
router.get('/impression/:id', tracking_controller.impression);
      
// Fetch all advertisements
router.get('/conversion/:id', tracking_controller.conversion);

module.exports = router