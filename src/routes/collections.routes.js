const express = require("express");
const router = express.Router();
const controller = require("../controllers/collections.controllers.js");

// GET /collections
router.get("/", controller.getCollections);

// POST /collections
router.post("/", controller.postCollection);

// GET /collections/:id
router.get("/:id", controller.getCollectionData);

module.exports = {
  router,
};
