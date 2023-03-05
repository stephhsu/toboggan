const { json } = require('express');
const storage = require('../storage/rover.storage.js');
const RoverCycle = require('../services/roverCycle.service.js');

let roverCycle = new RoverCycle(null);

const getCycleStatus = (req, res) => {
  const isStartRover = roverCycle.checkInterval();
  if (isStartRover) {
    return res.status(200).json({ start: true });
  }
  return res.status(200).json({ start: false });
};

const setCycleTimes = (req, res) => {
  const { interval, delayStart } = req.body;
  console.log('interval, delay: ', interval, delayStart);
  roverCycle = new RoverCycle(interval, delayStart);
  return res.status(200).json({ message: 'rover cycle set' });
};

module.exports = {
  getCycleStatus,
  setCycleTimes,
};
