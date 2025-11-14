import React from 'react'
import privatelabel from "../../assets/images/about/privatelabel.png" 
import { CgArrowTopRight } from "react-icons/cg";

function AboutPrivateLabelCard() {
  return (
    <div className='relative w-full h-full '>

        <div className="absolute w-[14%] h-[14%] bottom-0 right-0 aspect-square bg-white rounded-br-[1vw] rounded-tl-[1vw] flex justify-center items-center
        before:content-['']  before:absolute before:w-[1.5vw] before:h-[1.5vw] before:z-10 before:bg-[radial-gradient(circle_at_top_left,transparent_0%,_transparent_75%,_white_76%,_white_100%)] 
        before:-top-[1.5vw] before:-right-[0vw] before:mask-shape
        after:content-[''] after:absolute after:w-[1.5vw] after:h-[1.5vw] after:z-10 after:bg-[radial-gradient(circle_at_top_left,transparent_0%,_transparent_75%,_white_76%,_white_100%)]
        after:-bottom-[0vw] after:-left-[1.5vw]">
            <a href='#' className="w-[70%] aspect-square bg-[#D8D8D8] rounded-full flex items-center justify-center text-[1.6vw]">
                <CgArrowTopRight />
            </a>
        </div>

        <img src={privatelabel} alt="" 
        className='w-full h-full object-cover rounded-[1vw]' />
    </div>
  )
}

export default AboutPrivateLabelCard