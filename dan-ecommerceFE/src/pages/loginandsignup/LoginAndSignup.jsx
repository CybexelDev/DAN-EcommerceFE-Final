import React, { useState } from "react";
import Nav from "../../components/nav/Nav";
import leftarrow from "../../assets/images/login/leftarrow.png";
import LoginForm from "./LoginForm";
import PaymentCard from "../../components/cards/PaymentCard";
import LoginSignupToggleCard from "./LoginSignupToggleCard";
import SignupForm from "./SignupForm";

function LoginAndSignup() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleButton = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="relative w-full aspect-[1440/910]  pr-[5.48%]  pl-[3.62%] pt-[10vw] pb-[10vw] bg-white">
      <Nav />
      <div className="w-full h-full  flex sm:flex-row flex-col justify-between">
        <div className=" sm:w-[63.56%] w-[100%] h-full flex flex-col justify-between ">
          {/* Form Section start */}
          <div
            style={{ boxShadow: "0px 1px 102px 0px rgba(167, 167, 167, 0.25)" }}
            className=" relative w-full  rounded-[1.5vw] pt-[3.3vw] pr-[3%] pl-[3.6%] pb-[3%] bg-[#ffffff] "
          >
            {/* Top sticky section no 1 */}
            <div
              className="absolute top-0 left-0 w-[28%] aspect-[233/51] rounded-br-[1.5vw] bg-[#e0e0e0] flex items-center justify-center
                    before:content-['']  before:absolute before:w-[1.5vw] before:h-[1.5vw] before:z-10 before:bg-[radial-gradient(circle_at_bottom_right,transparent_0%,_transparent_75%,_White_76%,_white_100%)] 
                        before:top-[0vw] before:-right-[1.5vw] before:mask-shape
                        after:content-[''] after:absolute after:w-[1.5vw] after:h-[1.5vw] after:z-10 after:bg-[radial-gradient(circle_at_bottom_right,transparent_0%,_transparent_75%,_white_76%,_white_100%)]
                         after:-bottom-[1.5vw] after:-left-[0vw]
                    "
            >
              <div className="w-[85%] aspect-[198/28]  flex justify-between ">
                <div className="w-[14.14%] aspect-[32/28] bg-[#E0E0E0] text-[1.3vw] flex items-center justify-center font-semibold rounded-[.4vw]">
                  1
                </div>
                <div className="w-[83.83%] h-full text-[1.3vw] font-semibold flex items-center justify-center text-[#F2591A]">
                  LOGIN or SIGNUP
                </div>
              </div>
            </div>
            {/* End of top sticky section */}

            {isLogin ? <LoginForm /> : <SignupForm />}
          </div>
          {/* Form section End */}
          <a
            href="#"
            className=" w-full h-[5.82%] flex px-[2vw] text-[1.7vw] gap-[1vw] items-center"
          >
            <img src={leftarrow} alt="" className="h-full aspect-square" />
            <p>Continue shopping</p>
          </a>
        </div>
        <div className=" sm:w-[33.61%] w-[100%] h-full flex sm:justify-start justify-end sm:mt-0 mt-[3vw] ">
          <div className="w-full h-[85.62%]  rounded-[2vw] ">
            <LoginSignupToggleCard
              isLogin={isLogin}
              toggleButton={toggleButton}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginAndSignup;
