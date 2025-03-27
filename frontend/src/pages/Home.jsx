import { React, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { UserDataContext } from "../context/UserContext";
import { SocketContext } from "../context/SocketContext";

const Home = () => {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingforDriverRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
  const [vehicleFoundPanel, setVehicleFoundPanel] = useState(false);
  const [waitingforDriverPanel, setWaitingforDriverPanel] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [pickupSuggestion, setPickupSuggestion] = useState([]);
  const [destinationSuggestion, setDestinationSuggestion] = useState([]);
  const [pickuplocations, setPickuplocations] = useState([]);
  const [destinationlocations, setDestinationlocations] = useState([]);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);

  socket.on("ride-confirmed", (ride) => {
    // console.log(ride);
    setRide(ride);
    setVehicleFoundPanel(false);
    setWaitingforDriverPanel(true);
  });

  socket.on('ride-started',(ride) =>{
    setWaitingforDriverPanel(false)
    navigate('/riding')
  })

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestion(response.data);
    } catch (error) {
      //
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestion(response.data);
    } catch {}
  };

  const locationSubmitHandler = (e) => {
    e.preventDefault();
    console.log(pickup);
    console.log(destination);
  };

  async function findTrip() {
    setVehiclePanel(true);
    setPanelOpen(false);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFare(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
  }

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
          overflowY: "visible",
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
          overflowY: "hidden",
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen, panelCloseRef]
  );
  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(3000px)",
        });
      }
    },
    [vehiclePanel]
  );
  useGSAP(
    function () {
      if (confirmRidePanelOpen) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(3000px)",
        });
      }
    },
    [confirmRidePanelOpen]
  );
  useGSAP(
    function () {
      if (vehicleFoundPanel) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(3000px)",
        });
      }
    },
    [vehicleFoundPanel]
  );
  useGSAP(
    function () {
      if (waitingforDriverPanel) {
        gsap.to(waitingforDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingforDriverRef.current, {
          transform: "translateY(3000px)",
        });
      }
    },
    [waitingforDriverPanel]
  );

  return (
    <div className="h-full relative overflow-y-hidden">
      <img
        className=" w-16 h-6 absolute left-5 top-8 "
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber"
      />
      <div className="uber-logo h-[90%]">
        {/* image for temporery use  */}
        <img
          className=" w-100  "
          src="https://user-images.githubusercontent.com/6416095/52931260-c6bb5e80-3371-11e9-9d46-83f7d1389d18.gif"
          alt=""
        />
      </div>

      <div className=" trip-panel flex flex-col justify-end h-screen absolute bottom-0 w-full   ">
        {/* -------------------------- */}
        <div className=" bg-white h-[30%] p-5 relative rounded-t-2xl  ">
          {panelOpen ? (
            <h5
              ref={panelCloseRef}
              onClick={() => {
                setPanelOpen(false);
              }}
              className=" text-2xl cursor-pointer my-4 opacity-0"
            >
              <i className="ri-arrow-down-wide-line  "></i>
            </h5>
          ) : (
            <h4 className="font-bold text-xl  my-4">Find a trip</h4>
          )}
          <form onSubmit={(e) => locationSubmitHandler(e)}>
            <div className="line absolute h-16 w-1 rounded-xl top-[110px] left-[28px] bg-black"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={handlePickupChange}
              className=" pl-4 rounded-md border-2 px-4 py-2 w-full mb-6 bg-[#eeeeee]  placeholder:text-sm"
              type="text"
              placeholder="Add a pickup location"
            ></input>
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={handleDestinationChange}
              className=" pl-4 rounded-md border-2 px-4 py-2 w-full mb-6 bg-[#eeeeee]  placeholder:text-sm"
              type="text"
              placeholder="Enter your destination"
            ></input>
          </form>
          <button
            onClick={findTrip}
            className="bg-black text-white rounded-md p-2 w-full mx-auto"
          >
            Find a trip
          </button>
        </div>

        {/* -------------------------- */}

        <div ref={panelRef} className="h-0 bottom-0 w-full bg-white ">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestion
                : destinationSuggestion
            }
            setActiveField={setActiveField}
            setVehiclePanel={setVehiclePanel}
            setPanelOpen={setPanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            setPickuplocations={setPickuplocations}
            setDestinationlocations={setDestinationlocations}
            activeField={activeField}
          />
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed bottom-0 z-10 translate-y-full  w-full bg-white p-3 "
      >
        <VehiclePanel
          setVehicleType={setVehicleType}
          fare={fare}
          setConfirmRidePanelOpen={setConfirmRidePanelOpen}
          setVehiclePanel={setVehiclePanel}
        />
      </div>

      <div
        ref={confirmRidePanelRef}
        className="fixed bottom-0 z-10 translate-y-full  w-full bg-white p-3 "
      >
        <ConfirmedRide
          pickuplocations={pickuplocations}
          destinationlocations={destinationlocations}
          pickup={pickup}
          destination={destination}
          fare={fare}
          createRide={createRide}
          vehicleType={vehicleType}
          setConfirmRidePanelOpen={setConfirmRidePanelOpen}
          setVehicleFoundPanel={setVehicleFoundPanel}
        />
      </div>

      <div
        ref={vehicleFoundRef}
        className="fixed bottom-0 z-10 translate-y-full  w-full bg-white p-3 "
      >
        <LookingForDriver
          pickuplocations={pickuplocations}
          destinationlocations={destinationlocations}
          pickup={pickup}
          destination={destination}
          fare={fare}
          createRide={createRide}
          vehicleType={vehicleType}
          setConfirmRidePanelOpen={setConfirmRidePanelOpen}
          setVehicleFoundPanel={setVehicleFoundPanel}
        />
      </div>

      <div
        ref={waitingforDriverRef}
        className="fixed bottom-0 z-10   w-full bg-white p-3 "
      >
        <WaitingForDriver
          setWaitingforDriverPanel={setWaitingforDriverPanel}
          ride={ride}
        />
      </div>
    </div>
  );
};

export default Home;
