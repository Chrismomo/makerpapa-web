'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PapaclassSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
},
  {collection: '1.papaclass'});

module.exports = mongoose.model('Papaclass', PapaclassSchema);