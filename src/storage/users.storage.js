const db = require('../config/storage.config.js')

const pool = db.pool

const getUsersFromDB = () => {
  return pool.query('SELECT * FROM users ORDER BY id ASC')
}

module.exports = {
  getUsersFromDB,
}