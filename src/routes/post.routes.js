const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const validationMiddleware = require("../middlewares/validation.middleware");

// Return public posts
router.get("/", postController.getPosts);

// Return public post if it exists
router.get(
  "/:id",
  validationMiddleware.postId,
  validationMiddleware.errors,
  postController.getPost
);

module.exports = router;
