import React from "react";
import "./testimonialSlider.css";

function TestimonalClients({ clients }) {
  return (
    <div className="w-full h-[18%] flex flex-col justify-between overflow-hidden">
      
      {/* Text */}
      <div className="flex justify-center w-[42%] text-[1vw] mx-auto text-black/55">
        <p>Feature client logos to build trust and credibility for your brand</p>
      </div>

      {/* Slider */}
      <div className="slider-wrapper">
        <div className="slider-track">
          {/* duplicate logos for infinite effect */}
          {[...clients, ...clients].map((client, index) => (
            <div className="slide" key={index}>
              <img
                src={client?.image?.[0]}
                alt={client?.title}
                className="logo-img"
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default TestimonalClients;

