// import React from 'react'
import clientlogo from '../../assets/images/about/clientlogo1.png';
import React, { useEffect, useState } from "react";
import axios from 'axios';
// Example static list (later you can replace with API response)
const clientData = [
  { id: 1, image: clientlogo, name: "Client 1" },
  { id: 2, image: "#", name: "Client 2" },
  { id: 3, image: clientlogo, name: "Client 3" },
  { id: 4, image: clientlogo, name: "Client 4" },
  { id: 5, image: clientlogo, name: "Client 5" },
  { id: 6, image: "#", name: "Client 6" },
  { id: 7, image: clientlogo, name: "Client 4" },
  { id: 8, image: clientlogo, name: "Client 5" },
  { id: 9, image: "#", name: "Client 9" },
];

function AboutClientCarousel() {
    // const [clientData, setClientData] = useState([]);

    // useEffect(() => {
    // // Fetch from backend
    //  axios.get("http://localhost:8000/api/clients/") //  replace with your backend URL
    //   .then((res) => {
    //        setClientData(res.data)})
    //   .cath((err) => {
    //     console.error("Error",err)
    //   })
    // }, []);

  const visibleCount = 5; // number of cards at once
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % clientData.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Get visible items (wrap around using modulo)
  const getVisibleItems = () => {
    return Array.from({ length: visibleCount }, (_, i) => {
      const realIndex = (currentIndex + i) % clientData.length;
      return clientData[realIndex];
    });
  };

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* Title */}
      <div className="w-full h-[16.84%] flex justify-center items-center ">
        <h5 className="text-[2.5vw] font-semibold">Our Brands</h5>
      </div>

      {/* Carousel */}
      <div className="w-full h-[73.33%] flex items-center justify-center ">
        <div className="w-[94.46%] h-[64.11%] flex items-center justify-around  rounded-[1vw]">
          {getVisibleItems().map((item, i) => (
            <div
              key={i}
              className={`${
                            i === 2 ? "w-[17.3%] h-[71.64%]"
        : i === 1 || i === 3
        ? "w-[16.6%] h-[67.16%]"
        : "w-[15.9%] h-[62.68%]"
                        }  shadow-2xl bg-white z-10 rounded-[1vw] flex items-center justify-center`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="p-[.5vw] w-full h-full object-contain object-center"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutClientCarousel;


// function AboutClientCarousel() {
//   return (
//     <div className='w-full h-full flex flex-col justify-between'>
//         <div className="w-full h-[16.84%] bg-rose-300 flex justify-center">
//                           <h5 className='text-[2.5vw] font-semibold'>Our Brands</h5>
//                         </div>
//         <div className="w-full h-[73.33%] bg-rose-300 flex items-center justify-center">
//             <div className="w-[94.46%] h-[64.11%] bg-black/20 flex items-center justify-around">
//                 <div className="w-[15.9%] h-[62.68%] bg-amber-300 shadow-2xl rounded-[1vw]">
//                     <img src={clientlogo} alt=""
//                         className='p-[.5vw] w-full h-full object-contain object-center ' />
//                 </div>
//                 <div className="w-[16.6%] h-[67.16%] bg-amber-300 shadow-2xl rounded-[1vw]">
//                     <img src={clientlogo} alt=""
//                         className='p-[.5vw] w-full h-full object-contain object-center ' />
//                 </div>
//                 <div className="w-[17.3%] h-[71.64%] bg-amber-300 shadow-2xl rounded-[1vw]">
//                   <img src={clientlogo} alt=""
//                       className='p-[.5vw] w-full h-full object-contain object-center ' />
//                 </div>
//                 <div className="w-[16.6%] h-[67.16%] bg-amber-300 shadow-2xl rounded-[1vw]">
//                   <img src={clientlogo} alt=""
//                       className='p-[.5vw] w-full h-full object-contain object-center ' />
//                 </div>
//                 <div className="w-[15.9%] h-[62.68%] bg-amber-300 shadow-2xl rounded-[1vw]">
//                   <img src={clientlogo} alt=""
//                       className='p-[.5vw] w-full h-full object-contain object-center ' />
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default AboutClientCarousel