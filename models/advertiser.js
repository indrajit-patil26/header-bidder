const mongoose = require('mongoose');
var constants = require('../lib/constants');
const Schema = mongoose.Schema;

const AdvertiserSchema = new Schema({
  name: {type: String, required: true, index: true, maxlength: 500, lowercase: true, trim: true, unique: true},
  website_url: {type: String, required: true, maxlength: 500, trim: true},
  contact_email: {type: String, required: true, maxlength: 500, lowercase: true, trim: true},
  contact_phone: {type: String, required: true, maxlength: 20, lowercase: true, trim: true},
  contact_designation: {type: String, required: true, maxlength: 100, trim: true},
  contact_address: {type: String, required: true, maxlength: 500, trim: true},
  contact_country_code: {type: String, required: true, maxlength: 5, uppercase: true, trim: true, enum: constants.COUNTRY_CODES},
  contact_state_code: {type: String, required: true, maxlength: 5, uppercase: true, trim: true},
  contact_pincode: {type: String, required: true, maxlength: 20, trim: true},
  deleted_at: Date,
  active: {type: Boolean, default: true}
}, {timestamps: true});

AdvertiserSchema.index({ contact_country_code: 1 });
AdvertiserSchema.index({ active: 1 });

module.exports = mongoose.model('Advertiser', AdvertiserSchema);