import React from 'react'
import greenarrow from "../../assets/images/about/greenarrow.png"

function AboutPrivateLabelDetails() {
  return (
    <div className='w-full h-full flex flex-col justify-between items-start'>
        <div className="w-full h-[25.5%] flex flex-col justify-between">
            <div className="w-full h-[41%]">
                <h4 className='text-[2vw] font-semibold'>Private Labelling</h4>
            </div>
            <div className="w-full h-[51.3%]">
                <p className='text-[1.2vw]'>We provide private labelling of our many products for your business.
                     Contact us for more information.</p>
            </div>
        </div>
        <div className="w-[69.8%] h-[63.4%] flex flex-col justify-between">
            <div className="w-full  h-[16.5%] flex items-center">
                <h5 className='text-[1.4vw] font-semibold '>Why Choose Us?</h5>
            </div>
            <div className="w-[89.75%] h-[78.7%] flex items-center ps-[8%] shadow-2xl rounded-[1vw]">
                <div className="w-[86.75%] h-[65.93%] flex flex-col justify-between  ">
                    <div className="w-full h-[12%] flex items-center  gap-[.5vw]">
                        <img src={greenarrow} alt="" className='h-[100%] aspect-square' /> 
                        <p className='text-[1.3vw] text-[#949191] font-semibold'>100% authentic products</p> 
                    </div>
                    <div className="w-full h-[12%] flex items-center gap-[.5vw]">
                        <img src={greenarrow} alt="" className='h-[100%] aspect-square' /> 
                        <p className='text-[1.3vw] text-[#949191] font-semibold'>Affordable prices</p> 
                    </div>
                    <div className="w-full h-[12%] flex items-center gap-[.5vw]">
                        <img src={greenarrow} alt="" className='h-[90%] aspect-square' /> 
                        <p className='text-[1.3vw] text-[#949191] font-semibold'>24/7 customer support </p> 
                    </div>
                    <div className="w-full h-[12%] flex items-center gap-[.5vw]">
                        <img src={greenarrow} alt="" className='h-[90%] aspect-square' /> 
                        <p className='text-[1.3vw] text-[#949191] font-semibold'>Hassle-free returns</p> 
                    </div>
                    <div className="w-full h-[12%]  flex items-center gap-[.5vw]">
                        <img src={greenarrow} alt="" className='h-[90%] aspect-square' /> 
                        <p className='text-[1.3vw] text-[#949191] font-semibold'>Nationwide delivery</p> 
                    </div>
                    
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default AboutPrivateLabelDetails