import React, { useState } from 'react'
import selectedmark from "../../assets/images/profileandaddress/selectedmark.png"
import trucktrack from '../../assets/images/login/trucktrack.png'
import alertbell from '../../assets/images/login/alertbell.png'
import reviewstar from '../../assets/images/login/reviewstar.png'
import { useDispatch } from "react-redux";
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

    // Clear redux state
    dispatch({ type: "LOGOUT" });

    // Redirect
    window.location.href = "/";
  };

  return (
    <div className="relative flex flex-col w-full bg-white aspect-[100/15]  rounded-b-[1vw] rounded-tl-[1vw] pb-[2vw] pl-[2.2%] pt-[1.5vw]">
      {/* Change button */}
      <div className="absolute top-0 right-0 w-[13.6%] aspect-[111/60] flex items-center justify-end bg-[#0000000D] rounded-bl-[1vw]
      before:content-['']  before:absolute before:w-[1vw] before:h-[1vw] before:z-10 before:bg-[radial-gradient(circle_at_bottom_left,transparent_0%,_transparent_70%,#0000000D_71%,#0000000D_100%)] 
                 before:-top-[0vw] before:-left-[1vw] before:mask-shape
                 after:content-[''] after:absolute after:w-[1vw] after:h-[1vw] after:z-10 after:bg-[radial-gradient(circle_at_bottom_left,transparent_0%,_transparent_70%,#0000000D_71%,#0000000D_100%)]
                 after:-bottom-[1vw] after:-right-[0vw]">
        <button
          onClick={handleClick}
          className="w-[88.28%] h-[56.66%] bg-[#D8D8D8] font-semibold text-[1vw] text-center rounded-full"
        >
          change
        </button>
      </div>

      {/* Main Row: Left (login + customer) | Right (advantages if open) */}
      <div className="w-full flex justify-between pr-[15%]">
        {/* Left side */}
        <div className="flex flex-col gap-[1vw]">
          {/* Login block */}
          <div className="w-[60.15%] aspect-[140/28] flex justify-between items-center ">
            <div className="w-[22.86%] aspect-[32/28] bg-[#D8D8D8] rounded-[.5vw] text-[1.5vw] font-semibold flex items-center justify-center">
              1
            </div>
            <div className="w-[65%] h-[75%] flex items-center">
              <div className="text-[1.4vw] w-full font-semibold text-[#F2591A]">
                LOGIN
              </div>
              <img className="w-[23.1%] aspect-square" src={selectedmark} alt="selected" />
            </div>
          </div>

          {/* Customer name */}
          <div className="ml-[21.4%] w-full flex overflow-hidden justify-start gap-[1vw] ">
            <div className=" text-[1.2vw] font-semibold">
              DAN Customer
            </div>
            <div className="max-w-[12vw] text-[1.1vw] font-semibold text-black/55  ">
              <p className='hover:overflow-x-visible  '>{name}</p>
            </div>
          </div>
          {/* Logout button */}

          {isOpen ? (
            <div className="w-full flex  items-center ms-[5vw] mt-[2vw]">
              <button onClick={handleLogout } className='w-[75%] aspect-[5/1.1] bg-black text-white rounded-[1vw] font-semibold text-[1.1vw]'>Logout</button>
            </div>
          ) : null}
        </div>

        {/* Right side (only visible when isOpen) */}
        {isOpen && (
          <div className="w-[43%] h-full flex flex-col justify-start pb-[2vw]">
            <div className="w-full aspect-[333/40] text-[#8F2A0B] font-semibold flex items-center text-[1.4vw]">
              Advantages of secure signup
            </div>
            <div className="w-full aspect-[333/40] flex items-center justify-start gap-1">
              <img src={trucktrack} className="w-[5.5%] aspect-square" alt="track" />
              <div className="flex items-center text-[1vw]">
                Easily Track orders, Hassle Free returns
              </div>
            </div>
            <div className="w-full aspect-[333/40] flex items-center justify-start gap-1">
              <img src={alertbell} className="w-[5.5%] aspect-square" alt="alert" />
              <div className="flex items-center text-[1vw]">
                Get relevant alerts and recommendations
              </div>
            </div>
            <div className="w-full aspect-[333/40] flex items-center justify-start gap-1">
              <img src={reviewstar} className="w-[5.5%] aspect-square" alt="review" />
              <div className="flex items-center text-[1vw]">
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
