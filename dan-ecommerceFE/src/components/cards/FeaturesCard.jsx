import React from 'react'


function FeaturesCard({image, title, description}) {
  return (
    <div className="w-[32%] aspect-[448/220 relative bg-[#f2f2f2] rounded-[1vw]">
        <div className="absolute  bg-white w-[15.6%] aspect-square top-0 left-0 rounded-br-[1.5vw]  flex justify-center items-center 
                                before:content-['']  before:absolute before:w-[1.5vw] before:h-[1.5vw] before:z-10 before:bg-[radial-gradient(circle_at_bottom_right,transparent_0%,_transparent_75%,_white_76%,_white_100%)] 
                                before:top-[0vw] before:-right-[1.5vw] before:mask-shape
                                after:content-[''] after:absolute after:w-[1.5vw] after:h-[1.5vw] after:z-10 after:bg-[radial-gradient(circle_at_bottom_right,transparent_0%,_transparent_75%,_white_76%,_white_100%)]
                                 after:-bottom-[1.5vw] after:left-[0vw]">
                          <div className="w-[71.5%] bg-[#f2f2f2] rounded-full aspect-square flex justify-center items-center">
                            <img className="w-[35%] aspect-square "
                          src={image} alt="tr arrow" />
                          </div>
                        </div>
  <div
    id="2"
    className="absolute  flex flex-col justify-center"
    style={{
      width: "79%",      // 79% of parent width
      height: "37%",     // 37% of parent height
      top: "48.5%",      // 48.5% of parent height
      bottom: "14.5%",   // 14.5% of parent height
      left: "7%",        // 7% of parent width
      right: "14%",      // 14% of parent width
    }}
  >
    <div className=" w-full h-full flex flex-col justify-between">
        <div className="w-[full] h-[33.5%] ">
            <h4 className='text-[1.2vw] font-semibold'>{title}</h4>
        </div>
        <div className="w-[full] h-[54.5%] ">
            <p className='text-[1vw]'>{description}</p>
        </div>
    </div>
  </div>
</div>

  ) 
}

export default FeaturesCard