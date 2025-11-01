import React from 'react'

function AboutFooter() {
    const nc = "#f3e8ff"
  return (
    <div className='w-full aspect-[1440/321] bg-[#d8d8d8] mb-[5vw] relative flex flex-col items-center rounded-[1vw]'>
        {/* Top button Section End */}
        <div className="absolute bg-[#f4eef2]  top-0 left-0 w-[17.5%] aspect-[1312/217]  rounded-br-[1vw] 
          before:content-['']  before:absolute before:w-[1.5vw] before:h-[1.5vw] before:z-10 before:bg-[radial-gradient(circle_at_bottom_right,transparent_0%,_transparent_75%,#f3e8ff_76%,#f3e8ff_100%)] 
                    before:top-[0vw] before:-right-[1.5vw] before:mask-shape
                    after:content-[''] after:absolute after:w-[1.5vw] after:h-[1.5vw] after:z-10 after:bg-[radial-gradient(circle_at_bottom_right,transparent_0%,_transparent_75%,#f4eef2_76%,#f4eef2_100%)]
                    after:-bottom-[1.5vw] after:left-[0vw]
          ">
            <div className="w-[84%] aspect-[215/36]  ms-[9.5%] ">
            <p className='text-[1.45vw]'>Dan Dar Al Nahda Tr.</p></div>
          </div>
          {/* Top button Section end */}
          
        <div className="w-full h-[25%]"></div>
        <div id='3' className=" w-[91.2%] aspect-[215/36]  flex ">
            {/* Left Side Section starting */}
            <div className="w-[80.7%] aspect-[1059/217]  flex flex-col">
                <div className="h-[32.5%] w-[37.8%] ">
                    <h4 className='text-[1.7vw] leading-[2vw] font-semibold'>Join our newsletter and get 20% 
                        off your first purchase with us.</h4>
                </div>
                <div className="h-[11.7%] w-[37.8%] ">
                </div>
                <div className="h-[23.7%] w-[37.8%] bg-white rounded-[1vw] flex justify-center items-center ">
                    <form action="" className='flex w-[98%] h-[85%]  '>
                        <input type="email" placeholder='Your Email Address' 
                        className='text-[1.4vw] w-[74.5%] h-full ps-[1vw]' />
                        <button className='text-[1.4vw] text-white w-[25.5%] h-full rounded-[1vw] bg-[#8345D8]'>Join</button>
                    </form>
                </div>
                <div className="h-[22.3%] w-[37.8%] "></div>
                <div className="h-[9.8%] w-[37.8%] ">
                    <h6 className='text-[1vw] text-black/55'>Copyright <span className='font-semibold text-black'>Daralnahdatrading</span> <span className='text-[.8vw]'>©</span> 2024</h6>
                </div>
            </div>
            {/* Left section End */}
            <div className=""></div>
            {/* Right sec starting */}
            <div className="w-[19.3%] aspect-[253/217] flex justify-end items-center">
                <div className="w-[87.3%] h-[79.3%] flex justify-between">
                    <div className="w-[31%] flex flex-col">
                        <div className="h-[23.25%] ">
                            <h6 className='text-[1.3vw] font-semibold'>Pages</h6>
                        </div>
                        <div className="h-[76.75%]  flex flex-col justify-between  ">
                            <div className="text-[1vw]"><a href="#">Home</a></div>
                            <div className="text-[1vw]"><a href="#">Shop</a></div>
                            <div className="text-[1vw]"><a href="#">Collections</a></div>
                            <div className="text-[1vw]"><a href="#">Blog</a></div>  
                        </div>
                    </div>
                    <div className="w-[54.5%]  flex flex-col">
                        <div className="h-[23.25%] ">
                            <h6 className='text-[1.3vw] font-semibold'>Information</h6>
                        </div>
                        <div className="h-[76.75%]  flex flex-col justify-between">
                            <div className="text-[1vw]"><a href="#">Terms&Conditions</a></div>
                            <div className="text-[1vw]"><a href="#">Privacy policy</a></div>
                            <div className="text-[1vw]"><a href="#">Support</a></div>
                            <div className="text-[1vw]"><a href="#">404</a></div>  
                        </div>
                    </div>
                </div>
            </div>
            {/* Right sec End */}
        </div>
    </div>
  )
}

export default AboutFooter