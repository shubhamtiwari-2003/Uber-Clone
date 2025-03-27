import React from "react";

const RidePopUp = (props) => {
  return (
    <div className="">

      <h5
        onClick={() => {
            props.setRidePopUpPanel(false);
        }}
        className=" hover:text-red-600 px-3 absolute text-center top-0 w-[94%] "
      >
        <i className=" text-2xl ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="font-bold text-xl pb-5 pt-4">New Ride for you</h3>
      <div className="flex justify-between items-center p-2 bg-yellow-400 rounded-xl">
        <div className="flex justify-start items-center space-x-4">
          <img
            className="w-14 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmCicxernIb5W2jIRbjKwiMOVIit_7XJtczA&s"
            alt=""
          />
          <h4 className="text-lg font-light"> {props.ride?.user.fullname.firstname} {props.ride?.user.fullname.lastname}</h4>
        </div>
        <div className="text-center">
          <i className="text-2xl font-extralight ri-speed-up-line"></i>
          <h5 className="text-lg font-medium">{props.ride?.distance} km</h5>
          <p className="text-sm text-gray-600">Total Distance</p>
        </div>
      </div>

      <div>
        <div className="flex flex-col items-center justify-between gap-3">
          <div className="border-t w-full p-3 mt-2">
            <div className=" flex items-center gap-3 pb-3">
              <i className=" text-lg ri-map-pin-2-fill"></i>
              <div className="border-b">
                <h4 className="font-bold text-xl">
                  {props.ride?.pickup}
                </h4>
                <span className="text-gray-400 text-sm">
                  Dighi road, Vishrantwadi, Pune, Maharashtra
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 pb-3">
              <i className=" text-lg ri-square-fill"></i>
              <div className="border-b">
                <h4 className="font-bold text-xl">{props.ride?.destination}</h4>
                <span className="text-gray-400 text-sm">
                  Dighi road, Vishrantwadi, Pune, Maharashtra
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 pb-3">
              <i className=" text-lg ri-wallet-fill"></i>
              <div>
                <h3 className="font-bold text-xl">₹{props.ride?.fare}</h3>
                <span className="text-gray-400 text-sm">Cash Cash</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3 w-full">
            <button
              onClick={() => {
                props.setRidePopUpPanel(false);
              }}
              className="bg-gray-400 w-full text-black px-3 py-2 rounded-md font-medium "
            >
              Ignore
            </button>
            <button
              onClick={() => {
                props.confirmRide()
              }}
              className="bg-green-700 w-full text-white px-3 py-2 rounded-md font-medium "
            >
              Accept Ride
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default RidePopUp;
