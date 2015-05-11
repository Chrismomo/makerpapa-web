'use strict';

var express = require('express');
var controller = require('./activity.controller');
var emailSender = require('../email/email.sender');

var router = express.Router();

router.get('/', controller.index);
router.get('/email/send',emailSender.send); // http://localhost:9000/api/activitys/email/send
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;