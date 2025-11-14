import React, { useState } from "react";
import Nav from "../../components/nav/Nav";
import leftarrow from "../../assets/images/login/leftarrow.png";
import LoginForm from "./LoginForm";
import { FaUser } from "react-icons/fa";
import LoginSignupToggleCard from "./LoginSignupToggleCard";
import SignupForm from "./SignupForm";
import MobileNav from "../../components/nav/MobileNav";

function LoginAndSignup() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleButton = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="relative w-full flex flex-col gap-[0vw]   pr-[5.48%]  pl-[3.62%] pt-[10vw] pb-[10vw]">


      {/* Navbar Section start */}
      <div className="hidden lg:block">
        <Nav />
      </div>
      <div className="block lg:hidden ">
          <MobileNav />
      </div>
      {/* Navbar Section end */}

      {/* Main Section Start */}
      <div className="w-full h-full flex xl:flex-row  flex-col justify-between ">
        <div className=" xl:w-[67%] w-full xl:h-[85%]   flex flex-col xl:justify-between justify-start gap-[7%] ">
          {/* Form Section start */}
          <div
            className=" relative w-full aspect-[832/275]   rounded-[1.5vw] px-[5%] py-[12%] md:py-[5%] lg:py-[3%] bg-[#efefef] shadow-md "
          >
            {/* Top sticky section no 1 */}
            <div
              className="absolute top-0 left-0 w-[50%] md:w-[38%] lg:w-[28%] aspect-[233/51] rounded-br-[.8rem] md:rounded-br-[1.2rem]  bg-white flex items-center justify-center
                    before:content-['']  before:absolute before:w-[1rem] before:h-[1rem] md:before:w-[1.5rem] md:before:h-[1.5rem] before:z-10 before:bg-[radial-gradient(circle_at_bottom_right,transparent_0%,_transparent_75%,_white_76%,_white_100%)] 
                        before:top-[0vw] before:-right-[1rem] md:before:-right-[1.5rem] before:mask-shape
                        after:content-[''] after:absolute after:w-[1rem] md:after:w-[1.5rem] after:h-[1rem] md:after:h-[1.5rem] after:z-10 after:bg-[radial-gradient(circle_at_bottom_right,transparent_0%,_transparent_75%,_white_76%,_white_100%)]
                        after:-bottom-[1rem] md:after:-bottom-[1.5rem] after:-left-[0vw]
                    "
            >
              <div className="w-[85%] aspect-[198/28]  flex justify-between ">
                <div className="w-[14.14%] aspect-[32/28] bg-[#efefef] text-[3.5vw] md:text-[3vw] lg:text-[2vw] xl:text-[1.25vw] flex items-center justify-center font-semibold rounded-[.4vw]">
                  <FaUser />
                </div>
                <div className="w-[83.83%] h-full text-[3.5vw] md:text-[3vw] lg:text-[2vw] xl:text-[1.25vw] font-semibold flex items-center justify-center text-[#F2591A]">
                  LOGIN or SIGNUP
                </div>
              </div>
            </div>
            {/* End of top sticky section */}

            {isLogin ? <LoginForm /> : <SignupForm />}
          </div>
          {/* Form section End */}
        </div>
        <div  className="xl:w-[32%] w-full  flex justify-center xl:justify-end my-[5vw] xl:mt-0">
          <div className=" w-full  xl:min-h-[30vw] rounded-[2vw] ">
            <LoginSignupToggleCard
              isLogin={isLogin}
              toggleButton={toggleButton}
            />
          </div>
        </div>
      </div>
      {/* Main Section end */}

      <a  href="#"
         className=" w-full  h-[5.82%] flex text-[5vw] md:text-[4vw] lg:text-[3vw] xl:text-[1.5vw]  gap-[1vw] items-center"
      >
        <img src={leftarrow} alt="" className="h-[7.5vw] md:h-[5vw] lg:h-[3.5vw] xl:h-[2vw] aspect-square" />
        <p>Continue shopping</p>
      </a>
    </div>
  );
}
export default LoginAndSignup;
