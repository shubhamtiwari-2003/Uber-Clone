const {userModel} = require('../models/user.model');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator');


module.exports.registerUser = async (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }

    //destructuring the body coming from post request route
    const {fullname,email,password} = req.body;

    const existingUser = await  userModel.findOne({email});

    if(existingUser){
        return res.status(401).json({message: "Email already in use, please try login"})
    }

    //hashing function used from the userModel package
    const hashedPassword = await userModel.hashPassword(password);

    //function defined in userService and used here
    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password:hashedPassword
    });

    // function defined in user model for generating token
    const token = user.generateAuthToken();

    res.status(201).json ({ token, user });
}

module.exports.loginUser = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()  });
    }
    const {email, password} = req.body;

    const user = await  userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({message:'Invalid Email or Password' });
    }
    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message:'Invalid Email or Password' });
    }

    const token = user.generateAuthToken();

    res.status(200).json({token, user});


}