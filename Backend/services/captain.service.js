const captainModel = require("../models/captain.model");

module.exports.createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  color,
  vehicleType,
  plate,
  capacity,
}) => {
  if (!firstname || !email || !password || !color || !vehicleType || !plate || !capacity ) {
    throw new Error("All fields are required");
  }
  const captain = captainModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle:{
        color,
        plate,
        capacity,
        vehicleType,
    }
  });

  return captain;
};

 
