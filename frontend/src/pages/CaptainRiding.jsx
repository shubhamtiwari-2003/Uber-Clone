import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import FinishRide from "../components/FinishRide";

const CaptainRiding = () => {
  const [finishRidePanel, setfinishRidePanel] = useState(false);
  const finishRideRef = useRef(null);

  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRideRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRideRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );

  return (
    <div className="w-96">
      <div className="h-screen relative bg-green-800 w-96">
        <div className="fixed p-3 top-0 flex justify-between items-center w-96  z-10">
          <img
            className="w-16"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt=""
          />
          <Link
            to={'/captain/logout'}
            className=" h-14 w-10 bg-green-400 flex items-center justify-center rounded-full  z-10"
          >
            <i className="ri-logout-box-r-line"></i>
          </Link>
        </div>
        <img
          className=" h-4/5 object-cover w-full "
          src="https://user-images.githubusercontent.com/6416095/52931260-c6bb5e80-3371-11e9-9d46-83f7d1389d18.gif"
          alt=""
        />
        <div className="rounded-t-xl h-1/5 p-6 flex items-center relative justify-between bg-yellow-400" onClick={() => setfinishRidePanel(true)}>
          <h5
            onClick={() => {}}
            className=" hover:text-red-600 px-3 absolute text-center top-0 w-[94%] "
          >
            <i className=" text-2xl ri-arrow-up-wide-line"></i>
          </h5>
          <h4 className="text-xl font-semibold">4 KM away</h4>
          <button className="bg-red-800  text-white px-3 py-2 rounded-md font-medium ">
            {" "}
            Complete Ride{" "}
          </button> 
        </div>

        <div ref={finishRideRef} className="  fixed  translate-y-full bottom-0 z-10   w-full bg-white p-3 ">
            <FinishRide setfinishRidePanel={setfinishRidePanel}/>
          </div>
      </div>
    </div>
  );
};

export default CaptainRiding;
