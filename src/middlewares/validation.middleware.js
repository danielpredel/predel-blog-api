const { body, validationResult } = require("express-validator");
const axios = require("axios");
const { checkEmail } = require("../services/user.service");

// Post
const newPost = [
  body("title")
    .exists()
    .withMessage("The title is required")
    .isString()
    .withMessage("The title must be a string")
    .isLength({ min: 5, max: 50 })
    .withMessage("The title length must be between 5 and 50 characters")
    .custom((value) => {
      return value.trim().length > 0;
    })
    .withMessage("The title cannot contain only whitespaces"),
  body("image")
    .exists()
    .withMessage("The image is required")
    .isURL()
    .withMessage("The image must be a URL")
    .custom(async (value) => {
      try {
        const response = await axios.head(value);
        const contentType = response.headers["content-type"];

        if (!contentType.startsWith("image/")) {
          throw new Error("The URL must be an Image");
        }
      } catch (error) {
        throw new Error("An error has ocur");
      }
    })
    .withMessage("The URL must be an image"),
];

// Users
const newUser = [
  body("name")
    .exists()
    .withMessage("The name is required")
    .isString()
    .withMessage("The name must be a string")
    .isLength({ min: 2, max: 20 })
    .withMessage("The name length must be between 2 and 20 characters")
    .custom((value) => {
      return value.trim().length > 0;
    })
    .withMessage("The name cannot contain only whitespace characters"),
  body("lastname")
    .exists()
    .withMessage("The lastname is required")
    .isString()
    .withMessage("The lastname must be a string")
    .isLength({ min: 2, max: 30 })
    .withMessage("The lastname length must be between 2 and 30 characters")
    .custom((value) => {
      return value.trim().length > 0;
    })
    .withMessage("The lastname cannot contain only whitespace characters"),
  body("image")
    .exists()
    .withMessage("The Image URL is required")
    .isURL()
    .withMessage("Invalid Image URL")
    .custom(async (value) => {
      try {
        const response = await axios.head(value);
        const contentType = response.headers["content-type"];

        if (!contentType.startsWith("image/")) {
          throw new Error("The URL must be an Image");
        }
      } catch (error) {
        throw new Error("An error has ocur");
      }
    })
    .withMessage("The URL must be an image"),
  body("email")
    .exists()
    .withMessage("The email is required")
    .isEmail()
    .withMessage("The email address must be valid")
    .custom((value) => {
      const domain = value.split("@")[1]?.toLowerCase();
      const allowedDomains = ["gmail.com", "outlook.com"];
      return allowedDomains.includes(domain);
    })
    .withMessage("The email domain must be google.com or outlook.com")
    .custom((value) => {
      return checkEmail(value)
        .then((user) => {
          if (!user) {
            return true;
          }
          return Promise.reject("This email is already in use");
        })
        .catch((err) => {
          return Promise.reject(
            "An error occurred while validating the email. Please try again later"
          );
        });
    })
    .withMessage("The email is already taken"),
  body("password")
    .exists()
    .withMessage("The password is required")
    .isString()
    .withMessage("The password must be a string")
    .isLength({ min: 8 })
    .withMessage("The password must be at least 8 characters long")
    .custom((value) => {
      const pattern = /.*[a-z].*[a-z]/;
      return pattern.test(value);
    })
    .withMessage("The password must contain at least two lowercase letters")
    .custom((value) => {
      const pattern = /.*[A-Z].*[A-Z]/;
      return pattern.test(value);
    })
    .withMessage("The password must contain at least two uppercase letters")
    .custom((value) => {
      const pattern = /.*\d.*\d/;
      return pattern.test(value);
    })
    .withMessage("The password must contain at least two digits")
    .custom((value) => {
      const pattern = /.*[!@#$%^&*(),.?":{}|<>].*[!@#$%^&*(),.?":{}|<>]/;
      return pattern.test(value);
    })
    .withMessage("The password must contain at least two symbols"),
  body("confirmPassword")
    .exists()
    .withMessage("The confirmation password is required")
    .isString()
    .withMessage("The confirmation password must be a string")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("The passwords don't match"),
];

// Both
const errors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
      message: "The request data has errors",
    });
  }
  next();
};

module.exports = {
  newPost,
  newUser,
  errors,
};
