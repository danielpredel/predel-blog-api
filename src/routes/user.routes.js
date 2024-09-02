const express = require("express");
const validationMiddleware = require("../middlewares/validation.middleware");
const userController = require("../controllers/user.controller");
const router = express.Router();

router.post(
  "/",
  validationMiddleware.newUserValidation,
  validationMiddleware.validationErrors,
  userController.createUser
);

module.exports = router;
