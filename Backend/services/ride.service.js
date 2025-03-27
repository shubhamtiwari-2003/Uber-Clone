const rideModel = require("../models/ride.model");
const mapService = require("../services/maps.service");
const crypto = require("crypto");
const { sendMessageToSocketId } = require("../socket");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  const baseFare = {
    auto: 20,
    car: 30,
    moto: 15,
  };

  const farePerKm = {
    auto: 10,
    car: 18,
    moto: 7,
  };

  const farePerMinute = {
    auto: 1,
    car: 2,
    moto: 0.5,
  };

  const fare = {
    auto:
      Math.round(baseFare.auto +
      (farePerKm.auto * distanceTime.distance.value) / 1000 +
      farePerMinute.auto * (distanceTime.duration.value / 60),2),
    car:
      Math.round(baseFare.car +
      (farePerKm.car * distanceTime.distance.value) / 1000 +
      farePerMinute.car * (distanceTime.duration.value / 60),2),
    moto:
      Math.round(baseFare.moto +
      (farePerKm.moto * distanceTime.distance.value) / 1000 +
      farePerMinute.moto * (distanceTime.duration.value / 60),2),
  };

  return fare;
}

module.exports.getFare = getFare;

function getOtp(num) {
  function generateOTP() {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString()
      .padStart(num, "0");

    return otp;
  }
  return generateOTP();
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("User, pickup, destination and vehicle type are required");
  }

  const fare = await getFare(pickup, destination);
  const distanceTime = await mapService.getDistanceTime(pickup, destination);
  const otp = getOtp(6)
  const ride = new rideModel({
    user,
    pickup,
    destination, 
    fare: fare[vehicleType],
    otp,
    distance: Math.round(distanceTime.distance.value/1000,2),
    duration: Math.round(distanceTime.duration.value/60,2)
  });

  await ride.save();

  return ride;
};

module.exports.confirmRide = async ({
  rideId,captainId
})=>{
  if(!rideId){
    throw  new Error('Ride id is required');
  }

  await rideModel.findOneAndUpdate({
    _id: rideId
  },{
    status:'accepted',
    captain: captainId
  })

  const ride = await rideModel.findOne({
    _id: rideId
  }).populate('user').populate('captain').select('+otp');

  if(!ride){
    throw new Error('Ride not found');
  }

  return ride;
}

module.exports.startRide = async ({
  rideId,otp,captain
})=>{
  if(!rideId || !otp){
    throw  new Error('Ride id and OTP are required');
  }

  

  const ride = await rideModel.findOne({
    _id: rideId
  }).populate('user').populate('captain').select('+otp');

  if(!ride){
    throw new Error('Ride not found');
  }

  if (ride.otp !== otp) {
    throw new Error('Invalid OTP');
  }

  await rideModel.findOneAndUpdate({
    _id: rideId
  },{
    status:'ongoing'
  })

  sendMessageToSocketId(ride.user.scoketId,{
    event: 'ride-started',
    data: ride
  })

  return ride;
}


