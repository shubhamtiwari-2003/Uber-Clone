const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controller');

const { body } = require('express-validator');

router.post('/register',[
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must comtain more than 3 letter"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password Must contain more than 6 characters"),
    body("vehicle.color").isLength({ min: 3 })
    .withMessage("First name must comtain more than 3 letter"),
    body("vehicle.plate").isLength({ min: 3 })
    .withMessage("First name must comtain more than 3 letter"),
    body("vehicle.capacity").isInt({ min: 1 })
    .withMessage("Capacity must be atleast 1"),
    body("vehicle.vehicleType").isIn(["car",'motorcycle','auto'])
    .withMessage("Invalid Type"),
  ],
  captainController.registerCaptain)

module.exports = router;