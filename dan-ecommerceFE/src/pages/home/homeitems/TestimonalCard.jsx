import React from "react";
// import star from "../../../assets/images/testimonals/star.png";
import star from "../../../assets/images/testimonals/goldstar.png";

function TestimonialCard({ image, quote, rating, name }) {
  const renderStars = (rating) => {
    const starsArray = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      starsArray.push(<img key={`full-${i}`} className="h-full aspect-square" src={star} alt="star" />);
    }

    if (hasHalf) {
      starsArray.push(
        <div
          key="half"
          className="h-full aspect-square relative"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        >
          <img className="h-full w-full object-cover" src={star} alt="half star" />
        </div>
      );
    }

    return starsArray;
  };

  return (
    <div className="w-full h-[80%] flex flex-col justify-between items-between ">
      <div className="w-full h-[73%] flex flex-col justify-between">
        <div className="h-[42%] w-full flex justify-center">
          <div className="h-full aspect-square rounded-full">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
        <div className="w-full h-[48%] text-center px-[10%]">
          <p className="text-[clamp(1.1rem,1.3vw,1.5rem)] lg:text-[clamp(2.1rem,2.3vw,2.5rem)] font-semibold">{quote}</p>
        </div>
      </div>
      <div className="w-full h-[18%] lg:mt-[40px] flex flex-col justify-between ">
        <div className="h-[33%] text-center  flex justify-center gap-[.3vw]">
          {renderStars(rating)}
        </div>
        <div className="h-[59%] text-center flex justify-center items-center mt-[.7vw] ">
          <h4 className="text-[clamp(1.1rem,1.3vw,1.5rem)] lg:text-[clamp(.9rem,1.1vw,1.3rem)] text-black/55">{name}</h4>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
