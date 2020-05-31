var Advertisement = require('../models/advertisement');

exports.index = function(req, res) {
    var sort_by = 'cpi_value';
    var sort_type = -1;
    var query = Advertisement.find();
    query.where('deleted_at').equals(null);
    query.where('active').equals(true);
    query.populate('advertiser_id');
    query.sort([[sort_by, sort_type]]);

    query.exec(function (err, advertisements) {
        res.render('index', { title: 'Indrajit\'s Advertisement Engine', error: err, advertisements: advertisements });
    })
};

// Get a random advertisement
exports.fetch_random = function(req, res){
    var query = Advertisement.find();
    query.where('deleted_at').equals(null);
    query.where('active').equals(true);
    query.populate('advertiser_id');
    
    query.count().exec(function (err, count) {
        if (err) { return res.json({success: false, errors: [err]}); }
        var random = Math.floor(Math.random() * count)

        var final_query = Advertisement.find();
        final_query.where('deleted_at').equals(null);
        final_query.where('active').equals(true);
        final_query.populate('advertiser_id');

        query.findOne().skip(random).exec(
          function (err, advertisement) {
            if (err) { return res.json({success: false, errors: [err]}); }
            res.json({success: true, advertisement: advertisement});
          })
    })
};

// Get all advertisements
exports.fetch_all = function(req, res){
    var sort_by = 'cpi_value';
    var sort_type = -1;
    var query = Advertisement.find();
    query.where('deleted_at').equals(null);
    query.where('active').equals(true);
    query.populate('advertiser_id');
    query.sort([[sort_by, sort_type]]);

    query.exec(function (err, advertisements) {
        if (err) { return res.json({success: false, errors: [err]}); }
        res.json({success: true, advertisements: advertisements});
    })
};
