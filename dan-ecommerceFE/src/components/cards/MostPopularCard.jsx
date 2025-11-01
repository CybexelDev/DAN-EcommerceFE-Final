import React from "react";
import toprightarrowcircle from "../../assets/images/components/toprightarrowcircle.png"

const MostPopularCard = ({ image, title, offer, price, click }) => {
  return (

    <div onClick={click} className=" w-[31.11%] aspect- rounded-t-[1.5vw] flex flex-col cursor-pointer">
      <div className="w-full aspect-square  rounded-[1.5vw] relative cursor-pointer">
        <img className="w-full aspect-[1/1] rounded-[1.5vw] overflow-hidden object-cover object-center"
          src={image}
          alt={title} />
        <div className="absolute  bg-white w-[15.6%] aspect-square bottom-0 right-0 rounded-tl-[1.5vw]  flex justify-center items-center 
                before:content-['']  before:absolute before:w-[1.5vw] before:h-[1.5vw] before:z-10 before:bg-[radial-gradient(circle_at_top_left,transparent_0%,_transparent_75%,_white_76%,_white_100%)] 
                before:-top-[1.5vw] before:-right-0 before:mask-shape
                after:content-[''] after:absolute after:w-[1.5vw] after:h-[1.5vw] after:z-10 after:bg-[radial-gradient(circle_at_top_left,transparent_0%,_transparent_75%,_white_76%,_white_100%)]
                 after:bottom-0 after:-left-[1.5vw]">
          <img className="w-[71.5%] aspect-square"
            src={toprightarrowcircle} alt="tr arrow" />
        </div>
      </div>
      <div className="  w-full h-[18%]">
        <h4 className=" md:text-[25px] text-[14px]">{title.length > 35 ?
          title.slice(0, 35) + "..."
          : title}
        </h4>
        <h6 className="text-[1vw] font-bold">{offer}% offer</h6>
        <p className="text-[0.9vw]">usd {price}</p>
      </div>
    </div>
  );
};

export default MostPopularCard;
