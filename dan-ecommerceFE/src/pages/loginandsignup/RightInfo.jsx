import React from "react";
import trucktrack from "../../assets/images/login/trucktrack.png";
import alertbell from "../../assets/images/login/alertbell.png";
import reviewstar from "../../assets/images/login/reviewstar.png";
import greentick from "../../assets/images/login/greentick.png";

const RightInfo = ({ step }) => (
  <div className="w-full h-[90%]  flex flex-col justify-start gap-[4vw] lg:gap-[1vw]   lg:mt-0">
    <div className="text-[#8F2A0B] font-semibold flex items-center text-[5.3vw] lg:text-[2vw] xl:text-[1.3vw]">
      Advantages of secure login
    </div>

    <InfoItem img={trucktrack} text="Easily track orders, hassle-free returns" />
    <InfoItem img={alertbell} text="Get relevant alerts and recommendations" />
    <InfoItem img={reviewstar} text="Wishlist, reviews, ratings and more" />

    {step === 2 && (
      <div className="pt-[2vw] flex justify-start items-center gap-[1vw] ">
        <div className="h-[8vw] lg:h-[60%] aspect-square">
          <img src={greentick} alt="verified" className="w-full h-full" />
        </div>
        <div className="text-[3.9vw] lg:text-[1.75vw] xl:text-[1vw] leading-tight">
          Safe and secure payments. Easy returns. <br />
          100% authentic products.
        </div>
      </div>
    )}
  </div>
);

const InfoItem = ({ img, text }) => (
  <div className="flex items-center justify-start gap-[3vw] lg:gap-[1vw]">
    <img src={img} className="w-[8%] lg:w-[5.5%] aspect-square" alt="" />
    <div className="text-[3.9vw] lg:text-[1.7vw] xl:text-[1.1vw]">{text}</div>
  </div>
);

export default RightInfo;
