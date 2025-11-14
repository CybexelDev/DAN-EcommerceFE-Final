import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";

function AddressCard({
  // id,
  fullName,
  city,
  landmark,
  district,
  pincode,
  phoneNumber,
  area,
  houseNo,
  isSelected,
  onDeliverHere,
  onChange,
  onDelete
}) {
  return (
    <div
      className={`relative  mb-4 w-[100%] bg-white flex flex-col justify-between pb-[10%] md:pb-[7%] lg:pb-[3%] ${
        isSelected ? "aspect-[817/140]" : "aspect-[817/203]"
      }  shadow rounded-[2vw]`}
    >
      <div className="absolute top-0 right-0 w-[25%] md:w-[20%] lg:w-[13.6%] aspect-[111/60] flex items-center justify-end bg-[#f2f2f2] rounded-bl-[1vw]
      before:content-['']  before:absolute before:w-[1vw] before:h-[1vw] before:z-10 before:bg-[radial-gradient(circle_at_bottom_left,transparent_0%,_transparent_70%,#0000000D_71%,#0000000D_100%)] 
                 before:-top-[0vw] before:-left-[1vw] before:mask-shape
                 after:content-[''] after:absolute after:w-[1vw] after:h-[1vw] after:z-10 after:bg-[radial-gradient(circle_at_bottom_left,transparent_0%,_transparent_70%,#0000000D_71%,#0000000D_100%)]
                 after:-bottom-[1vw] after:-right-[0vw]">
        <button
          onClick={isSelected ? onChange : onDelete}
          className="w-[88.28%] h-[56.66%] bg-[#D8D8D8] font-semibold text-[4vw] md:text-[3vw] lg:text-[1.3vw] text-center rounded-full hover:text-red-500 hover:scale-105 transition-all duration-300 ease-in-out"
        >
          { isSelected ? "change" : "Delete" }
        </button>
      </div>

      {/* Header */}
        <div className="w-[65%] lg:w-[60.15%] aspect-[140/21] flex justify-start gap-[3%] items-center ps-[3.5%] ">
                  <div className="w-[7%] aspect-[5/4] bg-[#D8D8D8] rounded-[.5vw] text-[4vw] md:text-[3vw] lg:text-[1.7vw] font-semibold flex items-center justify-center">
                    { isSelected ? <FaShippingFast /> : <MdLocalShipping /> } 
                  </div>
                  <div className="w-[75%] h-[55%] flex gap-[5%] items-center justify-start ">
                    <div className=" text-[4vw] md:text-[3vw] lg:text-[1.1vw]  font-semibold text-[#F2591A]">
                      DELIVERY ADDRESS 
                    </div>
                    <div className="text-[4.5vw] md:text-[3.7vw] lg:text-[1.3vw] pt-[2%]">{ isSelected ? <FiCheckCircle /> : null}</div>
                  </div>
                </div>

      {/* Address */}
      <div className="w-[62.17%] aspect-[508/27] ml-[9.3%] flex items-center justify-between text-[4vw] md:text-[3vw] lg:text-[1.1vw] font-semibold">
        <p>
          {fullName}, {landmark}, {area}, {city}, {district}, {pincode}, hoNo {houseNo}, {phoneNumber}
        </p>
      </div>

      {/* Deliver Here Button */}
      {!isSelected && (
        <button
          onClick={onDeliverHere}
          className=" cursor-pointer w-[35%] md:w-[17%] aspect-[175/47] bg-[#f2591a] ms-[7.5%] mt-3 rounded-[4vw] text-white font-semibold
          text-[4.5vw] md:text-[2.1vw] lg:text-[1.1vw]"
        >
          Deliver here
        </button>
      )}
    </div>
  )
}

export default AddressCard
