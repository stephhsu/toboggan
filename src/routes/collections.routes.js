const express = require("express");
const router = express.Router();
const controller = require("../controllers/collections.controllers.js");

// POST /collections
router.post("/", controller.postCollection);

// GET /collections/:id
router.get("/:id", controller.getCollection);

module.exports = {
  router,
};
