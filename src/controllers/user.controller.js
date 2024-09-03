const userService = require("../services/user.service");

const createUser = (req, res) => {
  const { name, lastname, image, email, password } = req.body;
  userService
    .createUser(name, lastname, image, email, password)
    .then((user) => {
      res.status(201).json({
        success: true,
        user,
        message: "New user created successfully",
      });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({
          success: false,
          errors: err,
          message: "Something went wrong while creating the user",
        });
    });
};

module.exports = {
  createUser,
};
