const express = require("express");
const validationMiddleware = require("../middlewares/validation.middleware");
const router = express.Router();
const postController = require("../controllers/post.controller");

// Create a post with title and image
// Return the post's ID
router.post(
  "/",
  validationMiddleware.newPostValidation,
  validationMiddleware.validationErrors,
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
