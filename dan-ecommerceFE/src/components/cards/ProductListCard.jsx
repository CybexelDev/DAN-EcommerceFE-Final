import React from 'react'
import { CgArrowTopRight } from "react-icons/cg";

function ProductListCard({id,image,title,price, isOpen, click}) {

  return (
    <a onClick={click}  href="#" id={id} className={` ${ isOpen ? 'w-[31.15%]' :'w-[22.1%]' } h-[29.46%] aspect-[273/335] flex flex-col mt-3`}>
        <div className='relative w-full h-[81.1%] bg-[#f4f4f4] rounded-[1vw] flex justify-center items-center'>
            <img src={image} alt=""
             className='w-[100%] h-full object-center object-cover  rounded-[1vw] overflow-hidden' />

            <div className="absolute bottom-0 right-0 w-[3vw] aspect-square bg-white flex justify-center items-center rounded-tl-[1vw]
            before:content-['']  before:absolute before:w-[1vw] before:h-[1vw] before:z-10 before:bg-[radial-gradient(circle_at_top_left,transparent_0%,_transparent_75%,_white_76%,_white_100%)] 
                    before:-top-[1vw] before:right-[0vw] before:mask-shape
                    after:content-[''] after:absolute after:w-[1vw] after:h-[1vw] after:z-10 after:bg-[radial-gradient(circle_at_top_left,transparent_0%,_transparent_75%,_white_76%,_white_100%)]
                    after:bottom-[0vw] after:-left-[1vw]">
                <div className="bg-[#d8d8d8] w-[75%] aspect-square rounded-full flex justify-center items-center">
                    <CgArrowTopRight className='text-[1.4vw]' />
                </div>
            </div>
        </div>
        <div className='w-full h-[16%] mt-3'>
            <div className="w-full h-[61%] flex items-center">
                <h5 className="text-[1.7vw] font-semibold text-left w-full h-full overflow-hidden">
                    {title}
                </h5>
            </div>
            <div className="w-full h-[39%] flex justify-start  ">
                <p className='text-black/50 text-[1.2vw] font-semibold'>AED {price}</p>
            </div>
        </div>
    </a>
  )
}

export default ProductListCard