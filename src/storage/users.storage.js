const db = require("../config/storage.config.js");

const pool = db.pool;

const getUsersFromDB = () => {
  return pool.query("SELECT * FROM users ORDER BY id ASC");
};

const getUsersByEmail = (email) => {
  const values = [email];
  const text = "SELECT * FROM users WHERE email = $1";

  return pool.query(text, values);
};

const createUserInDB = (email) => {
  const values = [email];
  const text = "INSERT INTO users(email) VALUES ($1) RETURNING *";

  return pool.query(text, values);
};

const deleteUserByID = (id) => {
  const values = [id];
  const text = "DELETE FROM users WHERE id = ($1) RETURNING *";

  return pool.query(text, values);
};

module.exports = {
  getUsersFromDB,
  getUsersByEmail,
  createUserInDB,
  deleteUserByID,
};
