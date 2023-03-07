const db = require('../config/storage.config.js');

const pool = db.pool;

const createCommandInDB = (command) => {
  const values = [command];
  const text =
    'INSERT INTO rover_commands(command_type) ' + 'VALUES ($1) RETURNING *';
  return pool.query(text, values);
};

const getLatestPendingCommand = () => {
  const text =
    'SELECT * FROM rover_commands WHERE command_received = false ORDER BY created DESC LIMIT 1';

  return pool.query(text);
};

const updateCommandReceived = (id) => {
  values = [id];
  const text =
    'UPDATE rover_commands SET command_received = true WHERE id = ($1) RETURNING *';
  return pool.query(text, values);
};

module.export = {
  createCommandInDB,
  getLatestPendingCommand,
  updateCommandReceived,
};
