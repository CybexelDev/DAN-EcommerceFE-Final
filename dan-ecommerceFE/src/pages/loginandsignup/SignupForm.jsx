import trucktrack from "../../assets/images/login/trucktrack.png";
import alertbell from "../../assets/images/login/alertbell.png";
import reviewstar from "../../assets/images/login/reviewstar.png";
import greentick from "../../assets/images/login/greentick.png";
import React, { useState } from "react";

const SignupForm = () => {
  const [step, setStep] = useState(1); // 1 = email/phone input, 2 = OTP
  const [value, setValue] = useState(""); // email or phone
  const [otp, setOtp] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState("");
  const [popup, setPopup] = useState(false); // ✅ for success popup

  // handle email/mobile submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEmail(value)) {
      try {
        await fetch("/api/signup-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: value }),
        });
        setStep(2);
        setError("");
      } catch {
        setError("Error sending email OTP.");
      }
    } else if (isMobile(value)) {
      try {
        await fetch("/api/signup-mobile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile: value }),
        });
        setStep(2);
        setError("");
      } catch {
        setError("Error sending mobile OTP.");
      }
    } else {
      setError("Please enter a valid email or mobile number.");
    }
  };

  // handle OTP change
  const handleChange = (e) => {
    const input = e.target.value;
    if (/^\d*$/.test(input)) {
      setOtp(input);
      if (input.length > 6) {
        setError("OTP cannot be more than 6 digits");
      } else {
        setError("");
      }
    } else {
      setError("OTP must contain only numbers");
    }
  };

  // handle OTP submit
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value, otp }),
      });

      const data = await res.json();
      if (data.success) {
        // ✅ Registration + auto login
        setPopup(true); // show popup
        setTimeout(() => {
          setPopup(false);
          // navigate("/dashboard") or home page
        }, 3000);
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch {
      setError("OTP verification failed.");
    }
  };

  return (
    <div>
      {/* ✅ Popup message */}
      {popup && (
        <div className="fixed top-10 right-10 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          🎉 Registration and login successful!
        </div>
      )}

      {step === 1 && (
        <div className="flex justify-between">
          <form
            onSubmit={handleSubmit}
            className="w-[55%] pt-[6%] px-[3%] pb-[1%] flex flex-col justify-start gap-[1vw]"
          >
            {/* Floating Input */}
            <div className="relative mb-6 flex items-center justify-center">
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full h-[4vw] bg-[#E0E0E0] border-gray-400 rounded-[1vw]  
                         outline-none pt-[3vw] pb-[2vw] pl-[1.5vw] text-[1.2vw]"
              />
              <label
                className={`absolute left-4 transition-all duration-200 
                ${isFocused || value
                    ? "text-[1vw] top-[.3vw] pl-[1vw]"
                    : "text-[1vw]  top-1/2 -translate-y-1/2 p-[1vw]"
                  }`}
              >
                Enter Email/mobile number
              </label>
            </div>

            {error && <div className="text-red-500 text-[1vw]">{error}</div>}

            <div className="text-[1vw]">
              By continuing, you agree the terms of use and privacy policy
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-[67%] bg-black text-[1.5vw] text-white p-[.5vw] rounded-[1vw] font-semibold 
                       hover:brightness-110 transition"
            >
              SIGNUP
            </button>
          </form>

          {/* Right Side Info */}
          <SignupRightInfo step={step} />
        </div>
      )}

      {step === 2 && (
        <div className="flex justify-between">
          <form
            onSubmit={handleOtpSubmit}
            className="w-[55%] pt-[6%] px-[3%] pb-[1%] flex flex-col gap-[1vw]"
          >
            {/* User entered email/mobile (read-only) */}
            <input
              type="text"
              value={value}
              readOnly
              className="w-full h-[4vw] bg-gray-200 rounded-[1vw] p-[1vw] text-[1vw]"
            />

            <div className="relative w-full">
              <input
                type="text"
                value={otp}
                onChange={handleChange}
                maxLength={6}
                placeholder="Enter OTP"
                className="w-full h-[4vw] bg-[#E0E0E0] rounded-[1vw] p-[1vw] pr-[6vw] text-[1vw]"
              />
              <button
                type="button"
                onClick={() => handleSubmit(new Event("submit"))}
                className="absolute right-[1vw] top-1/2 -translate-y-1/2 text-blue-500 underline text-[1vw]"
              >
                Resend OTP
              </button>
            </div>

            <div className="text-[1vw]">
              By continuing, you agree the terms of use and privacy policy
            </div>

            {error && <div className="text-red-500 text-[1vw]">{error}</div>}

            {/* Submit OTP */}
            <button
              type="submit"
              className="w-[67%] bg-black text-[1.5vw] text-white p-[.5vw] rounded-[1vw] font-semibold 
                        hover:brightness-110 transition"
            >
            VERIFY
            </button>
          </form>

          {/* Right Side Info */}
          <SignupRightInfo step={step} />
        </div>
      )}
    </div>
  );
};

export default SignupForm;

// ✅ Reusable Right Side Info
const SignupRightInfo = ({step}) => (
  <div className="w-[43%] h-full flex flex-col justify-start gap-[1vw]">
    <div className="w-full aspect-[333/40] text-[#8F2A0B] font-semibold flex items-center text-[1.4vw]">
      Advantages of secure signup
    </div>
    <div className="w-full aspect-[333/40] flex items-center justify-start gap-1">
      <img src={trucktrack} className="w-[5.5%] aspect-square" alt="" />
      <div className="flex items-center text-[1vw]">
        Easily Track orders, Hassle Free returns
      </div>
    </div>
    <div className="w-full aspect-[333/40] flex items-center justify-start gap-1">
      <img src={alertbell} className="w-[5.5%] aspect-square" alt="" />
      <div className="flex items-center text-[1vw]">
        Get relevant alerts and recommendations
      </div>
    </div>
    <div className="w-full aspect-[333/40] flex items-center justify-start gap-1">
      <img src={reviewstar} className="w-[5.5%] aspect-square" alt="" />
      <div className="flex items-center text-[1vw]">
        Wishlist, Reviews, rating and more
      </div>
    </div>
    {step === 2 ? (
        <div className="pt-[2vw] w-full aspect-[300/45] flex justify-between items-center">
      <div className="h-[60%] aspect-square">
        <img src={greentick} alt="" className="w-full h-full" />
      </div>
      <div className="w-[90%] h-full text-[1vw]">
        Safe and secure payments. Easy returns.
        <br />
        100% authentic products
      </div>
    </div>
    ): null}
  </div>
);

// utils
const isEmail = (input) => /\S+@\S+\.\S+/.test(input);
const isMobile = (input) => /^[0-9]{10}$/.test(input);
