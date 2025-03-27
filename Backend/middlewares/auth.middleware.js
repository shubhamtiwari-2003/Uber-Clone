const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');
const blacklistTokenModel= require('../models/blacklistToken.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



module.exports.authUser = async (req,res,next)=>{
    const token = req.cookies.token ||  req.headers.authorization?.split(' ')[ 1 ];
    if(!token){
        return res.status(401).json({ message : 'Unauthorized user'})
    }
    const isBlacklisted = await blacklistTokenModel.findOne({ token : token});

    if(isBlacklisted){
        return res.status(401).json({message:"Unauthorized! Blacklisted token used"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        return next();
    }catch(err){
        return res.status(401).json({error_name:err.name,error_message:err.message});
    }
}

module.exports.authCaptain = async (req,res,next)=>{
    const token = req.cookies.token ||  req.headers.authorization?.split(' ')[ 1 ];
    if(!token){
        return res.status(401).json({ message : 'Unauthorized user'})
    }
    const isBlacklisted = await blacklistTokenModel.findOne({ token : token});

    if(isBlacklisted){
        return res.status(401).json({message:"Unauthorized! Blacklisted token used"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        req.captain = captain;
        return next();
    }catch(err){
        return res.status(401).json({error_name:err.name,error_message:err.message});
    }

}
