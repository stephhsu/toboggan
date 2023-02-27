const { json } = require('express');
const storage = require('../storage/rover.storage.js');

const postCommand = async (req, res) => {
  const { command } = req.body;
  if (command === undefined || command === null) {
    return res.status(400).json({ message: 'must have command' });
  } else {
    try {
      const newCommand = await storage.createCommandInDB();
      console.log('New command created');
      return res.status(200).json(newCommand.rows);
    } catch (err) {
      console.log(err.stack);
      return res.status(400).json({ message: 'error creating new command' });
    }
  }
};

const getCommand = async (req, res) => {
  try {
    const lastCommand = await storage.getLatestPendingCommand();
    return res.status(200).json(lastCommand.rows);
  } catch (err) {
    console.log(err.stack);
    return res
      .status(400)
      .json({ message: 'error getting most recent command' });
  }
};

const postCommandAsReceived = async (req, res) => {
  const id = req.params.id;
  try {
    const command = await storage.updateCommandReceived();
    return res.status(200).json(command.rows);
  } catch (err) {
    console.log(err.stack);
    return res
      .status(400)
      .json({ message: 'error while updating command as received' });
  }
};

module.exports = {
  postCommand,
  getCommand,
  postCommandAsReceived,
};
