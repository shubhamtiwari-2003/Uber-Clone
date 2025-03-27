import React from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import UserSignup from "./pages/UserSignup";
import UserLogin from "./pages/UserLogin";
import CaptainSignup from "./pages/CaptainSignup";
import CaptainLogin from "./pages/CaptainLogin";
import Home from "./pages/Home";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
import CaptainLogout from "./pages/CaptainLogout";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";

const App = () => {
  return (
    <div className="w-full flex items-center justify-around">
      <div className="hidden md:block  bg-green-500">
        <img
          src="https://cdn.dribbble.com/users/1055192/screenshots/12841366/media/6f7d13c3737aebce2680d4e421e3b33f.gif"
          alt=""
        />
      </div>
      <div className="flex justify-center md:w-3/12  rounded-md ">
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/riding" element={<Riding />} />
          <Route path="/captain-signup" element={<CaptainSignup />} />
          <Route path="/captain-login" element={<CaptainLogin />} />
          <Route path="/captain-riding" element={<CaptainRiding />} />
          <Route
            path="/home"
            element={
              <UserProtectWrapper>
                <Home />
              </UserProtectWrapper>
            }
          />
          <Route
            path="/user/logout"
            element={
              <UserProtectWrapper>
                <UserLogout />
              </UserProtectWrapper>
            }
          />
          <Route
            path="/captain-home"
            element={
              <CaptainProtectWrapper>
                <CaptainHome />
              </CaptainProtectWrapper>
            }
          />

          <Route
            path="/captain/logout"
            element={
              <CaptainProtectWrapper>
                <CaptainLogout />
              </CaptainProtectWrapper>
            }
          />
        </Routes>
      </div>
      
    </div>
  );
};

export default App;
