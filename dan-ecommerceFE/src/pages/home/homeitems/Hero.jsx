import React, { useState, useEffect, useRef } from "react";
import HeroButton from "./HeroButton";
import HomeNav from "../../../components/nav/HomeNav";
import { getHeader } from "../../../API/userApi";
import MobileNav from "../../../components/nav/MobileNav";

function Hero() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMobileControls, setShowMobileControls] = useState(false);
  const intervalRef = useRef(null);
  const hideControlsTimeoutRef = useRef(null);

  // ✅ Fetch header images
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

  // ✅ Auto-slide every 3 seconds
  useEffect(() => {
    if (images.length === 0) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, [images]);

  // ✅ Manual controls
  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
    showControlsTemporarily();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
    showControlsTemporarily();
  };

  const handleBulletClick = (index) => {
    setCurrentIndex(index);
    clearInterval(intervalRef.current);
    showControlsTemporarily();
  };

  // ✅ Show mobile buttons for 3 seconds when user interacts
  const showControlsTemporarily = () => {
    setShowMobileControls(true);
    clearTimeout(hideControlsTimeoutRef.current);
    hideControlsTimeoutRef.current = setTimeout(() => {
      setShowMobileControls(false);
    }, 3000);
  };

  // ✅ Make controls appear on touch/hover
  useEffect(() => {
    const handleUserInteraction = () => showControlsTemporarily();
    window.addEventListener("touchstart", handleUserInteraction);
    window.addEventListener("mousemove", handleUserInteraction);
    return () => {
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("mousemove", handleUserInteraction);
    };
  }, []);

  return (
    <div
      className="relative w-full xl:h-[45vw] lg:h-[55vw] md:h-[50vw] sm:h-[50vw] h-[55vw] flex flex-col justify-center items-center rounded-[1.5vw] overflow-hidden"
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.8s ease-in-out",
      }}
    >
      {/* 🧭 Navbars */}
      <div className="hidden lg:block">
        <HomeNav />
      </div>
      <div className="block lg:hidden">
        <MobileNav />
      </div>

      {/* 🔘 Bullet Indicators */}
      <div className="absolute bottom-[6%] flex gap-3 z-10">
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

      {/* 🖥️ Large screens: Bottom-right HeroButton */}
      <div className="hidden lg:flex absolute bottom-[3.5%] right-[4%] w-[7%] h-[6%]">
        <HeroButton
          onPrev={handlePrev}
          onNext={handleNext}
          disablePrev={false}
          disableNext={false}
        />
      </div>

      {/* 📱 Small & Medium screens: Side buttons with fade-in/out */}
      <div
        className={`lg:hidden transition-opacity duration-700 ${
          showMobileControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md text-black rounded-full p-3 shadow-md active:scale-90 transition-transform"
        >
          ❮
        </button>
        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md text-black rounded-full p-3 shadow-md active:scale-90 transition-transform"
        >
          ❯
        </button>
      </div>

      {/* 🩶 Optional soft overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 pointer-events-none"></div>
    </div>
  );
}

export default Hero;
