const express = require("express");
const validationMiddleware = require("../middlewares/validation.middleware");
const router = express.Router();

router.post(
  "/",
  validationMiddleware.newUserValidation,
  validationMiddleware.validationErrors,
  (req, res) => {
    res.status(200).json({ success: true, message: "Something to do" });
  }
);

module.exports = router;
