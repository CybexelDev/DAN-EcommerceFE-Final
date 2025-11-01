import React from 'react'
import plflower from "../../assets/images/about/plflower.png"

function AboutPrivateLabelling() {
  return (
    <div className='relative flex flex-col justify-start items-center w-full h-full rounded-[1vw] shadow-xl bg-[#FCF2E9] '>
        <div className="w-full h-[22.26%]"></div>
        <div className="w-[58.75%] h-[45.47%] flex flex-col justify-between items-center ">
            <div className="w-full h-[48%] flex flex-col justify-between">
                <div className="w-full h-[55.17%] flex justify-center items-center">
                    <h5 className='font-semibold text-[2.5vw]'>Private Labelling</h5>
                </div>
                <div className="w-full h-[34.48%] flex justify-center items-center">
                    <p className='text-[1.2vw] '>We provide private label and packaging of our many products for your business.</p>
                </div>
            </div>
            <a href="#"  className="w-[51.6%] h-[37%] bg-[#FFFFFF] shadow rounded-[1vw] flex justify-center items-center text-[1.5vw] font-semibold">
                Contact us for private labelling
            </a>
        </div>
        <div className="absolute bottom-[0vw] right-[4.27%] w-[9.48%] h-[31.91%] bg-green-200">
            <img src={plflower} alt="flowerimage"
            className='w-full h-full object-top' />
        </div>
    </div>
  )
}

export default AboutPrivateLabelling