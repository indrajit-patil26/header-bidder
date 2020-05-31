var Advertisement = require('../models/advertisement');
var Advertiser = require('../models/advertiser');
 
exports.init = (req, res) => {
  
  // Add Advertiser
  var advertiser1 = new Advertiser({
    name: 'google',
    website_url: 'http://google.com',
    contact_email: 'test1@test.com',
    contact_phone: '+919999999991',
    contact_designation: 'VP',
    contact_address: 'TestAddress1',
    contact_country_code: 'IN',
    contact_state_code: 'MH',
    contact_pincode: '400001'
  });
  
  var advertiser2 = new Advertiser({
    name: 'facebook',
    website_url: 'http://facebook.com',
    contact_email: 'test2@test.com',
    contact_phone: '+919999999992',
    contact_designation: 'VP',
    contact_address: 'TestAddress2',
    contact_country_code: 'IN',
    contact_state_code: 'MH',
    contact_pincode: '400001'
  });
  
  advertiser1.save(function (err){
   if(err) return console.error(err.stack)
   console.log("Advertiser 1 added")
  });
  
  advertiser2.save(function(err){
    if(err) return console.error(err.stack);
    console.log("Advertiser 2 added")
  })
  
  // Add Advertisements
  var advertisement1 = new Advertisement({
    description: 'Google - Best search engine!',
    cpi_value: 800,
    cpi_currency: 'INR'
  });
  advertisement1.advertiser_id = advertiser1._id;
  
  var advertisement2 = new Advertisement({
    description: 'Youtube - Best video library!',
    cpi_value: 600,
    cpi_currency: 'INR'
  });
  advertisement2.advertiser_id = advertiser1._id;

  var advertisement3 = new Advertisement({
    description: 'Facebook - Best way to socialize!',
    cpi_value: 700,
    cpi_currency: 'INR'
  });
  advertisement3.advertiser_id = advertiser2._id;

  var advertisement4 = new Advertisement({
    description: 'Whatsapp - Chat away!',
    cpi_value: 500,
    cpi_currency: 'INR'
  });
  advertisement4.advertiser_id = advertiser2._id;
  
  advertisement1.save(function(err){
    if(err) return console.log(err.stack);
    console.log("Advertisement1 added")
  });
  
  advertisement2.save(function(err){
    if(err) return console.log(err.stack);
    console.log("Advertisement2 added");
  });

  advertisement3.save(function(err){
    if(err) return console.log(err.stack);
    console.log("Advertisement3 added")
  });
  
  advertisement4.save(function(err){
    if(err) return console.log(err.stack);
    console.log("Advertisement4 added");
  });
  
  // Return Message
  res.send("Seed data added.");
}