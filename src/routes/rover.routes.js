const express = require('express');
const router = express.Router();
const controller = require('../controllers/rover.controllers.js');

// GET /rover/commands
router.get('/commands', controller.getCommand);

// POST /rover/commands
router.post('/commands', controller.postCommand);

// POST /rover/commands/:id
router.post('/commands/:id', controller.postCommandAsReceived);

module.exports = {
  router,
};
