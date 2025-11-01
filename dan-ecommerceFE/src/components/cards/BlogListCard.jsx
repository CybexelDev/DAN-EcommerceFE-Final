import React from 'react'

function BlogListCard({ title, image, description, onClick }) {
    return (
        <div onClick={onClick} className='w-[31.2%] aspect-[448/364] flex flex-col justify-between cursor-pointer '>
            <div className="h-[82.5%] aspect-[448/300]  relative">
                {/* <div className="absolute w-[25%] aspect-[112/49] bg-white rounded-br-[1.5vw]">h</div> */}
                <div className="absolute bg-white top-0 left-0 w-[25%] aspect-[113/49]  rounded-br-[1vw] flex justify-center items-center
                    before:content-['']  before:absolute before:w-[1.5vw] before:h-[1.5vw] before:z-10 before:bg-[radial-gradient(circle_at_bottom_right,transparent_0%,_transparent_75%,_white_76%,_white_100%)] 
                    before:top-[0vw] before:-right-[1.5vw] before:mask-shape
                    after:content-[''] after:absolute after:w-[1.5vw] after:h-[1.5vw] after:z-10 after:bg-[radial-gradient(circle_at_bottom_right,transparent_0%,_transparent_75%,_white_76%,_white_100%)]
                    after:-bottom-[1.5vw] after:left-[0vw]
                ">
                    <div className="bg-[#d8d8d8] w-[87.5%] aspect-[98/29] rounded-full flex justify-center items-center">
                        <p className='text-[10px]'>{title}</p>
                    </div>
                </div>
                <img src={image} alt="bloglistimage"
                    className='w-full h-full rounded-[1.5vw] ' />
            </div>
            <div className="h-[15%] aspect-[448/54] ">
                <p className='text-[13px]'>{description.length > 150 ?
                    description.slice(0, 150) + "..."
                    : description}
                </p>
            </div>
        </div>
    )
}

export default BlogListCard