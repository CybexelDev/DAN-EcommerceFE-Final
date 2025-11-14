import React from 'react'
import { useNavigate } from 'react-router-dom'

function Footer() {
    const navigate = useNavigate();
  return (
    <div className='w-full h-full lg:aspect-[1440/321] bg-[#D8D8D8]  my-[4vw] md:mb-[0vw] pb-[7vw] md:pb-[0vw] py-[4vw] md:py-[2vw] lg:py-[3vw] xl:py-[1vw] relative flex flex-col items-center  rounded-[4vw] md:rounded-[1vw]'>
        {/* Top button Section End */}
        <div className="absolute hidden lg:block bg-white  top-0 left-0 w-[17.5%] aspect-[1312/217]  rounded-br-[1vw] 
          before:content-['']  before:absolute before:w-[1.5vw] before:h-[1.5vw] before:z-10 before:bg-[radial-gradient(circle_at_bottom_right,transparent_0%,_transparent_75%,_white_76%,_white_100%)] 
                    before:top-[0vw] before:-right-[1.5vw] before:mask-shape
                    after:content-[''] after:absolute after:w-[1.5vw] after:h-[1.5vw] after:z-10 after:bg-[radial-gradient(circle_at_bottom_right,transparent_0%,_transparent_75%,_white_76%,_white_100%)]
                    after:-bottom-[1.5vw] after:left-[0vw]
          ">
            <div className="w-[84%] aspect-[215/36]  ms-[9.5%] ">
            <p className='text-[1.45vw]'>Dan Dar Al Nahda Tr.</p></div>
        </div>
          {/* Top button Section end */}
          
        <div className="w-full h-full lg:h-[25%]  "></div>



        {/* Main Section Start */}
        <div  className=" w-[91.2%] h-full lg:h-[68%]  lg:mb-[2vw]  ">
            <div className=" w-[100%]   h-[90%]  flex flex-col md:flex-row justify-between">
                <div className="w-[100%] md:w-[42%] lg:w-[33%] h-full lg:h-[90%] lg:aspect-[2/1] py-[5vw] md:p-0 flex flex-col justify-between gap-[5vw] md:gap-[2vw] lg:gap-0 ">
                    <div className="h-[32.5%] w-[100%]    ">
                        <h4 className=' text-[4.5vw] md:text-[2.3vw] lg:text-[1.85vw] font-semibold'>Join our newsletter and get 20% 
                            off your first purchase with us.</h4>
                    </div>
                    
                    <div className="h-[32%] w-[100%]  bg-white rounded-[2.5vw] md:rounded-[1vw]    ">
                        <form action="" className='flex justify-between items-center  w-[100%] h-[95%] shadow   '>
                            <input type="email" placeholder='Your Email Address' 
                            className='text-[4vw]   md:text-[1.3vw]  w-[85%] md:w-[74.5%] h-full p-[3%] flex items-center ' />
                            <button className='text-[4.5vw]   md:text-[1.3vw] text-white w-[25.5%] h-[100%] lg:h-[94%] p-[1.5%] md:p-[2.5%] rounded-[2vw] md:rounded-[1vw] flex items-center justify-center  mx-[.5vw] md:mx-[.2vw] bg-[#8345D8]'>Join</button>
                        </form>
                    </div>
                    
                </div>






                <div className="w-[100%] md:w-[33%] lg:aspect-[2/1] flex justify-end ">
                        <div className=" h-full w-[100%]  flex justify-between">
                            <div className=" w-[50%] md:w-[33%] flex  flex-col   ">
                                <div className="h-[21%] mb-[5%] text-[clamp(1rem,1.3rem,1.5rem)] md:text-[clamp(1.1rem,1.3rem,1.5rem)] ">
                                    <h6 className='font-semibold'>Pages</h6>
                                </div>
                                <div className="h-[76.75%]  flex flex-col justify-between  ">
                                    <div className="text-[clamp(1rem,1.1rem,1.3rem)] md:text-[clamp(.9rem,1.1rem,1.3rem)] lg:text-[clamp(.7rem,.9rem,1.1rem)] xl:text-[clamp(.9rem,1.1rem,1.3rem)] font-semibold text-black/55" onClick={ ()=>navigate('/home')}>Home</div>
                                    <div className="text-[clamp(1rem,1.1rem,1.3rem)] md:text-[clamp(.9rem,1.1rem,1.3rem)] lg:text-[clamp(.7rem,.9rem,1.1rem)] xl:text-[clamp(.9rem,1.1rem,1.3rem)] font-semibold text-black/55" onClick={ ()=> navigate('/collections') }>Shop</div>
                                    <div className="text-[clamp(1rem,1.1rem,1.3rem)] md:text-[clamp(.9rem,1.1rem,1.3rem)] lg:text-[clamp(.7rem,.9rem,1.1rem)] xl:text-[clamp(.9rem,1.1rem,1.3rem)] font-semibold text-black/55" onClick={ ()=> navigate('/collections') }>Collections</div>
                                    <div className="text-[clamp(1rem,1.1rem,1.3rem)] md:text-[clamp(.9rem,1.1rem,1.3rem)] lg:text-[clamp(.7rem,.9rem,1.1rem)] xl:text-[clamp(.9rem,1.1rem,1.3rem)] font-semibold text-black/55" onClick={ ()=> navigate('/blog')} >Blog</div>  
                                </div>
                            </div>
                            <div className="w-[50%] md:w-[55%] flex flex-col ">
                                <div className="h-[21%] mb-[5%] text-[clamp(1rem,1.3rem,1.5rem)] md:text-[clamp(1.1rem,1.3rem,1.5rem)] ">
                                    <h6 className=' font-semibold'>Information</h6>
                                </div>
                                <div className="h-[76.75%]  flex flex-col justify-between">
                                    <div className="text-[clamp(1rem,1.1rem,1.3rem)] md:text-[clamp(.7rem,.9rem,1.1rem)] xl:text-[clamp(.9rem,1.1rem,1.3rem)] font-semibold text-black/55" onClick={ ()=>navigate('/home')}>Terms&Conditions</div>
                                    <div className="text-[clamp(1rem,1.1rem,1.3rem)] md:text-[clamp(.7rem,.9rem,1.1rem)] xl:text-[clamp(.9rem,1.1rem,1.3rem)] font-semibold text-black/55" onClick={ ()=>navigate('/home')}>Privacy policy</div>
                                    <div className="text-[clamp(1rem,1.1rem,1.3rem)] md:text-[clamp(.7rem,.9rem,1.1rem)] xl:text-[clamp(.9rem,1.1rem,1.3rem)] font-semibold text-black/55" onClick={ ()=> navigate('/support')}>Support</div>
                                    <div className="text-[clamp(1rem,1.1rem,1.3rem)] md:text-[clamp(.7rem,.9rem,1.1rem)] xl:text-[clamp(.9rem,1.1rem,1.3rem)] font-semibold  text-black/55 " >404</div>  
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            <div className="w-[100%] h-full lg:h-[10%] flex lg:justify-start justify-center mt-[4vw] md:mt-[2vw] md:my-[1vw]  items-center ">
                <h6 className='text-[3.5vw] font-semibold md:text-[1.5vw] text-black/65'>Copyright <span className='font-semibold text-black'>Daralnahdatrading</span> <span className=''>©</span> 2024</h6>
            </div>
        </div>
        {/* Main Section End */}



        <div className="h-[7%] w-full  ">
                    
        </div>
    </div>
  )
}

export default Footer