import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserLogin = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const {user, setUser} = useContext(UserDataContext);

  const navigate = useNavigate();

  async function submitHandler(event) {
    event.preventDefault();
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      userData
    );

    setUserData({
      email: "",
      password: "",
    });

    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      // console.log(user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }
  }

  function changeHandler(event) {
    const { name, value } = event.target;
    setUserData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  return (
    <div className=" flex h-[90vh] justify-between mt-4 flex-col mx-8 p-5 md:w-[40vw] md:m-auto md:h-[100vh] md:flex">
      <div>
        <img
          className="w-16 my-6 pt-2"
          onClick={() => {
            navigate("/");
          }}
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-base font-semibold mb-2"> What's your email?</h3>
          <input
            className="rounded-md border-2 px-4 py-2 w-full mb-6 bg-[#eeeeee] placeholder:text-sm"
            required
            type="email"
            id="email"
            onChange={changeHandler}
            name="email"
            value={userData.email}
            placeholder="abc@email.com"
          />

          <h3 className=" font-semibold mb-2 text-base">Enter Your Password</h3>
          <input
            className="rounded-md border-2 px-4 py-2 w-full mb-6 bg-[#eeeeee] placeholder:text-sm "
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
          <p className="text-center m-5 ">
            New here?{" "}
            <Link to="/signup" className=" text-blue-600 py-5 font-light">
              Create New Account
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to={"/captain-login"}
          className=" inline-block w-full bg-green-800 text-center text-white py-2 px-6  rounded-md md:mb-20"
        >
          Sign in As Captain
        </Link>
      </div>
    </div>
  );
};
export default UserLogin;
