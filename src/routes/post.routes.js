const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");

// Return public posts
router.get("/", postController.getPosts);

// Return public post if it exists
router.get("/:id");

module.exports = router;
