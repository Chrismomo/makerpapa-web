'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommunitySchema = new Schema({
  name: String,
  info: String,
  active: Boolean
},
  {collection: '2.community'});

module.exports = mongoose.model('Community', CommunitySchema);