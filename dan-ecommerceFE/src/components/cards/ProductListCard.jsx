import React from 'react'
import { CgArrowTopRight } from "react-icons/cg";
import aedicon from "../../assets/images/main/aedicon.png"

function ProductListCard({ id, image, title, price, click, isOpen }) {
  return (
    <a
  onClick={click}
  href="#"
  id={id}
  className={`w-full flex flex-col justify-between rounded-[.7rem] overflow-hidden 
    ${isOpen ? 'aspect-[4/5.5] md:aspect-[4/5.5] ' : 'aspect-[4/5] md:aspect-[4/5.5] '}`}
>

      {/* Image Section */}
      <div className="relative w-full aspect-[4/4.7] bg-[#f4f4f4] flex justify-center rounded-[.7rem] items-center overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/*bottom fixed Top-right arrow icon section */}
        <div className="absolute bottom-0 right-0 w-[15%] aspect-square bg-white flex justify-center items-center rounded-tl-[30%]
          before:content-[''] before:absolute before:w-[30%] before:h-[30%] before:z-10 
          before:bg-[radial-gradient(circle_at_top_left,transparent_0%,transparent_75%,white_76%,white_100%)]
          before:-top-[30%] before:right-0
          after:content-[''] after:absolute after:w-[35%] after:h-[35%] after:z-10
          after:bg-[radial-gradient(circle_at_top_left,transparent_0%,transparent_75%,white_76%,white_100%)]
          after:bottom-0 after:-left-[35%]"
        >
          <div className="bg-[#d8d8d8] w-[70%] aspect-square rounded-full flex justify-center items-center">
            <CgArrowTopRight className="text-[1.4vw]" />
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-col justify-between p-[0.8vw] flex-1">
        <h5 className="text-[2.5vw] md:text-[1.3vw] font-semibold truncate">{title}</h5>
        <p
          className="
            text-[clamp(.9rem,1.3vw,1.7rem)] flex items-center
            lg:text-[clamp(.9rem,1.1vw,1.5rem)]
            text-gray-600
          "
        >
          <img
            src={aedicon}
            alt="AED"
            className="h-[.77em] w-auto  mr-[0.4em] inline-block align-baseline"
          />
          {Number(price).toFixed(2)}
        </p>
      </div>
    </a>
  )
}

export default ProductListCard
