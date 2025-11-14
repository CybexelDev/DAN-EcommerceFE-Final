import React from "react";
import rightarrow from "../../../assets/images/testimonals/arrowright.png";
import leftarrow from "../../../assets/images/testimonals/arrowleft.png";

function TestimonalButton({ onPrev, onNext, disablePrev, disableNext }) {
  return (
    <div
      className="absolute top-[0vw] right-[0vw] bg-white w-[9.3%] aspect-[104/48] flex justify-between p-[.5vw] rounded-bl-[1vw]
          before:content-[''] before:absolute before:w-[1vw] before:h-[1vw] before:z-10 before:bg-[radial-gradient(circle_at_bottom_left,transparent_0%,_transparent_70%,_white_71%,_white_100%)]
          before:top-[0vw] before:-left-[1vw] before:mask-shape
          after:content-[''] after:absolute after:w-[1vw] after:h-[1vw] after:z-10 after:bg-[radial-gradient(circle_at_bottom_left,transparent_0%,_transparent_70%,_white_71%,_white_100%)]
          after:-bottom-[1vw] after:-right-[0vw]"
    >
      <div className="flex justify-between w-full px-[.4vw]">
        <button
          onClick={onPrev}
          disabled={disablePrev}
          className={`h-full aspect-square rounded-full flex items-center justify-center p-1 
            ${disablePrev ? "bg-gray-300 cursor-not-allowed" : "bg-[#D8D8D8] hover:bg-black/20"}`}
        >
          <img src={leftarrow} alt="prev" className="w-[80%]" />
        </button>
        <button
          onClick={onNext}
          disabled={disableNext}
          className={`h-full aspect-square rounded-full flex items-center justify-center p-1 
            ${disableNext ? "bg-gray-300 cursor-not-allowed" : "bg-[#D8D8D8] hover:bg-black/20"}`}
        >
          <img src={rightarrow} alt="next" className="w-[80%]" />
        </button>
      </div>
    </div>
  );
}

export default TestimonalButton;
