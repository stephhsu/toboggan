const { json } = require('express');
const storage = require('../storage/rover.storage.js');
const RoverCycle = require('../services/roverCycle.service.js');

let roverCycle = undefined;

const getCycleStatus = (req, res) => {
  if (roverCycle !== undefined) {
    if (roverCycle.checkInterval()) {
      return res.status(200).json({ start: true });
    }
  }

  return res.status(204).json();
};

const setCycleTimes = (req, res) => {
  const { interval } = req.body;
  roverCycle = new RoverCycle(interval);
  return res.status(200).json({ message: 'rover cycle set' });
};

module.exports = {
  getCycleStatus,
  setCycleTimes,
};
