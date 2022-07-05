const { json } = require("express");
const short = require("short-uuid");
const storage = require("../storage/collections.storage.js");

const postCollection = async (req, res) => {
  // generate collection id
  const col_id = "col_" + short.generate();

  const { data } = req.body;

  // iterate every sensor item
  data.map(async (s) => {
    const sen_id = s.sensor_id;

    // for every measured value of the sensor, send to db
    await Promise.all(
      s.sensor_data.map(async (val) => {
        // soilData is an object that holds the values to insert into db
        const soilData = {
          col_id,
          sen_id,
          moisture_val: val.value,
          moisture_time: val.timestamp,
        };

        try {
          await storage.createSoilMoistureData(soilData);
        } catch (err) {
          console.log(err.stack);
          return res
            .status(400)
            .json({ message: "error posting collection data" });
        }
      })
    );
  });
  res.status(200).json({ message: "success post collection" });
};

const getCollection = async (req, res) => {
  const col_id = req.params.id;
  try {
    const data = await storage.getCollectionData(col_id);
    res.status(200).json(data.rows);
  } catch (err) {
    console.log(err.stack);
    res.status(400).json({ message: "error getting data from collection" });
  }
};

module.exports = {
  postCollection,
  getCollection,
};
