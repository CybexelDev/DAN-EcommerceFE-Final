import React, { useState } from "react";
import TestimonialCard from "../homeitems/TestimonalCard";
import TestimonalButton from "./TestimonalButton";
import TestimonalClients from "./TestimonalClients";
import { useEffect } from "react";
import { getBrand, getTestimaonial } from "../../../API/userApi";


function Testimonal() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonals, setTestimonials] = useState([])
  const [brand, setbrand] = useState([])

  console.log(testimonals, "testimonals data >>>>>>>>>");
  

  useEffect(() => {

    if (testimonals.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonals.length - 1 ? 0 : prevIndex + 1
      );

    }, 3000);
    return () => clearInterval(interval);
  }, [testimonals]);

  const handleNext = () => {
    if (currentIndex < testimonals.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const currentTestimonial = testimonals[currentIndex];


  useEffect(()=>{
    getTestimaonial(setTestimonials)
  },[])

useState(()=>{
  getBrand(setbrand)
},[])

  return (
    <div className="w-full relative flex flex-col justify-center aspect-[1440/638] bg-black/20 rounded-[1vw] mb-[2vh]">
      {/* Buttons */}
      <TestimonalButton
        onPrev={handlePrev}
        onNext={handleNext}
        disablePrev={currentIndex === 0}
        disableNext={currentIndex === testimonals.length - 1}
      />

      {/* Testimonial Section */}
      <div className="w-full h-[75%] aspect-[1440/478] flex flex-col justify-between">
        <TestimonialCard
          image={currentTestimonial?.image[0]}
          quote={currentTestimonial?.message}
          rating={currentTestimonial?.starRating}
          name={currentTestimonial?.name}
        />

        {/* Clients Section */}
        <TestimonalClients clients={brand} />
      </div>
    </div>
  );
}

export default Testimonal;
