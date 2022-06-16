const express = require('express')
const router = express.Router() 
const controller = require('../controllers/users.controllers.js')

router.get('/', controller.getUsers)

module.exports = {
  router
}
