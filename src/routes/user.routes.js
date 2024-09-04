const express = require("express");
const validationMiddleware = require("../middlewares/validation.middleware");
const userController = require("../controllers/user.controller");
const router = express.Router();

router.post(
  "/",
  validationMiddleware.newUser,
  validationMiddleware.errors,
  userController.createUser
);

router.get(
  "/check-email",
  userController.checkEmail
);

module.exports = router;
