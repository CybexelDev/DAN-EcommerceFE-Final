import React from 'react'
import logintogglecardbg from '../../assets/images/login/logintogglecardbg.png'

function LoginSignupToggleCard({isLogin, toggleButton}) {
  return (
    <div
  className="relative w-full h-full rounded-[1.5vw] shadow bg-cover bg-center"
  style={{ backgroundImage: `url(${logintogglecardbg})` }}
>
  {/* Overlay content */}
  <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-[2vw]">
    <p className="text-[1.5vw] font-medium text-black drop-shadow">
      {isLogin ? "Don't have an account?" : "Already have an account?"}
    </p>
    <button
      className="mt-[1vw] px-[3vw] py-[1vw] text-[1.2vw] bg-black text-white rounded-[1.5vw] font-semibold  shadow hover:scale-110 transition"
      onClick={toggleButton}
    >
      {isLogin ? "SignUp" : "Login"}
    </button>
  </div>
</div>

  )
}

export default LoginSignupToggleCard