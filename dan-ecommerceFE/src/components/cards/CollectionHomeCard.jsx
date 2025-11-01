import React from 'react'
import toprightarrowcircle from "../../assets/images/components/toprightarrowcircle.png"
function CollectionHomeCard({image, category}) {
  return (
    <div className="w-full h-full bg-[#f2f2f2] rounded-[1vw] relative overflow-hidden cursor-pointer">
        {/* Text behind the image */}
        <h4 className="absolute top-[5%] left-1/2 -translate-x-1/2  z-0 text-center text-[3vw] font-semibold leading-tight ">
            {category}
        </h4>

        {/* Image above text */}
        <img 
            className="w-full h-full object-cover z-10 relative" 
            src={image} 
            alt={category} 
        />
        <div className="absolute  bg-white w-[15.6%] aspect-square bottom-0 right-0 rounded-tl-[1.5vw]  flex justify-center items-center 
                        before:content-['']  before:absolute before:w-[1.5vw] before:h-[1.5vw] before:z-10 before:bg-[radial-gradient(circle_at_top_left,transparent_0%,_transparent_75%,_white_76%,_white_100%)] 
                        before:-top-[1.5vw] before:-right-0 before:mask-shape
                        after:content-[''] after:absolute after:w-[1.5vw] after:h-[1.5vw] after:z-10 after:bg-[radial-gradient(circle_at_top_left,transparent_0%,_transparent_75%,_white_76%,_white_100%)]
                         after:bottom-0 after:-left-[1.5vw]">
                  <img className="w-[71.5%] aspect-square"
                  src={toprightarrowcircle} alt="tr arrow" />
                </div>
    </div>

  )
}

export default CollectionHomeCard