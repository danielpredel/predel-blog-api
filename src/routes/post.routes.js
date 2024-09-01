const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const postController = require("../controllers/post.controller");

// Create a post with title and image
// Return the post's ID
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
