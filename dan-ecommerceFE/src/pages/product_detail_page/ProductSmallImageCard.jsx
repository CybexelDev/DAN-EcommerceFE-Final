import React from 'react'
import { CgArrowTopRight } from "react-icons/cg";

function ProductSmallImageCard({image, isSelected, onClick}) {
  return (
    <div className={`relative w-[29%] aspect-[108.5/109] cursor-pointer 
                  ${isSelected ? "ring-2 ring-blue-500 rounded-[.4vw]" : ""}`}
      onClick={onClick}>
        <div className=" absolute top-[0vw] right-[0vw] w-[1.3vw] h-[1vw] bg-white  rounded-bl-[.3vw] flex justify-center items-center
        before:content-['']  before:absolute before:w-[.3vw] before:h-[.3vw] before:z-10 before:bg-[radial-gradient(circle_at_bottom_left,transparent_0%,_transparent_75%,_white_76%,_white_100%)] 
                    before:top-[0vw] before:-left-[.3vw] before:mask-shape
                    after:content-[''] after:absolute after:w-[.3vw] after:h-[.3vw] after:z-10 after:bg-[radial-gradient(circle_at_bottom_left,transparent_0%,_transparent_75%,_white_76%,_white_100%)]
                    after:-bottom-[.3vw] after:right-[0vw]">
                      <div className="bg-[#f4f4f4] rounded-full h-[80%] w-[.8vw] flex justify-center items-center ">
                        <CgArrowTopRight className='h-[50%] aspect-square ' />
                      </div>
                    </div>
        <img src={image} alt="" className='w-full h-full object-fit' />
    </div>
  )
}

export default ProductSmallImageCard