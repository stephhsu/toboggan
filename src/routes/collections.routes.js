const express = require("express");
const router = express.Router();
const controller = require("../controllers/collections.controllers.js");

// POST /collections
router.post("/", controller.postCollection);

module.exports = {
  router,
};
