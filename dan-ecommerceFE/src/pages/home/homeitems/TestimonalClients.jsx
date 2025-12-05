





import React from "react";

function TestimonalClients({ clients }) {
  return (
    <div className="w-full h-[18%]  flex flex-col justify-between">
      <div className="flex justify-center w-[42%] text-[1vw] mx-auto text-black/55">
        <p>Feature client logos to build trust and credibility for your brand:</p>
      </div>
      <div className="w-[42%] aspect-[600/27] mx-auto flex justify-center  items-center gap-[1.8vw] py-[.6vh]">
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
