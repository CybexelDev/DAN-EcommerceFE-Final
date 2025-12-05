import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  emailLogin,
  mobilLogin,
  verifyEmailLogin,
  verifyMobilLogin,
} from "../../API/userApi";
import RightInfo from "./RightInfo";
import { useNavigate } from "react-router-dom";
// import { login } from "../../redux/app/store";


const LoginForm = () => {
  const [step, setStep] = useState(1);
  const [value, setValue] = useState("");
  const [otp, setOtp] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const isEmail = (input) => /\S+@\S+\.\S+/.test(input);
  const isMobile = (input) => /^\+?[0-9]{10,15}$/.test(input);


  const navigate = useNavigate();


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (isEmail(value)) {
  //       await emailLogin(value);
  //       setStep(2);
  //     } else if (isMobile(value)) {
  //       await mobilLogin(value);
  //       setStep(2);
  //     } else {
  //       setError("Please enter a valid email or mobile number.");
  //     }
  //   } catch {
  //     setError("Error sending OTP. Try again.");
  //   }
  // };

  // const handleOtpSubmit = async (e) => {
  //   e.preventDefault();
  //   if (otp.length !== 6) return setError("OTP must be 6 digits");

  //   try {
  //     const response = isEmail(value)
  //       ? await verifyEmailLogin(value, otp)
  //       : await verifyMobilLogin(value, otp);

  //     dispatch({
  //       type: "SET_USER",
  //       payload: {
  //         username: isEmail(value)
  //           ? response?.user?.email
  //           : response?.user?.phone,
  //         accessToken: response?.token,
  //         userId: response?.user?._id || response?.user?.id,
  //       },
  //     });
  //     navigate("/");
  //   } catch {
  //     setError("OTP verification failed.");
  //   }
  // };

    const handleSubmit = async (e) => {
    e.preventDefault();

    // Check email or phone
    if (isEmail(value)) {
      try {
        // Example API call for email

        const response = await emailLogin(value);
        console.log(response, "email login response >>>>>>");
        setStep(2);
        setError("")
      } catch {
        setError("Error sending email OTP.");
      }
    } else if (isMobile(value)) {
      try {
        // Example API call for mobile
        const response = await mobilLogin(value);
        console.log(response, "mobile login response >>>>>>");
        setStep(2);
        setError("")
      } catch {
        setError("Error sending mobile OTP.");
      }
    } else {
      setError("Please enter a valid email or mobile number.");
    }
  };

  const handleChange = (e) => {
    const input = e.target.value;

    if (/^\d*$/.test(input)) {
      setOtp(input)

      if (input.length > 6) {
        setError("OTP cannot be more than 6 digits");
      } else {
        setError("")
      }
    } else {
      setError("OTP must contain only numbers");
    }
  };


  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setError("Otp must be 6 digits")
    }

    if (isEmail(value)) {
      try {
        const response = await verifyEmailLogin(value, otp);

        console.log(response, "email otp verify response >>>>>>");

        dispatch({
          type: "SET_USER",
          payload: {
            username: response?.user?.email,
            accessToken: response?.token,
            userId: response?.user?._id,
          },
        });

       navigate('/')

      } catch {
        setError("OTP verification failed.");
      }
    } else if (isMobile(value)) {
      try {
        const response = await verifyMobilLogin(value, otp);

        console.log(response, "mobile number otp verify response >>>>>>");

          dispatch({
          type: "SET_USER",
          payload: {
            username: response?.user?.phone,
            accessToken: response?.token,
            userId: response?.user?._id,
          },
        });

        navigate('/')

      } catch {
        setError("OTP verification failed.");
      }
    }

  }

  return (
  <div className="flex flex-col lg:flex-row justify-between items-stretch gap-[2vw]   ">
    {/* Left Form */}
    <form
      onSubmit={step === 1 ? handleSubmit : handleOtpSubmit}
      className="w-full lg:w-[55%] flex flex-col justify-center pt-[6%] px-[%] pb-[3%] gap-[1.5rem] md:gap-[5vw] lg:gap-[2vw]"
    >
       {step === 1 ? (
          <>
            <div className="relative  flex items-center justify-center">
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full h-[15vw] lg:h-[4.5vw] bg-white border-gray-400 rounded-[2vw] lg:rounded-[1vw]
                           outline-none pt-[5vw] lg:pt-[4vw] xl:pt-[2.8vw] pb-[2vw] pl-[4vw] lg:pl-[1.5vw] text-[6vw] md:text-[5vw] lg:text-[2vw] xl:text-[1.7vw]"
              />
              <label
                className={`absolute left-4 transition-all duration-200 text-[#484848]
                  ${
                    isFocused || value
                      ? "text-[2.5vw] lg:text-[1vw] top-[.5vw] pl-[1vw]"
                      : "text-[3.5vw] md:text-[2vwvw] lg:text-[1.3vw] xl:text-[1.1vw] font-semibold top-1/2 -translate-y-1/2 p-[1vw]"
                  }`}
              >
                Enter Email / Mobile number
              </label>
            </div>

            {error && <p className="text-[3.5vw] md:text-[3vw]  lg:text-[1.7vw] xl:text-[1vw] text-[#9E1818]">{error}</p>}

            <p className="text-[3.5vw] md:text-[3vw]  lg:text-[1.7vw] xl:text-[1vw]">
              By continuing, you agree to our Terms of Use & Privacy Policy.
            </p>

            <button
              type="submit"
              className="w-[80%] lg:w-[67%] bg-black text-white text-[3.7vw] md:text-[3vw] lg:text-[1.5vw] xl:text-[1.3vw] py-[2vw] lg:py-[.7vw]
                         rounded-[2vw] lg:rounded-[.7vw] font-semibold hover:brightness-110 transition self-center lg:self-start"
            >
              LOGIN
            </button>
          </>
        ) : (
          <>
            <div className="relative flex items-center justify-center">
              <input
              type="text"
              value={value}
              readOnly
              className="w-full h-[12vw] lg:h-[6vw] xl:h-[5vw] bg-white rounded-[2vw] lg:rounded-[1vw] px-[5vw]  md:px-[3vw] lg:px-[2vw] pt-[3vw] md:pt-[2vw] lg:pt-[2vw] xl:pt-[.7vw]  text-[4vw] md:text-[1.8rem] lg:text-[2.5vw] xl:text-[1.5vw] "
            />
            <label
                className={`absolute left-4 transition-all duration-200 text-[#484848]
                  ${
                    isFocused || value
                      ? "text-[2.5vw] lg:text-[1.5vw] xl:text-[.8vw] top-[.5vw] pl-[1vw]"
                      : "text-[2.5vw] md:text-[2vw] lg:text-[1.3vw] xl:text-[1.1vw] font-semibold top-1/2 -translate-y-1/2 p-[1vw]"
                  }`}
              >
                Enter Email / Mobile number
              </label>
            </div>
            

            <div className="relative w-full">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                maxLength={6}
                className="w-full h-[12vw] lg:h-[6vw] xl:h-[5vw] bg-white rounded-[2vw] lg:rounded-[1vw] px-[5vw]  md:px-[3vw] lg:px-[2vw] pt-[3vw] md:pt-[2vw] lg:pt-[2vw] xl:pt-[.7vw] text-[4vw] md:text-[1.8vw] lg:text-[2.5vw] xl:text-[1.5vw] "
              />
              <label
                className={`absolute left-4 transition-all duration-200 text-[#484848]
                  ${
                    isFocused || value
                      ? "text-[2.5vw] lg:text-[1.5vw] xl:text-[.8vw] top-[.5vw] pl-[1vw]"
                      : "text-[2.5vw] md:text-[2vw] lg:text-[1.3vw] xl:text-[1.1vw] font-semibold top-1/2 -translate-y-1/2 p-[1vw]"
                  }`}
              >
                Enter OTP
              </label>
              <button
                type="button"
                onClick={handleSubmit}
                className="absolute right-[3vw] lg:right-[1vw] top-1/2 -translate-y-1/2 text-[#9E1818] font-semibold text-[3vw] md:text-[2.5vw] lg:text-[2vw] xl:text-[1vw] "
              >
                Resend ?
              </button>
            </div>

            {error && <p className="text-red-500 text-[.9rem]">{error}</p>}

            <button
              type="submit"
              className="w-[80%] lg:w-[67%] bg-black text-white md:text-[3.5vw] lg:text-[1.5vw] py-[3vw] lg:py-[.7vw]
                         rounded-[2vw] lg:rounded-[.7vw] font-semibold hover:brightness-110 transition self-center lg:self-start"
            >
              LOGIN
            </button>
          </>
        )}
      
    </form>

    {/* Right Info */}
    <div className="w-full mt-[5vw] lg:mt-[0vw] lg:w-[45%] flex items-center">
      <RightInfo step={step} />
    </div>
  </div>
);
};

export default LoginForm;
