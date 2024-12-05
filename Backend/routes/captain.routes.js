const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');

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
  captainController.registerCaptain);
  
  router.post('/login', [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password Must contain more than 6 characters"),
  ],
  captainController.loginCaptain);

  router.get('/profile', authMiddleware.authCaptain , captainController.getCaptainProfile);
  
  router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)

module.exports = router;