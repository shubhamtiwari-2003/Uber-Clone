import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainSignup = () => {
  const [captainData, setCaptainData] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
    vehicle: {
      plate: "",
      color: "",
      capacity: "",
      vehicleType: "",
    },
  });

  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext)

  async function submitHandler(event) {
    event.preventDefault();
    
    setCaptainData({
      fullname: {
        firstname: "",
        lastname: "",
      },
      email: "",
      password: "",
      vehicle: {
        plate: "",
        color: "",
        capacity: "",
        vehicleType: "",
      },
    });
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);

    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

  }

  function changeHandler(event) {
    const { name, value } = event.target;
    setCaptainData((prevFormData) => {
      if (name === "firstname" || name === "lastname") {
        return {
          ...prevFormData,
          fullname: {
            ...prevFormData.fullname,
            [name]: value,
          },
        };
      }
      if (name === "capacity" || name === "plate" || name === "color" || name === "vehicleType") {
        return {
          ...prevFormData,
          vehicle: {
            ...prevFormData.vehicle,
            [name]: value,
          },
        };
      }
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  return (
    <div className="flex h-[90vh] justify-between mt-4 flex-col p-5 mx-8 md:w-[40vw] md:m-auto md:h-[100vh] md:flex">
      <div>
        <img
          className="w-16 pt-2"
          onClick={() => {
            navigate("/");
          }}
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX///8AAAAeHh7x8fHPz8/T09P09PQWFhZxcXGqqqp0dHTKysrj4+Ojo6Pp6emcnJyBgYGVlZWxsbHDw8OLi4tMTExSUlK6urrb29s0NDQmJiZEREQ7OzuRkZEbGxtsbGwODg5jY2NZWVk4ODh8fHwsLCxmZmaMbmxuAAAG1klEQVR4nO2d62KqOhCFpVoUFVFRa9W22Nq+/yOeYyXJEHIDYgX2+v6BGcmSQOYScDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADaznx1SYYO7RbJZTWnO6LlZnSnPnllGVxJrO2S33ZLvj373d7ds2t+iIMbqaVdmreL8+1Fvv1z7w42Ju9o8Gpp980a5tsXtj03mj2eOetoEBrbDXm7/W3HgW2v/6CXTXh2VLjg7Z5vO57Ydmy0ezxQyIDC9gKFDChsL1DIgML2AoUMu8JwlPycnrLs6XRezVzizbwD8XT79T5+3U6SmbkLNfGlcL0LChxjl+6+nItWu7V/kV4UhptAwdJ2IlfuVrPPw+vm1sN9fDmeDkfni6O6wlFJYaTq6ZWV6RvXFaxueYhgMRiuMtbs27NCEUfOJIVvn7qu/h9WL3TfF271Vt+yFcsvHN9os+lfKTSjSY48m61eiq01v6HbNXtvhUGk+rbUZlW8ysbqRvt2KFRJnFW00ijUXgJ/rJAZCPYuVnR4qxUenAT6VXhaxut1tDlKu6VsXFjZSq3Qlv/0rvCdzPHRK/1ESlSeC1aJg5VSoaNAfwqlWawwRxYS6ml1K1nhx2rtqs+bwkPpqg9P5GPqp5DdWSmbrLYqKBxXTND6UfitMiYXlqh28CqCzop4AheVwqXC5v4Kx2pbclmJBtzrCjK11VfZiigs3Zj/RqFm6hWVADG9zepYjW02Jnwo1DrYwrk+sl0ffNeb3eqU7+EKKw/RgR+FeitesOJ3DRerV9mKK1S6gBY8KDQUV194o9yXFu6MIb5LZatHKzS5h7zR5rYt7qQ/Uy1iJC9bofDdZMbv/Xk1fBlUYtcKhROTGU9vPEmK3XhqhcKNyYy7Ydltu+B52slaoVB717+SSl/Pa+OOhB1SOKilcNAGhcZRymfv7LZdcZRuPSgUE5R51YinO42UN7bx7EGh8AJfjO3E3C3nS+84W7AuNVIo5mTjuRhM5N/VacYXCYt8LIsQ9zydmJkm5fiwlkIxQxmbiR+2pNCQ2RZOdB6Ti4vCvpBO0EzhyumYiUGh4acRt052H3OxKtFMIck+6yspJGZTKNTOF2JMbtku4XMa78FFmikk4eVW24Zm+soK2S4ZUc1RRsAaq8FiHUmBbkOFZADqah1TokalUDOXHlQNSEZCPWZ+z/K58I0NFdIErVpiQaBS4cGSiSIjMrJY5Xe+QkK7oUJ6EoNt+XcdSvGASqEigbKgDhqVQk5iVrIa8qzAWmVSU2Gxs/KXxIGEWqE8ZxTMCvG8Y0b4w6dCqVKSiCl8kQQlNAqp3TAqfHosHu5MP8tiPmrCghVdQN5YYek8ff+s4iheTZV+slZhELxOkyhKLidptzzys+LHX5MkjpKlVJmhk0lzhZXcRYNCo4Fgbrcp+oIeFEq3S68KFR79yG6lrpA2UDh4Mx2uiUJlyGIp48vL470o1C/+aKZQ47jMNYXrHKl25kfhYP5lOORJDKzSiqEPpcUvW33i4Gw4mByPcYVNn3woTX2cmAQFead5tD4apO8aM2OHUt1pLGfDuc+hc2WdCdVX4+oqikVZLFBmLvTv0qRIpdEaASrXUm0Up505CV9NBV6R19IFn+xWcTtporqep2Dy9E4qjdWzOSmSM5Ostpqzzld9eSEcxZfPq3uYbafxiPyi0Sn4pucl3QXZhszm+5vdYTdNKoymfXTZXY/29POW6gPU/4813rgv6QQAAAAA+DcJ09h9uWMX+Q2rysnN/sCinLa/W6A+LLbJHt2ReyHSRudHd+VOkIJY2581rAkpAzZPlLQTukTkLg9BPhxaYdTXiTsNTVEbF3l1F1pkq75avhPQJwB7mvIiNT8vedn2QevEF3vzLkJT8E757O5BE/Ce0uttg1QMba8+6yjUe/uwN+8iL0Ri29/SVpMLkdjTiJ+slDEufu4udJ3p56M7cx/ouwKqrGPuELTSj3C4o3QzHB5WIKTrQyusRn8g4SSoTxfC4aFdhokO+OAVn7WSOdqP8GAansIOnETrSk8brfdPF3YNZtpfkJKXnVfE8VVGj8TppU16uuC57Ss+m1ug2bLkP2MxqsAzjfT7WVAkF24HLsIa0ExG+++jNaBjtJeJYfpATz+T+yQr3M8CzQ85hb0sstHqTC9XgVH3p5fF7pBUSbuToalC77Ns9N3UXfC3K9P7bHf/KxY0UH50X+4Cfdi79ZmZOlB/uyNBbzX6X8EXL+n8B4Le1ieA60Drab0Meuk7HvoZ9BKFJ3vjbsIV9jLovcJWJ3ShHFqTS4/vMjn7zdTp340AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABA+A+Zvk+7fCNgaAAAAABJRU5ErkJggg=="
          alt=""
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-base font-semibold mb-2"> What's your Name?</h3>
          <div className="flex gap-4">
            <input
              className="rounded-md border-2 px-4 py-1 w-1/2 mb-3 bg-[#eeeeee] placeholder:text-sm "
              required
              type="text"
              id="firstname"
              onChange={changeHandler}
              name="firstname"
              value={captainData.fullname.firstname}
              placeholder="First Name"
            />
            <input
              className="rounded-md border-2 px-4 py-1 w-1/2 mb-3 bg-[#eeeeee] placeholder:text-sm "
              required
              type="text"
              id="lastname"
              onChange={changeHandler}
              name="lastname"
              value={captainData.fullname.lastname}
              placeholder="Last Name"
            />
          </div>

          <h3 className="text-base font-semibold mb-2"> Enter Your Email</h3>
          <input
            className="rounded-md border-2 px-4 py-1 w-full mb-3 bg-[#eeeeee] placeholder:text-sm "
            required
            type="email"
            id="email"
            onChange={changeHandler}
            name="email"
            value={captainData.email}
            placeholder="abc@email.com"
          />

          <h3 className="text-base font-semibold mb-2">Enter Your Password</h3>
          <input
            className="rounded-md border-2 px-4 py-1 w-full mb-3 bg-[#eeeeee] placeholder:text-sm "
            required
            type="password"
            id="password"
            name="password"
            onChange={changeHandler}
            value={captainData.password}
            placeholder="Enter Your Password"
          />

          {/* vehicle details  */}
          <h3 className="text-base font-semibold mb-1">
            Enter Your Vehicle Details
          </h3>

          <div className=" ">
            <div className="flex justify-between ">
              <div>
                <h5 className="text-sm font-semibold mb-1">
                  Vehicle Capacity{" "}
                </h5>
                <input
                  className="rounded-md border-2 px-4 py-1 w-32 mb-1 bg-[#eeeeee] placeholder:text-xs "
                  required
                  type="Number"
                  id="capacity"
                  name="capacity"
                  onChange={changeHandler}
                  value={captainData.vehicle.capacity}
                  placeholder="eg: 2"
                />
              </div>
              <div>
                <h5 className="text-sm font-semibold mb-1">Number Plate </h5>
                <input
                  className="rounded-md border-2 px-4 py-1 w-32 mb-1 bg-[#eeeeee] placeholder:text-xs "
                  required
                  type="text"
                  id="Plate"
                  name="plate"
                  onChange={changeHandler}
                  value={captainData.vehicle.plate}
                  placeholder="MH01AE8017"
                />
              </div>
            </div>

            <div className="flex justify-between ">
              <div>
                <h5 className="text-sm font-semibold mb-1">Colour </h5>
                <input
                  className="rounded-md border-2 px-4 py-1 w-32  mb-3 bg-[#eeeeee] placeholder:text-xs "
                  required
                  type="text"
                  id="color"
                  name="color"
                  onChange={changeHandler}
                  value={captainData.vehicle.color}
                  placeholder="Grey"
                />
              </div>
              <div>
                <h5 className="text-sm font-semibold mb-1">Vehicle Type </h5>
                <select
                  className="rounded-md border-2 px-4 py-1 w-32  mb-3 bg-[#eeeeee] placeholder:text-xs "
                  required
                  id="type"
                  name="vehicleType"
                  onChange={changeHandler}
                  value={captainData.vehicle.vehicleType}
                >
                  <option value="" disabled> Select</option>
                  <option value="car" > Car</option>
                  <option value="auto" > Auto</option>
                  <option value="Moto" > MotorCycle</option>
                </select>
              </div>
            </div>
          </div>

          <button className="rounded-md border-2 px-4 py-1 w-full font-semibold mb-1 bg-black text-white ">
          Register Captain
          </button>
          <p className="text-center ">
            Already Have an Account?{" "}
            <Link to="/captain-login" className=" text-blue-600 py-2 font-light">
              Login Here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="  text-[10px] leading-tight ">
          <span className="font-semibold underline">
            Terms and Conditions :{" "}
          </span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
          tenetur, quibusdam nihil eius et corrupti molestiae, repellendus porro
          iure sed esse dolorum reprehenderit.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
