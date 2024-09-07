const express = require("express");
const validationMiddleware = require("../middlewares/validation.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const postController = require("../controllers/post.controller");
const router = express.Router();

// Create a new post
router.post(
  "/",
  authMiddleware.validateToken,
  authMiddleware.validateUser,
  validationMiddleware.newPost,
  validationMiddleware.errors,
  postController.createPost
);

// Return all users's posts
router.get("/");

// Return a post if it exists and belongs to the user
router.get(
  "/:id",
  authMiddleware.validateToken,
  authMiddleware.validateUser,
  validationMiddleware.postId,
  validationMiddleware.errors,
  postController.getUserPost
);

// Create a new post
router.post(
  "/",
  validationMiddleware.newPost,
  validationMiddleware.errors,
  postController.createPost
);

// Edits a post if it exists and belongs to the user
router.patch("/:id");

// Deltes a posts if it exists and belongs to the user
router.delete("/:id");

module.exports = router;
