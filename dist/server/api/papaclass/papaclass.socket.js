/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Papaclass = require('./papaclass.model');

exports.register = function(socket) {
  Papaclass.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Papaclass.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('papaclass:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('papaclass:remove', doc);
}