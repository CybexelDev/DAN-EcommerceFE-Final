import React from "react"
import selectedmark from "../../assets/images/profileandaddress/selectedmark.png"

function AddressCard({
  id,
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
      className={`relative mb-4 w-[100%] flex flex-col justify-between py-[3.54%] ${
        isSelected ? "aspect-[817/140]" : "aspect-[817/203]"
      } bg-[#ffffff] shadow-xl rounded-[2vw]`}
    >
      {/* Top Sticky Section */}
      <div className="absolute top-[0] right-[0] w-[14.44%] aspect-[118/64] flex justify-end items-center rounded-bl-[2vw] bg-[#0000000D]
        before:content-['']  before:absolute before:w-[2vw] before:h-[2vw] before:z-10 before:bg-[radial-gradient(circle_at_bottom_left,transparent_0%,_transparent_70%,#0000000D_71%,#0000000D_100%)] 
        before:-top-[0vw] before:-left-[2vw] before:mask-shape
        after:content-[''] after:absolute after:w-[2vw] after:h-[2vw] after:z-10 after:bg-[radial-gradient(circle_at_bottom_left,transparent_0%,_transparent_70%,#0000000D_71%,#0000000D_100%)]
        after:-bottom-[2vw] after:-right-[0vw]"
      >
        <button
          onClick={isSelected ? onChange : onDelete}
          className="w-[83%] aspect-[98/34] rounded-[2vw] bg-[#bdbdbd] font-semibold text-[17px] text-[#000] cursor-pointer flex justify-center items-center hover:text-red-800"
        >
          {isSelected ? "Change" : "Delete"}
        </button>
      </div>

      {/* Header */}
      <div className="w-[33.17%] aspect-[217/28] ml-[2.20%] flex justify-between ">
       <div className="w-[14.86%] aspect-[32/28] bg-[#D8D8D8] rounded-[.5vw] text-[1.5vw] font-semibold flex items-center justify-center">
              1
            </div>
        <div className="w-[83%]  text-[#f2591a] flex justify-between items-center">
          <div className="w-[90.66%] h-full flex items-center text-[18px] font-semibold">
             DELIVERY ADDRESS
          </div>
          {isSelected && (
            <img src={selectedmark} className="w-[9.33%] aspect-[1/1]" />
          )}
        </div>
      </div>

      {/* Address */}
      <div className="w-[62.17%] aspect-[508/27] ml-[7.83%] flex items-center justify-between text-[16px] font-semibold">
        <p>
          {fullName}, {landmark}, {area}, {city}, {district}, {pincode}, hoNo {houseNo}, {phoneNumber}
        </p>
      </div>

      {/* Deliver Here Button */}
      {!isSelected && (
        <button
          onClick={onDeliverHere}
          className=" cursor-pointer w-[21.41%] aspect-[175/47] bg-[#f2591a] ml-5 mt-3 rounded-[4vw] text-white text-[18px] font-semibold"
        >
          Deliver here
        </button>
      )}
    </div>
  )
}

export default AddressCard
