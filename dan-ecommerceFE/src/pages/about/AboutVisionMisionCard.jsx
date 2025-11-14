import React from 'react'

function AboutVisionMisionCard({title,color,content}) {
  return (
    <div className='h-full w-full '>
        <div className={`relative w-full h-full flex justify-center items-center pt-[8.3%]   ${color} rounded-[1vw]`}>
            <div className="absolute -top-[0.1vw] -left-[0.1vw] bg-white w-[25%] h-[20.2%] rounded-br-[1vw]   flex items-center justify-center
            before:content-['']  before:absolute before:w-[1.5vw] before:h-[1.5vw] before:z-10 before:bg-[radial-gradient(circle_at_bottom_right,transparent_0%,_transparent_70%,_white_71%,_white_100%)] 
            before:-top-[0.01vw] before:-right-[1.48vw] before:mask-shape
            after:content-[''] after:absolute after:w-[1.5vw] after:h-[1.5vw] after:z-10 after:bg-[radial-gradient(circle_at_bottom_right,transparent_0%,_transparent_70%,_white_71%,_white_100%)]
            after:-bottom-[1.46vw] after:-left-[0vw] ">
                <h5 className='text-[1.3vw] font-semibold'>{title}</h5>
            </div>

            <div className="w-[91.6%] h-[65%] bg-white rounded-[1vw] p-[1vw]">
                <p className='text-[1.4vw]'>{content}</p>
            </div>
            
            
        </div>
        
    </div>
  )
}

export default AboutVisionMisionCard