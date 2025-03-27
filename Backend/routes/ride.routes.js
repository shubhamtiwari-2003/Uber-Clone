const express = require('express');
const router = express.Router();
const {body,query} = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({min: 3}).withMessage('Invalid origin'),
    body('destination').isString().isLength({min: 3}).withMessage('Invalid destination'),
    body('vehicleType').isString().isIn(['moto', 'car', 'auto']).withMessage('Invalid vehicle type'),
    rideController.createRide
)

router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({min: 3}).withMessage('Invalid origin'),
    query('destination').isString().isLength({min: 3}).withMessage('Invalid destination'),
    rideController.getFare
)

router.post('/confirm',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid Ride ID'),
    rideController.confirmRide
)

router.get('/start-ride',
    authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('Invalid Ride ID'),
    query('otp').isNumeric().isLength({ min: 4, max: 6 }).withMessage('Invalid OTP'),
    rideController.startRide
)

module.exports = router;