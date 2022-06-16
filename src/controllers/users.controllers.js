const storage = require('../storage/users.storage.js')


const getUsers = async (request, response) => {
  try {
    const users = await storage.getUsersFromDB()
    response.status(200).json(users.rows)
  }
  catch {
    response.status(400).json({message: "error getting users"})
  }
}

module.exports = {
  getUsers,
}