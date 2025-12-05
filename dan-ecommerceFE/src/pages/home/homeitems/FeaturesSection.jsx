import React from "react";
import FeaturesCard from "../../../components/cards/FeaturesCard";
import support from "../../../assets/images/features/support.png";
import fsshipping from "../../../assets/images/features/fsshipping.png";
import pqm from "../../../assets/images/features/pqm.png";

function FeaturesSection() {
  return (
    <div className="w-full mb-[2vw] flex flex-col justify-center">
      {/* Container */}
      <div className="w-full flex flex-col justify-between items-center py-[4vw] ">
        {/* Text Header */}
        <div className="w-full flex flex-col justify-between items-center mb-[2vw] px-[2vw] text-center">
          <h4 className="text-[4.5vw] md:text-[2.7vw] lg:text-[2.2vw] font-semibold">
            Highlight What Makes You Stand Out
          </h4>
          <p className="text-[3.7vw] md:text-[2.2vw] lg:text-[1.19vw] text-gray-700 mt-2">
            Use this section to show off the key features like these.
          </p>
        </div>

        {/* Cards Section */}
        <div
          className=" 
            w-full flex flex-wrap justify-center lg:justify-between items-center 
            gap-[4vw] md:gap-[2vw] lg:gap-[1.5vw]
            
          "
        >
          {/* 1️⃣ Card 1 */}
          <div
            className="
              w-[85%] sm:w-[85%] md:w-[47%] lg:w-[31.3%]
              flex justify-center
            "
          >
            <FeaturesCard
              image={support}
              title="24/7 Support"
              description="Get 24/7 support for all your questions and needs, ensuring help is always available."
            />
          </div>

          {/* 2️⃣ Card 2 */}
          <div
            className="
              w-[85%] sm:w-[70%] md:w-[45%] lg:w-[32%]
              flex justify-center
            "
          >
            <FeaturesCard
              image={fsshipping}
              title="Free & Fast Shipping"
              description="Enjoy reliable, fast delivery on all orders with no hidden charges."
            />
          </div>

          {/* 3️⃣ Card 3 */}
          <div
            className="
              w-[85%] sm:w-[70%] md:w-[45%] lg:w-[30%]
              flex justify-center
              md:col-span-2
            "
          >
            <FeaturesCard
              image={pqm}
              title="Premium Quality Materials"
              description="Our products are crafted from premium materials built to last."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturesSection;
