const storage = require("../storage/users.storage.js");

const getUsers = async (req, res) => {
  try {
    const users = await storage.getUsersFromDB();
    res.status(200).json(users.rows);
  } catch (err) {
    console.log(err.stack);
    res.status(400).json({ message: "error getting users" });
  }
};

const createUser = async (req, res) => {
  const { email } = req.body;
  if (!email || email.length == 0) {
    return res.status(400).json({ message: "email cannot be null" });
  } else {
    // check if a user with the email already exists
    try {
      const existingUsers = await storage.getUsersByEmail(email);
      if (existingUsers.rowCount > 0) {
        return res
          .status(400)
          .json({ message: "a user with this email already exists" });
      }
    } catch (err) {
      console.log(err.stack);
      return res
        .status(400)
        .json({ message: "error checking for existing user" });
    }

    try {
      const newUser = await storage.createUserInDB(email);
      console.log("new user created");
      return res.status(200).json(newUser.rows);
    } catch (err) {
      console.log(err.stack);
      return res.status(400).json({ message: "error creating new user" });
    }
  }
};

module.exports = {
  getUsers,
  createUser,
};
