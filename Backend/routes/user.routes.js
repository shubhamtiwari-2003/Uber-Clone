const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require('../controllers/user.controller');

router.post("/register", [
  body("email").isEmail().withMessage("Invalid Email"),
  body("fullname.firstname")
    .isLength({ min: 3 })
    .withMessage("First name must comtain more than 3 letter"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password Must contain more than 6 characters"),
],userController.registerUser
);

module.exports = router;
