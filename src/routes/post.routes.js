const express = require("express");
const { body, validationResult } = require("express-validator");
const axios = require("axios");
const router = express.Router();
const postController = require("../controllers/post.controller");

// Create a post with title and image
// Return the post's ID
router.post(
  "/",
  [
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
      .withMessage('The title cannot contain only whitespaces'),
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
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  postController.createPost
);

router.get("/", (req, res, next) => {
  const header = req.headers["authorization"] || "";
  const token = header.split(" ")[1];
  if (token) {
    // try {
    //   const payload = jwt.verify(token, secretKey);
    //   req.username = payload.username;
    //   next();
    // } catch (error) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Token ivalido",
    //     error: "INVALID_TOKEN",
    //   });
    // }
  } else {
    postController.getPosts(req, res);
  }
  // try {
  //   const payload = jwt.verify(token, secretKey);
  //   req.username = payload.username;
  //   next();
  // } catch (error) {
  //   return res.status(403).json({
  //     success: false,
  //     message: "Token ivalido",
  //     error: "INVALID_TOKEN",
  //   });
  // }
});

module.exports = router;
