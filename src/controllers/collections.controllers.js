const { json } = require("express");
const { generate } = require("short-uuid");
const short = require("short-uuid");
const storage = require("../storage/collections.storage.js");

const postCollection = async (req, res) => {
  // keep track of each date and associated collection id
  let ids = {};

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

const getCollection = async (req, res) => {
  const col_id = req.params.id;
  try {
    const data = await storage.getCollectionData(col_id);

    // get sensor, time, and value from query results
    // create on object to hold time and value
    let pairedData = [];
    data.rows.map((i) => {
      const paired = {
        sensor: i.sensor,
        data: {
          time: i.moisture_time,
          value: i.moisture_val,
        },
      };
      pairedData.push(paired);
    });

    // format and sort collection data by sensor and timestamps
    const formatted = formatAndSortCollection(pairedData);
    res.status(200).json(formatted);
  } catch (err) {
    console.log(err.stack);
    res.status(400).json({ message: "error getting data from collection" });
  }
};

function formatAndSortCollection(data) {
  // separate data by each sensor
  let d = [];
  data.map((item) => {
    let existingIndex = d.findIndex((i) => i.sensor === item.sensor);
    if (existingIndex === -1) {
      // no object for the sensor yet
      const newSensor = {
        sensor: item.sensor,
        data: [item.data],
      };
      d.push(newSensor);
    } else {
      // append sensor data to existing array of data
      d[existingIndex].data.push(item.data);
    }
  });

  // for each sensor, sort data by ascending timestamps
  d.map((sensor) => {
    sensor.data.sort((a, b) => a.time - b.time);
  });

  return d;
}

module.exports = {
  postCollection,
  getCollection,
};
