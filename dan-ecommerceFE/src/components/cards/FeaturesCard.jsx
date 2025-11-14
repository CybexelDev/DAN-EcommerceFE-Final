import React from "react";

function FeaturesCard({ image, title, description }) {
  return (
    <div
      className="
        relative bg-black/10 rounded-[3vw] sm:rounded-[2vw] lg:rounded-[1vw] mb-[2%]
        w-full
        aspect-[448/220]
        flex-shrink-0
      "
    >
      {/* 🟢 Top-left Icon Box */}
      <div
        className="
          absolute bg-white 
          w-[15%] aspect-square 
          top-0 left-0 
          rounded-br-[4vw] md:rounded-br-[2vw] lg:rounded-br-[1vw]
          flex justify-center items-center
          before:content-[''] before:absolute before:w-[4vw] md:before:w-[2vw] lg:before:w-[1vw]
          before:h-[4vw] md:before:h-[2vw] lg:before:h-[1vw] before:bg-[radial-gradient(circle_at_bottom_right,transparent_0%,_transparent_75%,_white_76%,_white_100%)]
          before:top-[0vw] before:-right-[4vw] md:before:-right-[2vw] lg:before:-right-[1vw]
          after:content-[''] after:absolute after:w-[4vw] md:after:w-[2vw] lg:after:w-[1vw] 
          after:h-[4vw] md:after:h-[2vw] lg:after:h-[1vw]
           after:bg-[radial-gradient(circle_at_bottom_right,transparent_0%,_transparent_75%,_white_76%,_white_100%)]
          after:-bottom-[4vw] md:after:-bottom-[2vw] lg:after:-bottom-[1vw] after:left-[0vw]
        "
      >
        <div
          className="
            w-[70%] bg-black/15 rounded-full aspect-square flex justify-center items-center
          "
        >
          <img
            className="w-[40%] sm:w-[35%] md:w-[30%] aspect-square"
            src={image}
            alt={title}
          />
        </div>
      </div>

      {/* 🟣 Text Content */}
      <div
        className="
          absolute flex flex-col justify-center
          left-[7%] right-[10%] top-[40%] 
          w-[80%] h-[40%]
        "
      >
        <div className="flex flex-col justify-between h-full">
          <h4
            className="
              font-semibold text-gray-900 
              text-[4vw] sm:text-[2.8vw] md:text-[1.8vw] lg:text-[1.5vw]
            "
          >
            {title}
          </h4>
          <p
            className="
              text-gray-700 leading-snug 
              text-[3.4vw] sm:text-[2.4vw] md:text-[1.6vw] lg:text-[0.95vw]
            "
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FeaturesCard;
