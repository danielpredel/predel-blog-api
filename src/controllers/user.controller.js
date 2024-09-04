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
      res.status(500).json({
        success: false,
        errors: err,
        message: "Something went wrong while creating the user",
      });
    });
};

const checkEmail = (req, res) => {
  const { email } = req.query;
  userService
    .checkEmail(email)
    .then((user) => {
      if (user) {
        res.status(200).json({
          success: true,
          available: false,
        });
      } else {
        res.status(200).json({
          success: true,
          available: true,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
      });
    });
};

module.exports = {
  createUser,
  checkEmail,
};
