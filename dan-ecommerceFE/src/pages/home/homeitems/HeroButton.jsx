import React from "react";
import leftarrow from "../../../assets/images/home/leftarrow.png";
import rightarrow from "../../../assets/images/home/rightarrow.png";

function HeroButton({ onPrev, onNext, disablePrev, disableNext }) {
  return (
    <div className="w-full h-full flex items-center justify-between">
      {/* Prev Button */}
      <button
        className={`w-full h-full flex justify-center items-center hover:scale-105 ${
          disablePrev ? "opacity-40 cursor-not-allowed" : ""
        }`}
        onClick={onPrev}
        disabled={disablePrev}
      >
        <img src={leftarrow} alt="prev" className="h-full" />
      </button>

      {/* Next Button */}
      <button
        className={`w-full h-full flex justify-center items-center hover:scale-105 ${
          disableNext ? "opacity-40 cursor-not-allowed" : ""
        }`}
        onClick={onNext}
        disabled={disableNext}
      >
        <img src={rightarrow} alt="next" className="h-full" />
      </button>
    </div>
  );
}

export default HeroButton;
