import React, { useState, useEffect, useRef } from "react";
import HeroButton from "./HeroButton";
import HomeNav from "../../../components/nav/HomeNav";
import { getHeader } from "../../../API/userApi";

function Hero() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  // ✅ Fetch header images from backend
  useEffect(() => {
    const fetchHeaderImages = async () => {
      try {
        const res = await getHeader();
        const headerImages = res.data.flatMap((item) => item.webImage);
        setImages(headerImages);
      } catch (error) {
        console.error("Error fetching header:", error);
      }
    };

    fetchHeaderImages();
  }, []);

  // ✅ Auto-slide every 2 seconds
  useEffect(() => {
    if (images.length === 0) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 2 seconds

    // Cleanup interval on unmount or when images change
    return () => clearInterval(intervalRef.current);
  }, [images]);

  // ✅ Manual navigation
  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  // ✅ Bullet click handler
  const handleBulletClick = (index) => {
    setCurrentIndex(index);
    clearInterval(intervalRef.current); // stop auto-slide on manual click
  };

  return (
    <div
      className="parent-div w-full md:h-[92vh] h-[20vh] aspect-[1440/730] relative flex flex-col justify-center items-center rounded-[1.5vw]"
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.8s ease-in-out",
      }}
    >
      <HomeNav />

      {/* 🔘 Bullet Indicators */}
      <div className="absolute bottom-[8%] flex gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleBulletClick(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentIndex
                ? "bg-white scale-125"
                : "bg-gray-400 opacity-60 hover:opacity-100"
            }`}
          ></button>
        ))}
      </div>

      {/* ⬅️➡️ Navigation Buttons */}
      <div className="button absolute bottom-[3.8%] right-[4%] w-[6.5%] h-[5.5%]">
        <HeroButton
          onPrev={handlePrev}
          onNext={handleNext}
          disablePrev={false}
          disableNext={false}
        />
      </div>
    </div>
  );
}

export default Hero;
