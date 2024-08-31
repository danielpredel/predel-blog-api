const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const postController = require("../controllers/post.controller");

router.post(
  "/",
  [
    body("title")
      .isString()
      .isLength({ min: 1 })
      .withMessage("Title is Required"),
    body("image").isURL().withMessage("Invalid Image URL"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  postController.createPostController
);

module.exports = router;
