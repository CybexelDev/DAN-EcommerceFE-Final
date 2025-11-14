import React, { useState, useEffect } from "react";
import CollectionHomeCard from "../../../components/cards/CollectionHomeCard";
import { getCategorys } from "../../../API/userApi";
import { useNavigate } from "react-router-dom";

function Collections() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategorys(setData);
  }, []);

  return (
    <div className="w-full flex flex-col justify-center mb-[4vw]">
      {/* 🧭 Header Section */}
      <div className="flex flex-wrap justify-between items-center mb-[6%] md:mb-[4%] ">
        <div className="flex flex-col justify-start">
          <h3 className="text-[clamp(1.3rem,1.5vw,1.7rem)] lg:text-[clamp(1.5rem,1.7vw,1.9rem)] font-semibold">
            Our Collections
          </h3>
          <p className="text-[clamp(.9rem,1.1vw,1.3rem)] lg:text-[clamp(1rem,1.5vw,1.9rem text-gray-500">
            Showcase all of the different collections you have to offer.
          </p>
        </div>

        {/* <div className="text-[clamp(1.3rem,1.7vw,2.3rem)] md:text-gray-700 text-black  hover:text-gray-900 font-medium cursor-pointer ">
          View All &rarr;
        </div> */}
        <div
          onClick={() => navigate("/collections")}
          className="
           text-black md:text-gray-700 w-full md:w-auto font-medium cursor-pointer hover:text-gray-900
            text-[clamp(1.1rem,1.3vw,1.5rem)] lg:text-[clamp(1.1rem,1.5vw,1.9rem)] flex justify-end items-end
            mt-3 sm:mt-0
          "
        >
          <p>View All &rarr;</p>
        </div>
      </div>

      {/* 🛍️ Card Section */}
      <div
        className=" 
          flex gap-6  my-[10%] md:my-[0%]
          overflow-x-auto scrollbar-hide
          snap-x snap-mandatory
          justify-start
          xl:justify-between
          flex-nowrap xl:flex-wrap
        "
      >
        {data.slice(0, 6).map((item, index) => (
          <div
            key={index}
            className="
              snap-center flex-shrink-0
              w-[75%] sm:w-[60%] md:w-[40%] lg:w-[31.5%]
              transition-transform duration-300 hover:scale-[1.03]
            "
          >
            <CollectionHomeCard
              image={item.image[0]}
              category={item.category}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Collections;
