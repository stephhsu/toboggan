const Pool = require('pg').Pool

// TODO: change this to be from process.env file
// creates connection to toboggan database
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'toboggan',
  password: 'password',
  port: 5432,
})

module.exports = {
  pool
}