const express = require("express");
const router = express.Router();
const controller = require("../controllers/users.controllers.js");

// routes after /users
router.get("/", controller.getUsers);

router.post("/", controller.createUser);

module.exports = {
  router,
};
