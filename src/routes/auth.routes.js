const express = require("express");
const validationMiddleware = require("../middlewares/validation.middleware");
const authController = require("../controllers/auth.controller");
const router = express.Router();

router.post(
  "/login",
  validationMiddleware.login,
  validationMiddleware.errors,
  authController.login
);

module.exports = router;
