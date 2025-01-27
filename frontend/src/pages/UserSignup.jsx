import React, { useContext, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserSignup = () => {

  
  const [userData, setUserData] = useState({
    fullname:{
      firstname:"",
      lastname:"",
    },
    email:"",
    password:"",
  })
  
const navigate =useNavigate();
const [user,setUser]=useContext(UserDataContext);


async function submitHandler(event) {
  event.preventDefault();
   

  const response =await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,userData)
  setUserData({
    fullname:{
      firstname:"",
      lastname:"",
    },
    email:"",
    password:"",
  })

  if(response.status===201){
    const data = response.data;
    setUser(data.user);
    localStorage.setItem('token',data.token)
    navigate('/home');
  }
  
}



  function changeHandler(event){
    const {name,value} = event.target;
    setUserData((prevFormData) => {
      if (name === "firstname" || name === "lastname") {
        return {
          ...prevFormData,
          fullname: {
            ...prevFormData.fullname,
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
    <div className=" flex h-[90vh] justify-between mt-4 flex-col mx-8 md:w-[40vw] md:m-auto md:h-[100vh] md:flex">
      <div>
        <img
          className="w-16 my-6 pt-2" onClick={()=>{navigate('/')}}
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form onSubmit={submitHandler}>

          <h3 className="text-base font-semibold mb-2"> What's your Name?</h3>
          <div className='flex gap-4'>
          <input
            className="rounded-md border-2 px-4 py-1 w-1/2 mb-6 bg-[#eeeeee] placeholder:text-sm "
            required
            type="text"
            id="firstname"
            onChange={changeHandler}
            name="firstname"
            value={userData.fullname.firstname}
            placeholder="First Name"
          />
          <input
            className="rounded-md border-2 px-4 py-1 w-1/2 mb-6 bg-[#eeeeee] placeholder:text-sm "
            required
            type="text"
            id="lastname"
            onChange={changeHandler}
            name="lastname"
            value={userData.fullname.lastname}
            placeholder="Last Name"
          />
          </div>

          <h3 className="text-base font-semibold mb-2"> Enter Your Email</h3>
          <input
            className="rounded-md border-2 px-4 py-1 w-full mb-6 bg-[#eeeeee] placeholder:text-sm "
            required
            type="email"
            id="email"
            onChange={changeHandler}
            name="email"
            value={userData.email}
            placeholder="abc@email.com"
          />

          <h3 className="text-base font-semibold mb-2">Enter Your Password</h3>
          <input
            className="rounded-md border-2 px-4 py-1 w-full mb-6 bg-[#eeeeee] placeholder:text-sm "
            required
            type="password"
            id="password"
            name="password"
            onChange={changeHandler}
            value={userData.password}
            placeholder="Enter Your Password"
          />
          <button className="rounded-md border-2 px-4 py-1 w-full font-semibold mb-1 bg-black text-white ">
            Create Account
          </button>
          <p className="text-center  my-5">Already Have an Account? <Link to='/login' className = " text-blue-600 py-2 font-light">Login Here</Link></p>
        </form>
      </div>
      <div>
        <p className='  text-[10px] leading-tight '><span className='font-semibold underline'>Terms and Conditions : </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla tenetur, quibusdam nihil eius et corrupti molestiae, repellendus porro iure sed esse dolorum reprehenderit.</p>
      </div>
    </div>
  )
}

export default UserSignup