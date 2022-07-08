const { json } = require("express");
const { generate } = require("short-uuid");
const short = require("short-uuid");
const storage = require("../storage/collections.storage.js");

const getCollections = async (req, res) => {
  try {
    const collections = await storage.getCollectionIdAndDate();
    res.status(200).json(collections.rows);
  } catch (err) {
    console.log(err.stack);
    res.status(400).json({ message: "error getting collection ids from db" });
  }
};

const postCollection = async (req, res) => {
  // keep track of each date and associated collection id
  let ids = {};

  // TODO: We are assuming that everytime new data is being added, there are no duplicate dates
  // Need to add functionality that checks for collection ids from existing dates as
  // well (will be similar query as GET /collections)
  function generateCollectionID(day) {
    // if we already have a collection id generated for a day, return the id
    if (day in ids) {
      return ids[day];
    } else {
      const id = "col_" + short.generate();
      ids[day] = id;
      return id;
    }
  }

  const { data } = req.body;

  // iterate every sensor item
  data.map(async (s) => {
    const sen_id = s.sensor_id;

    // for every measured value of the sensor, send to db
    await Promise.all(
      s.sensor_data.map(async (val) => {
        // convert unix timestamp to date object
        // since rover will be deployed quite often, only need to compare days rather than full date format
        const dateObject = new Date(val.timestamp * 1000);
        const day = dateObject.getDate();
        const col_id = generateCollectionID(day);

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

const getCollectionData = async (req, res) => {
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
  getCollections,
  postCollection,
  getCollectionData,
};
