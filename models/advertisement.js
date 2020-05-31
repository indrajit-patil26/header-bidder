var mongoose = require('mongoose');
var constants = require('../lib/constants');
var Schema = mongoose.Schema;

var AdvertisementSchema = new Schema({
  description: {type: String, maxlength: 1000, trim: true},
  advertiser_id: { type: Schema.Types.ObjectId, ref: 'Advertiser' , required: true},
  cpi_value: {type: Number, required: true, min: 0},
  cpi_currency: {type: String, required: true, uppercase: true, trim: true, enum: constants.CURRENCIES},
  validity: {type: Date, default: () => Date.now() + 20*365*24*60*60*1000},
  total_impressions: {type: Number, default: 0},
  total_conversions: {type: Number, default: 0},
  deleted_at: Date,
  active: {type: Boolean, default: true}
}, {timestamps: true});

AdvertisementSchema.index({ advertiser_id: 1 });
AdvertisementSchema.index({ validity: -1 });
AdvertisementSchema.index({ active: 1 });
AdvertisementSchema.index({ total_impressions: -1 });
AdvertisementSchema.index({ acttotal_conversions: -1 });

module.exports = mongoose.model('Advertisement', AdvertisementSchema);

