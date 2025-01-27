import { React, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  // const navigate = useNavigate();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingforDriverRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false)
  const [vehicleFoundPanel, setVehicleFoundPanel] = useState(false)
  const [waitingforDriverPanel, setWaitingforDriverPanel] = useState(false)

  const locationSubmitHandler = (e) => {
    e.preventDefault();
    console.log(pickup);
    console.log(destination);
  };

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
     function(){
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current,{
        transform:'translateY(0)'
      })
    }
    else{
      gsap.to(vehiclePanelRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[vehiclePanel]
);
  useGSAP(
     function(){
    if(confirmRidePanelOpen){
      gsap.to(confirmRidePanelRef.current,{
        transform:'translateY(0)'
      })
    }
    else{
      gsap.to(confirmRidePanelRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[confirmRidePanelOpen]
);
  useGSAP(
    function(){
    if(vehicleFoundPanel){
      gsap.to(vehicleFoundRef.current,{
        transform:'translateY(0)'
      })
    }
    else{
      gsap.to(vehicleFoundRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[vehicleFoundPanel]
)
  useGSAP(
    function(){
    if(waitingforDriverPanel){
      gsap.to(waitingforDriverRef.current,{
        transform:'translateY(0)'
      })
    }
    else{
      gsap.to(waitingforDriverRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[waitingforDriverPanel]
)

  return (
    <div className="h-screen relative overflow-y-hidden">
      {/* <div className="flex flex-row justify-between z-10"> */}
        <img
          className=" w-16 h-6 absolute left-5 top-8 "
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber"
        />
        {/* <i className=" hamburger p-2 ri-menu-fill  text-3xl"></i> */}
      {/* </div> */}

      <div  className="uber-logo h-[90%]  w-screen ">
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
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
              }}
              className=" pl-4 rounded-md border-2 px-4 py-2 w-full mb-6 bg-[#eeeeee]  placeholder:text-sm"
              type="text"
              placeholder="Add a pickup location"
            ></input>
            <input
              onClick={() => {
                setPanelOpen(true);
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              className=" pl-4 rounded-md border-2 px-4 py-2 w-full mb-6 bg-[#eeeeee]  placeholder:text-sm"
              type="text"
              placeholder="Enter your destination"
            ></input>
          </form>
        </div>
        {/* -------------------------- */}
        <div ref={panelRef} className="h-0 w-full bg-white ">
          <LocationSearchPanel  setVehiclePanel= {setVehiclePanel} setPanelOpen = {setPanelOpen} />
        </div>
      </div>

      <div ref={vehiclePanelRef} className="fixed bottom-0 z-10 translate-y-full  w-full bg-white p-3 ">
        <VehiclePanel setConfirmRidePanelOpen={setConfirmRidePanelOpen} setVehiclePanel={setVehiclePanel}/>
      </div>

      <div ref={confirmRidePanelRef} className="fixed bottom-0 z-10 translate-y-full  w-full bg-white p-3 ">
        <ConfirmedRide setConfirmRidePanelOpen ={setConfirmRidePanelOpen} setVehicleFoundPanel ={setVehicleFoundPanel} />
      </div>

      <div ref={vehicleFoundRef} className="fixed bottom-0 z-10 translate-y-full  w-full bg-white p-3 ">
        <LookingForDriver setVehicleFoundPanel={setVehicleFoundPanel}  />
      </div>

      <div ref={waitingforDriverRef} className="fixed bottom-0 z-10   w-full bg-white p-3 ">
        <WaitingForDriver  setWaitingforDriverPanel={setWaitingforDriverPanel} />
      </div>
    </div>
  );
};

export default Home;
