const express = require("express");
const validationMiddleware = require("../middlewares/validation.middleware");
const router = express.Router();
const postController = require("../controllers/post.controller");

// Return public posts
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

// Return public post if it exists
router.get("/:id");

module.exports = router;
