import React, { useState, useEffect } from "react";
import MostPopularCard from "../../../components/cards/MostPopularCard";
import { getpopulearProducts } from "../../../API/userApi";
import { useNavigate } from "react-router-dom";

function MostPopular() {
  const [popularProducts, setPopularProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getpopulearProducts(setPopularProducts);
  }, []);

  return (
    <div className="most-popular flex flex-col  w-full mb-[3vw]">
      {/* 🧭 Header Section */}
      <div className="w-full flex flex-wrap justify-between items-center mb-6 px-1 md:px-0">
        <div className="flex flex-col justify-start  sm:max-w-[70%] md:max-w-[60%]">
          <h3
            className="
              font-semibold text-gray-900
              text-[clamp(1.3rem,1.7vw,2rem)] lg:text-[clamp(1.3rem,1.9vw,2.1rem)]
            "
          >
            Most Popular
          </h3>

          <p
            className="
              text-gray-500  
              text-[clamp(.9rem,1.3vw,1.9rem)] lg:text-[clamp(.9rem,1.3vw,1.9rem)]
            "
          >
            Showcase your most popular products, front and center.
          </p>
        </div>

        <div
          onClick={() => navigate("/collections")}
          className="
           text-black md:text-gray-700 w-full md:w-auto font-medium cursor-pointer hover:text-gray-900
            text-[clamp(1.1rem,1.5vw,2.rem)] lg:text-[clamp(1.1rem,1.5vw,1.9rem)] flex justify-end items-end
            mt-3 sm:mt-0
          "
        >
          <p>View All &rarr;</p>
        </div>
      </div>

      {/* 🛍️ Card Section */}
      <div
        className=" 
          flex gap-5  snap-x snap-mandatory   
          overflow-x-auto scrollbar-hide
          justify-between xl:justify-around
        "
        style={{
          WebkitOverflowScrolling: "touch",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {popularProducts.map((product) => (
          <div
            key={product._id}
            className="
              snap-center flex-shrink-0  my-[1%] 
              w-[75%] sm:w-[60%] md:w-[40%] lg:w-[30%] xl:w-[31%]
              transition-transform duration-300 hover:scale-[1.03]
            "
          >
            <MostPopularCard
              click={() => navigate(`/product/${product._id}`)}
              image={product.images[0]}
              title={product.productName}
              offer={product.discount}
              price={product.rate}
            />
          </div>
        ))}
      </div>

      {/* Hide scrollbar across browsers */}
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
}

export default MostPopular;
