// import React from "react";
// import clientlogo from "../../../assets/images/testimonals/clientlogo.png"; // fallback

// function TestimonalClients({ clients }) {
//   // Duplicate the clients array to create seamless loop
//   const duplicatedClients = [...clients, ...clients];

//   return (
//     <div className="w-full h-[18%] flex flex-col justify-between">
//       <div className="flex justify-center w-[42%] text-[1vw] mx-auto">
//         <p>Feature client logos to build trust and credibility for your brand:</p>
//       </div>
      
//       {/* Carousel Container */}
//       <div className="w-full overflow-hidden">
//         <div className="w-[42%] mx-auto relative">
//           {/* Carousel Track */}
//           <div className="flex gap-[1.8vw] py-[.6vh] animate-scroll">
//             {duplicatedClients.map((client, index) => (
//               <img
//                 key={index}
//                 className="w-[15%] h-full object-contain flex-shrink-0"
//                 src={client?.image[0]}
//                 alt={client?.tittle}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TestimonalClients;





import React from "react";
import clientlogo from "../../../assets/images/testimonals/clientlogo.png"; // fallback

function TestimonalClients({ clients }) {
  return (
    <div className="w-full h-[18%] flex flex-col justify-between">
      <div className="flex justify-center w-[42%] text-[1vw] mx-auto">
        <p>Feature client logos to build trust and credibility for your brand:</p>
      </div>
      <div className="w-[42%] aspect-[600/27] mx-auto flex justify-center items-center gap-[1.8vw] py-[.6vh]">
        {clients.map((client, index) => (
          <img
            key={index}
            className="w-[15%] h-full object-contain"
            src={client?.image[0]}
            alt={client?.tittle}

          />
        ))}
      </div>
    </div>
  );
}

export default TestimonalClients;
