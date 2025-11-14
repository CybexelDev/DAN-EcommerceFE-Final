import React, { useState } from 'react'
import trucktrack from '../../assets/images/login/trucktrack.png'
import alertbell from '../../assets/images/login/alertbell.png'
import reviewstar from '../../assets/images/login/reviewstar.png'
import { useDispatch } from "react-redux";
import { FaUser } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
// import { logout } from '../../redux/app/store'

function ProfileSection() {
  const [isOpen, setIsopen] = useState(false)
  const name = localStorage.getItem("userName");
  const dispatch = useDispatch();

  const handleClick = () => {
    setIsopen((prev) => !prev)
  }


  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("userName");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");

    // Clear redux state
    dispatch({ type: "LOGOUT" });

    // Redirect
    window.location.href = "/";
  };

  return (
    <div className="relative flex flex-col w-full bg-white aspect-[100/15] shadow-xl  rounded-b-[1vw] rounded-tl-[1vw] p-[2vh] lg:p-[2vw] pl-[2.2%] my-[3vw] lg:my-[1.5vw]">
      {/* Change button */}
      <div className="absolute top-0 right-0 w-[25%] md:w-[20%] lg:w-[13.6%] aspect-[111/60] flex items-center justify-end bg-[#0000000D] rounded-bl-[1vw]
      before:content-['']  before:absolute before:w-[1vw] before:h-[1vw] before:z-10 before:bg-[radial-gradient(circle_at_bottom_left,transparent_0%,_transparent_70%,#0000000D_71%,#0000000D_100%)] 
                 before:-top-[0vw] before:-left-[1vw] before:mask-shape
                 after:content-[''] after:absolute after:w-[1vw] after:h-[1vw] after:z-10 after:bg-[radial-gradient(circle_at_bottom_left,transparent_0%,_transparent_70%,#0000000D_71%,#0000000D_100%)]
                 after:-bottom-[1vw] after:-right-[0vw]">
        <button
          onClick={handleClick}
          className="w-[88.28%] h-[56.66%] bg-[#D8D8D8] font-semibold text-[4vw] md:text-[3vw] lg:text-[1.3vw] text-center rounded-full hover:text-red-500 hover:scale-105 transition-all duration-300 ease-in-out"
        >
          { isOpen ? "close" : "change" }
        </button>
      </div>

      {/* Main Row: Left (login + customer) | Right (advantages if open) */}
      <div className="w-full flex flex-col lg:flex-row justify-between gap-[7vw] lg:gap-[0] lg:pr-[10%]">
        {/* Left side */}
        <div className=" lg:w-[50%] flex flex-col gap-[5vw] md:gap-[1.5vw] lg:gap-[.5vw]">
          {/* Login block */}
          <div className="w-[55%] lg:w-[45%] aspect-[140/28] flex justify-between gap-[3%] items-center ">
            <div className="w-[15%] aspect-[5/4] bg-[#D8D8D8] rounded-[.5vw] text-[4vw] md:text-[4vw] lg:text-[1.5vw] font-semibold flex items-center justify-center">
              <FaUser />
            </div>
            <div className="w-[65%] h-[75%] flex gap-[12%] items-center justify-start  ">
              <div className=" text-[5vw] md:text-[4vw] lg:text-[1.3vw]  font-semibold text-[#F2591A]">
                LOGIN 
              </div>
              {/* <img className="w-[23.1%] aspect-square" src={selectedmark} alt="selected" /> */}
              <div className="text-[4.5vw] md:text-[3.7vw] lg:text-[1.3vw] pt-[2%]"><FiCheckCircle /></div>
            </div>
          </div>

          {/* Customer name */}
          <div className="ml-[7%] lg:ml-[15%] w-full flex overflow-hidden justify-start gap-[2vw] ">
            <div className=" text-black text-[5vw] md:text-[4vw] lg:text-[1.3vw]  font-semibold">
              Customer
            </div>
            <div className="max-w-[12vw] text-[1.1vw] font-semibold text-black/55  ">
              <p className='hover:overflow-x-visible text-[5vw] md:text-[4vw] lg:text-[1.3vw]  '>{name}</p>
            </div>
          </div>
          {/* Logout button */}

          {isOpen ? (
            <div className="w-full flex  lg:ml-[15%]  items-center justify-center md:justify-start  mt-[2vw]">
              <button onClick={handleLogout } className='w-[50%] md:w-[50%] lg:w-[60%] aspect-[5/1] bg-black text-white rounded-[4vw] md:rounded-[3vw] font-semibold text-[5vw] md:text-[5vw] lg:text-[1.9vw] xl:text-[1.5vw]
               hover:text-orange-500 hover:scale-105 transition-all duration-300 ease-in-out '>Logout</button>
            </div>
          ) : null}
        </div>

        {/* Right side (only visible when isOpen) */}
        {isOpen && (
          <div className="lg:w-[43%] h-full flex flex-col justify-start gap-[1vw] md:gap-[0] my-[6vw] lg:my-[0vw] pb-[2vw] ">
            <div className="w-full aspect-[333/40] text-[#8F2A0B] font-semibold flex items-center text-[6vw] md:text-[4vw] lg:text-[1.3vw] pb-[2vw] md:pb-[2vw]">
              Advantages of secure signup
            </div>
            <div className="w-full aspect-[333/40] flex items-center justify-start gap-1">
              <img src={trucktrack} className="w-[5.5%] aspect-square" alt="track" />
              <div className="flex items-center text-[4.5vw] md:text-[4vw] lg:text-[1.1vw]">
                Easily Track orders, Hassle Free returns
              </div>
            </div>
            <div className="w-full aspect-[333/40] flex items-center justify-start gap-1">
              <img src={alertbell} className="w-[5.5%] aspect-square" alt="alert" />
              <div className="flex items-center text-[4.5vw] md:text-[4vw] lg:text-[1.1vw]">
                Get relevant alerts and recommendations
              </div>
            </div>
            <div className="w-full aspect-[333/40] flex items-center justify-start gap-1">
              <img src={reviewstar} className="w-[5.5%] aspect-square" alt="review" />
              <div className="flex items-center text-[4.5vw] md:text-[4vw] lg:text-[1.1vw]">
                Wishlist, Reviews, rating and more
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileSection
