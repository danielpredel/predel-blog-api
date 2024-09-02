const { body, validationResult } = require("express-validator");
const axios = require("axios");

// Post
const newPostValidation = [
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

// Both
const validationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  newPostValidation,
  validationErrors,
};
