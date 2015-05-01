'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ActivitySchema = new Schema({
  name: String,
  info: String,
  active: Boolean
},
  {collection: '3.activity'});

module.exports = mongoose.model('Activity', ActivitySchema);