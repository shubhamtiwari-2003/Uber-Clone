import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="md:max-w-[40vw] md:m-auto ">
      <div className=" bg-cover bg-bottom bg-[url(/images/lerone-pieters-j7bGmTSn1nA-unsplash.jpg)] h-screen w-full flex justify-between flex-col pt-8 ">
        <img
          className="w-24 pl-8 pt-5"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <div className="bg-white py-5 px-5 pb-8">
          <h2 className=" text-2xl font-bold ">Get started with Uber</h2>
          <Link to = '/login' className=" inline-block w-full bg-black text-center text-white py-2 rounded-md mt-3">Continue</Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
