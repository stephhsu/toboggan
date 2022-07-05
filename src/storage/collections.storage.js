const db = require("../config/storage.config.js");

const pool = db.pool;

const createSoilMoistureData = (data) => {
  const values = [
    data.col_id,
    data.sen_id,
    data.moisture_val,
    data.moisture_time,
  ];

  const text =
    "INSERT INTO soil_moisture(collection_ID, sensor, moisture_val, moisture_time) VALUES ($1, $2, $3, $4) RETURNING *";
  return pool.query(text, values);
};

const getCollectionData = (id) => {
  // query collection data from soil moisture table
  // if more types of data and tables in future, query from each one
  const values = [id];
  const text = "SELECT * FROM soil_moisture WHERE collection_ID = $1";

  return pool.query(text, values);
};

module.exports = {
  createSoilMoistureData,
  getCollectionData,
};
