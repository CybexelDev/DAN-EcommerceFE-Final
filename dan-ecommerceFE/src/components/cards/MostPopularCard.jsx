import React from "react";
import toprightarrowcircle from "../../assets/images/components/toprightarrowcircle.png";
import aedicon from "../../assets/images/main/aedicon.png"

const MostPopularCard = ({ image, title, offer, price, click }) => {
  return (
    <div
      onClick={click}
      className="
        group
        w-full
        flex flex-col
        overflow-hidden
        bg-white
        cursor-pointer
        transition-transform
        duration-300
        hover:scale-[1.01]
      "
    >
      {/* 🖼️ Image Section */}
      <div className="relative w-full aspect-[10/7.5] rounded-[5%] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="
            w-full h-full object-cover object-center
            transition-transform duration-500
            group-hover:scale-101
          "
        />

        {/* ↗️ Corner Icon */}
        <div
          className="
            absolute bg-white
            w-[15%] aspect-square bottom-0 right-0
            rounded-tl-[1vw]
            flex justify-center items-center
            before:content-['']
            before:absolute before:w-[35%] before:h-[35%]
            before:bg-[radial-gradient(circle_at_top_left,transparent_0%,transparent_75%,white_76%,white_100%)]
            before:-top-[35%] before:-right-0
            after:content-[''] after:absolute after:w-[35%] after:h-[35%]
            after:bg-[radial-gradient(circle_at_top_left,transparent_0%,transparent_75%,white_76%,white_100%)]
            after:bottom-0 after:-left-[35%]
          "
        >
          <img
            className="w-[70%] aspect-square rounded-[10%]"
            src={toprightarrowcircle}
            alt="arrow"
          />
        </div>
      </div>

      {/* 📝 Text Section */}
      <div className="flex flex-col justify-start px-2 py-2">
        <h4
          className="
            text-[clamp(1.1rem,2vw,2.4rem)] lg:text-[clamp(.9rem,1.3vw,1.7rem)]
            font-semibold leading-tight text-gray-800
          "
        >
          {title.length > 30 ? title.slice(0, 30) + "..." : title}
        </h4>
        <h6
          className="
            text-[clamp(.9rem,1.1vw,1.3rem)] lg:text-[clamp(1rem,1.5vw,1.9rem)]
            font-bold 
          "
        >
          {offer}% OFF
        </h6>
        <p
  className="
    text-[clamp(.9rem,1.3vw,1.7rem)] flex items-center
    lg:text-[clamp(.9rem,1.1vw,1.5rem)]
    text-gray-600
  "
>
  <img
    src={aedicon}
    alt="AED"
    className="h-[.77em] w-auto  mr-[0.4em] inline-block align-baseline"
  />
  {Number(price).toFixed(2)}
</p>

      </div>
    </div>
  );
};

export default MostPopularCard;
