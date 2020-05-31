var Advertisement = require('../models/advertisement');

// Track an impression
exports.impression = function(req, res){
    var advertisement_id = req.params.id;
    Advertisement.findById(advertisement_id, function (err, advertisement) {
        if (err) { return res.json({success: false, errors: [err]}); }
        advertisement.total_impressions = (advertisement.total_impressions + 1);
        advertisement.save(function(err){
            if (err) { return res.json({success: false, errors: [err]}); }
            res.json({success: true});
          });
    });
};

// Track a conversion
exports.conversion = function(req, res){
    var advertisement_id = req.params.id;
    Advertisement.findById(advertisement_id, function (err, advertisement) {
        if (err) { return res.json({success: false, errors: [err]}); }
        advertisement.total_conversions = (advertisement.total_conversions + 1);
        advertisement.save(function(err){
            if (err) { return res.json({success: false, errors: [err]}); }
            res.json({success: true});
          });
    });
};