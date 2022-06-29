const express = require("express");
const router = express.Router();
const controller = require("../controllers/users.controllers.js");

// GET /users
// returns all users
router.get("/", controller.getUsers);

// POST /users creates a new user given an email
// returns the newly created user
router.post("/", controller.createUser);

// DELETE /users deletes a user given the user id. if no user with the id exists, no changes are made
// returns the deleted user, or empty array if no user was deleted
router.delete("/:id", controller.deleteUser);

module.exports = {
  router,
};
