// 
import React, { useState, useEffect } from "react";
import clientlogo from "../../assets/images/about/clientlogo1.png"
import axios from "axios";

const clients = [
  { id: 1, name: "Client 1", image: clientlogo },
  { id: 2, name: "Client 2", image: clientlogo },
  { id: 3, name: "Client 3", image: "#" },
  { id: 4, name: "Client 4", image: clientlogo },
  { id: 5, name: "Client 5", image: "#" },
  { id: 6, name: "Client 6", image: clientlogo },
  { id: 7, name: "Client 7", image: clientlogo },
];

function AboutSecondCarousel() {
//    const [clients, setClients] = useState([]) // clients data stored

//  useEffect(() => {
//     axios.get("endpoint")// api endpoint
//     .then((res) =>{
//         setClients(res.data);
//     })
//     .catch((err) => {
//         console.error("Error:",err);
//     });
//  }, []);
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 5;

  // Auto slide every 2s
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % clients.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Get 5 items in loop fashion
  const visibleItems = Array.from({ length: visibleCount }, (_, i) => {
    return clients[(startIndex + i) % clients.length];
  });

  return (
    <div className="w-full h-full flex flex-col justify-between items-center">
      <div className="w-[41.66%] h-[26.5%] flex justify-center text-black/55">
        <p className="text-[1vw] font-semibold">
          Feature client logos to build trust and credibility for your brand:
        </p>
      </div>

      {/* Carousel Section */}
      <div className="w-[41.66%] h-[32.53%]  flex justify-between items-center overflow-hidden">
        {visibleItems.map((item) => (
          <div
            key={item.id}
            className="w-[17%]  h-[64%]  rounded-[1vw]  "
          >
            <img src={item.image} alt={item.name} className="w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutSecondCarousel;
