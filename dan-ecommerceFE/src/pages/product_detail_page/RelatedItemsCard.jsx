import React from 'react'
import { CgArrowTopRight } from "react-icons/cg";

function RelatedItemsCard({ id, image, title, itemLink }) {
  return (
    <a
      href={itemLink}
      id={id}
      className="w-full aspect-[194/176] flex flex-col"
    >
      {/* Image Section */}
      <div className="relative w-full h-[90%] bg-blue-400 rounded-[5%] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-[5%]"
        />

        {/* Corner Arrow */}
        <div
          className="absolute w-[17%] bottom-0 right-0 aspect-square bg-white rounded-tl-[25%] flex justify-center items-center
            before:content-[''] before:absolute before:w-[35%] before:h-[35%] before:z-10 before:bg-[radial-gradient(circle_at_top_left,transparent_0%,transparent_75%,white_76%,white_100%)] 
            before:-top-[35%] before:right-0
            after:content-[''] after:absolute after:w-[35%] after:h-[35%] after:z-10 after:bg-[radial-gradient(circle_at_top_left,transparent_0%,transparent_75%,white_76%,white_100%)]
            after:bottom-0 after:-left-[35%]"
        >
          <div className="bg-[#f4f4f4] rounded-full w-[80%] aspect-square flex items-center justify-center">
            <CgArrowTopRight />
          </div>
        </div>
      </div>

      {/* Title Section */}
      <div className="w-full h-[10%] flex items-center mt-3">
        <h5
          className="text-[1.1rem]  text-black truncate"
          title={title} // shows full title on hover
        >
          {title}
        </h5>
      </div>
    </a>
  );
}

export default RelatedItemsCard;
