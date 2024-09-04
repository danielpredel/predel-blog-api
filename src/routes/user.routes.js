const express = require("express");
const validationMiddleware = require("../middlewares/validation.middleware");
const userController = require("../controllers/user.controller");
const userPostsRouter = require("./user.post.routes");
const router = express.Router();

// Create new user (Sign Up)
router.post(
  "/",
  validationMiddleware.newUser,
  validationMiddleware.errors,
  userController.createUser
);

// Verify email's availability
router.get("/check-email", userController.checkEmail);

// Send verification email
router.get("/request-verification-email");

// Validate email
router.post("/verify-email");

router.use("/posts", userPostsRouter);

module.exports = router;
