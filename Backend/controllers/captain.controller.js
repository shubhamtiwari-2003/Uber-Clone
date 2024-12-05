const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const {validationResult} = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');


module.exports.registerCaptain = async (req,res,next)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }

    const {fullname, email, password, vehicle } = req.body;

    const isExistingCaptain = await  captainModel.findOne({email});

    if(isExistingCaptain){
        return res.status(401).json({message: "Email already in use, please try login"})
    }

    //hashing function used from the captainModel package
    const hashedPassword = await captainModel.hashPassword(password);

    //function defined in userService and used here
    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password:hashedPassword,
        plate: vehicle.plate,
        capacity : vehicle.capacity,
        vehicleType: vehicle.vehicleType,
        color: vehicle.color,
    });

    // function defined in user model for generating token
    const token = captain.generateAuthToken();
    res.status(201).json ({ token, captain });
}

module.exports.loginCaptain = async (req,res,next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const { email, password} = req.body;
    const captain = await captainModel.findOne({email}).select('+password');
    if(!captain){
        return res.status(401).json({message:'Invalid Email or Password' });
    }
    const isMatch = await captain.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message:'Invalid Email or Password' });
    }
    
    
    const token = captain.generateAuthToken();
    res.cookie('token', token);
    
    res.status(200).json({token, captain});
}

module.exports.getCaptainProfile = async (req,res,next)=>{
    res.status(200).json(req.captain);

}

module.exports.logoutCaptain= async (req,res,next)=>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authentication.split(' ')[1];
    await blacklistTokenModel.create({token});
    res.status(200).json({message:"User Logged Out"});
}