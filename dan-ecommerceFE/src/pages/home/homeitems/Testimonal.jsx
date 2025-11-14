import React, { useState, useEffect } from "react";
import TestimonialCard from "../homeitems/TestimonalCard";
import TestimonalButton from "./TestimonalButton";
import TestimonalClients from "./TestimonalClients";
import { getBrand, getTestimaonial } from "../../../API/userApi";

function Testimonal() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonals, setTestimonials] = useState([]);
  const [brand, setBrand] = useState([]);

  useEffect(() => {
    getTestimaonial(setTestimonials);
    getBrand(setBrand);
  }, []);

  // Auto-slide for desktop
  useEffect(() => {
    if (testimonals.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonals.length - 1 ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonals]);

  const handleNext = () => {
    if (currentIndex < testimonals.length - 1) setCurrentIndex((p) => p + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((p) => p - 1);
  };

  const currentTestimonial = testimonals[currentIndex];

  return (
    <div
      className="
        w-full relative flex flex-col justify-center 
        bg-[#F2F2F2] rounded-[1vw] mb-[3vh]
        aspect-[1440/638]
        md:aspect-auto md:rounded-[2vw] px-[2%] lg:px-[10%] py-[5%]
      "
    >
      {/* ---------- 🖥️ DESKTOP VIEW ---------- */}
      <div className="hidden md:flex flex-col justify-center w-full h-full">
        <TestimonalButton
          onPrev={handlePrev}
          onNext={handleNext}
          disablePrev={currentIndex === 0}
          disableNext={currentIndex === testimonals.length - 1}
        />

        <div className="w-full h-[65%] aspect-[1440/478] flex flex-col justify-between">
          <TestimonialCard
            image={currentTestimonial?.image?.[0]}
            quote={currentTestimonial?.message}
            rating={currentTestimonial?.starRating}
            name={currentTestimonial?.name}
          />
                      
        </div>
        <div className="H-[25%]">
          <TestimonalClients clients={brand} />
        </div>
      </div>

      {/* ---------- 📱 MOBILE/TABLET VIEW ---------- */}
      <div className="flex md:hidden bg-white flex-col w-full">

        {/* ✅ Container 1 - Testimonial */}
        <div className="bg-black/10 w-full rounded-[4vw] shadow-sm px-4 py-6">
          {/* Split into 2 parts */}
          <div className="flex flex-col justify-between h-full">

            {/* Top Half - Quote */}
            {/* <div className="flex-1 flex items-center justify-center mb-4">
              <p className="text-center text-[4.2vw] font-medium italic text-gray-700 leading-snug px-2">
                “{currentTestimonial?.message}”
              </p>
            </div> */}
            <div
  className="
    flex items-center justify-center mb-4 
    h-[30vw] sm:h-[28vw] md:h-[25vw] 
    overflow-hidden relative
  "
>
  <p
    className="
      text-center text-[4.2vw] font-medium italic text-gray-700 
      leading-snug px-2 line-clamp-4 overflow-hidden
    "
  >
    “{currentTestimonial?.message}”
  </p>
</div>


            {/* Bottom Half - Image + Name + Rating */}
            <div className="relative flex items-center justify-center mt-4">
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`absolute left-0 text-[7vw] font-semibold px-2 ${
                  currentIndex === 0 ? "opacity-30" : "opacity-100"
                }`}
              >
                &lt;
              </button>

              {/* Content */}
              <div className="flex items-center justify-center gap-5">
                {/* Left - Image */}
                <img
                  src={currentTestimonial?.image?.[0]}
                  alt={currentTestimonial?.name}
                  className="w-[18vw] h-[18vw] rounded-full object-cover border-2 border-gray-300"
                />

                {/* Right - Name + Rating */}
                <div className="flex flex-col justify-center items-start">
                  <p className="text-[4vw] font-semibold text-gray-800 mb-1">
                    {currentTestimonial?.name}
                  </p>
                  <div className="flex gap-[0.5vw]">
                    {Array.from({
                      length: currentTestimonial?.starRating || 0,
                    }).map((_, i) => (
                      <span key={i} className="text-yellow-500 text-[4vw]">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                disabled={currentIndex === testimonals.length - 1}
                className={`absolute right-0 text-[7vw] font-semibold px-2 ${
                  currentIndex === testimonals.length - 1
                    ? "opacity-30"
                    : "opacity-100"
                }`}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Space Between Two Containers */}
        <div className="h-[3vh]" />

        {/* ✅ Container 2 - Clients Section */}
        <div className="bg-black/10 w-full rounded-[4vw] shadow-sm px-4 py-6">
          <p className="text-[4vw] text-gray-800 font-semibold mb-3 text-center">
            Our Trusted Partners
          </p>
          <div className="w-full flex justify-between items-center gap-3">
            {brand.slice(0, 4).map((b, i) => (
              <img
                key={i}
                src={b.image?.[0]}
                alt={b.brandName}
                className="w-[18vw] h-auto object-contain opacity-80"
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Testimonal;
