const express = require('express');
const router = express.Router();
const controller = require('../controllers/rover.controllers.js');

// GET /rover/cycle-status
router.get('/cycle-status', controller.getCycleStatus);

// POST /rover/cycle-times
router.post('/cycle-times', controller.setCycleTimes);

module.exports = {
  router,
};
