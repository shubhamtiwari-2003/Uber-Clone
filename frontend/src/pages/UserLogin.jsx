import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const [userData, setUserData] = useState({
    email:"",
    password:"",
  })

  function changeHandler(event){
    const {name,value} = event.target;
    setUserData((prevFormData)=>{
      return {
        ...prevFormData,
        [name]:value
      }
    })
  }

  function submitHandler(event) {
    event.preventDefault();
    console.log(userData);
    setUserData({
      email:"",
      password:"",
    })
  }

  return (
    <div className=" flex h-[90vh] justify-between mt-4 flex-col mx-8 md:w-[40vw] md:m-auto md:h-[100vh] md:flex">
      <div>
        <img
          className="w-16 my-6 pt-2"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-xl font-semibold mb-2"> What's your email?</h3>
          <input
            className="rounded-md border-2 px-4 py-2 w-full mb-6 bg-[#eeeeee] "
            required
            type="email"
            id="email"
            onChange={changeHandler}
            name="email"
            value={userData.email}
            placeholder="abc@email.com"
          />

          <h3 className="text-xl font-semibold mb-2">Enter Your Password</h3>
          <input
            className="rounded-md border-2 px-4 py-2 w-full mb-6 bg-[#eeeeee] "
            required
            type="password"
            id="password"
            name="password"
            onChange={changeHandler}
            value={userData.password}
            placeholder="Enter Your Password"
          />
          <button className="rounded-md border-2 px-4 py-2 w-full font-semibold mb-1 bg-black text-white ">
            Login
          </button>
          <p className="text-center ">New here? <Link to='/signup' className = " text-blue-600 py-2 font-light">Create New Account</Link></p>
        </form>
      </div>
      <div>
        <Link to={'/captain-login'} className=" inline-block w-full bg-green-800 text-center text-white py-2 px-6  rounded-md md:mb-20">
          Sign in As Captain
        </Link>
      </div>
    </div>
  );
};
export default UserLogin;
