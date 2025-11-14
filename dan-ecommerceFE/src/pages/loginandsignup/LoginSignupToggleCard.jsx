import React from 'react';
import togglecardbg from "../../assets/images/login/logintogglecardbg.png"


function LoginSignupToggleCard({isLogin, toggleButton}) {
  return (
<div
      className="relative w-full min-h-[20vw] xl:min-h-[35vw] rounded-[1.5vw] shadow-xl 
      bg-[#efefef] bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `url(${togglecardbg})`,
      }}
    >



  {/* Overlay content */}
  <div className="absolute inset-0 flex xl:flex-col justify-between xl:justify-center items-center text-center px-[10%] xl:px-[2vw]">
    <p className=" text-[4vw] md:text-[3.3vw] xl:text-[1.5vw] font-medium text-black drop-shadow">
      {isLogin ? "Don't have an account?" : "Already have an account?"}
    </p>
    <button
      className="mt-[1vw] px-[7vw] md:px-[9vw] xl:px-[3vw] py-[1vw] text-[4vw] xl:text-[1.3vw] bg-black text-white rounded-[1.5vw] font-semibold  shadow hover:scale-110 transition"
      onClick={toggleButton}
    >
      {isLogin ? "SignUp" : "Login"}
    </button>
  </div>
</div>
        
  )
}

export default LoginSignupToggleCard