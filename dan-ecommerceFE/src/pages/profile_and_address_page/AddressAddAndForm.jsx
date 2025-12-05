import React, { useState } from "react";
import AddressForm from "./AddressForm";
import { FaPencilAlt } from "react-icons/fa";

function AddressAddAndForm({ isAddress, onCancel }) {
  const [isOpen, setIsopen] = useState(false);

  const handleClose = () => {
    setIsopen(false);
    if (onCancel) onCancel();
  };

  const handleClick = () => {
    setIsopen((prev) => !prev);
  };

  return (
    <div className="mb-[6vh] lg:mb-[2vh] bg-white  rounded-[1vw]  overflow-hidden  p-[3%] md:p-[1%] shadow-md">
      {isOpen ? (
        <div className="w-full aspect-[824/615]">
          <AddressForm
            mode="create"
            onSubmit={(data) => {
              console.log("Creating new address", data);
            }}
            onCancel={handleClose}
          />
        </div>
      ) : (
        <div
          className="
            w-full 
            h-[32vw] sm:h-[22vw] md:h-[15vw] lg:h-[10vh] 
            flex flex-col md:flex-row justify-between items-center 
            gap-4 md:gap-0 ps-[0%] md:ps-[4%] 
            pb-[7%] md:pb-[0%]
          "
        >
          {/* Left Side */}
          <div
            className="
              flex items-center justify-start 
              w-full md:w-[70%] 
              gap-[3vw] sm:gap-[2vw] md:gap-[1vw]
              
              text-[6vw] md:text-[3vw] lg:text-[1.5vw] 
            "
          >
            <div
              className="
                flex justify-center items-center 
                h-[12vw] sm:h-[8vw] md:h-[4vw] 
                aspect-square 
                rounded-[1vw] 
                text-black " 
            >
              {isAddress ? <FaPencilAlt /> : "+"}
            </div>

            <h4
              className="
                text-orange-500
                font-semibold 
              "
            >
              {isAddress ? "Add Another Address" : "DELIVERY ADDRESS"}
            </h4>
          </div>

          {/* Right Side Button */}
          <button
            onClick={handleClick}
            className="
              w-[60%] sm:w-[40%] md:w-[25%] lg:w-[20%] xl:w-[15%]
              h-[10vw] sm:h-[7vw] md:h-[55%] 
              bg-[#D8D8D8] text-[6vw] md:text-[3vw] lg:text-[1.5vw] 
              font-semibold text-gray-800 
              rounded-full 
              flex justify-center items-center
              transition-all duration-300 ease-in-out 
              hover:text-green-600 hover:scale-105 
              shadow-[0_-3px_10px_rgba(0,0,0,0.1)]
            "
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}

export default AddressAddAndForm;
