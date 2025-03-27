import React, { useContext, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { CaptainDataContext } from "../context/CaptainContext";
import { SocketContext } from "../context/SocketContext";
import axios from "axios";

const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const [ride, setRide] = useState(null);
  const ridePopUpRef = useRef(null);

  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const confirmRidePopUpRef = useRef(null);
  const { captain } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketContext);

  const confirmRide = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
    )
    setRidePopUpPanel(false)
    setConfirmRidePopUpPanel(true)
  };

  useEffect(() => {
    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log({
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };
    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();
  }, [captain]);

  socket.on("new-ride", (data) => {
    console.log("New Ride:", data);
    setRide(data);
    setRidePopUpPanel(true);
  });

  useGSAP(
    function () {
      if (ridePopUpPanel) {
        gsap.to(ridePopUpRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopUpRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopUpPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePopUpPanel) {
        gsap.to(confirmRidePopUpRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopUpRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopUpPanel]
  );

  return (
    <div className="w-96">
      <div className="h-screen w-96">
        <div className="fixed p-3 top-0 flex justify-between items-center z-10 w-96">
          <img
            className="w-16"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt=""
          />
          <Link
            to={"/captain/logout"}
            className=" h-10 w-10 bg-yellow-400 flex items-center justify-center rounded-full  z-10"
          >
            <i className="ri-logout-box-r-line"></i>
          </Link>
        </div>
        <img
          className=" h-3/5 object-cover w-full "
          src="https://user-images.githubusercontent.com/6416095/52931260-c6bb5e80-3371-11e9-9d46-83f7d1389d18.gif"
          alt=""
        />
        <div className=" rounded-t-xl h-2/5 bg-yellow-200">
          <CaptainDetails />
        </div>

        <div
          ref={ridePopUpRef}
          className=" rounded-t-xl  fixed translate-y-full bottom-0 z-10   w-full bg-white p-3 "
        >
          <RidePopUp
            ride={ride}
            setRidePopUpPanel={setRidePopUpPanel}
            setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
            confirmRide={confirmRide}
          />
        </div>

        <div
          ref={confirmRidePopUpRef}
          className="  fixed h-screen translate-y-full bottom-0 z-10   w-full bg-white p-3 "
        >
          <ConfirmRidePopUp
            ride={ride}
            setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
            setRidePopUpPanel={setRidePopUpPanel}
          />
        </div>
      </div>
    </div>
  );
};

export default CaptainHome;
