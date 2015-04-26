'use strict';

var _ = require('lodash');
var Papaclass = require('./papaclass.model');

// Get list of papaclasss
exports.index = function(req, res) {
  Papaclass.find(function (err, papaclasss) {
    if(err) { return handleError(res, err); }
    return res.json(200, papaclasss);
  });
};

// Get a single papaclass
exports.show = function(req, res) {
  Papaclass.findById(req.params.id, function (err, papaclass) {
    if(err) { return handleError(res, err); }
    if(!papaclass) { return res.send(404); }
    return res.json(papaclass);
  });
};

// Creates a new papaclass in the DB.
exports.create = function(req, res) {
  Papaclass.create(req.body, function(err, papaclass) {
    if(err) { return handleError(res, err); }
    return res.json(201, papaclass);
  });
};

// Updates an existing papaclass in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Papaclass.findById(req.params.id, function (err, papaclass) {
    if (err) { return handleError(res, err); }
    if(!papaclass) { return res.send(404); }
    var updated = _.merge(papaclass, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, papaclass);
    });
  });
};

// Deletes a papaclass from the DB.
exports.destroy = function(req, res) {
  Papaclass.findById(req.params.id, function (err, papaclass) {
    if(err) { return handleError(res, err); }
    if(!papaclass) { return res.send(404); }
    papaclass.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}