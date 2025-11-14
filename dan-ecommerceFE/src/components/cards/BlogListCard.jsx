import React from 'react'

function BlogListCard({ title, image, description, onClick }) {
    return (
        <div
            onClick={onClick}
            className="w-full md:w-[47.5%] lg:w-[31.2%] aspect-[448/364] flex flex-col justify-between cursor-pointer"
        >
            {/* Image section */}
            <div className="h-[82.5%] relative overflow-hidden rounded-[1.5vw]">
                
                {/* Category ribbon (visible only on xl) */}
                <div className="hidden xl:block">
                    <div className="absolute bg-white top-0 left-0 z-30 w-[25%] aspect-[113/49] rounded-br-[1vw] flex justify-center items-center
                        before:content-[''] before:absolute before:w-[1.5vw] before:h-[1.5vw] before:z-10 before:bg-[radial-gradient(circle_at_bottom_right,transparent_0%,_transparent_75%,_white_76%,_white_100%)] 
                        before:top-[0vw] before:-right-[1.5vw]
                        after:content-[''] after:absolute after:w-[1.5vw] after:h-[1.5vw] after:z-10 after:bg-[radial-gradient(circle_at_bottom_right,transparent_0%,_transparent_75%,_white_76%,_white_100%)]
                        after:-bottom-[1.5vw] after:left-[0vw]
                    ">
                        <div className="bg-[#d8d8d8] w-[87.5%] aspect-[98/29] rounded-full flex justify-center items-center">
                            <p className="text-[10px]">{title.slice(0, 15)}</p>
                        </div>
                    </div>
                </div>

                {/* Image */}
                <img
                    src={image}
                    alt="bloglistimage"
                    className="w-full h-full object-cover rounded-[1.5vw] transition-transform duration-300 hover:scale-102"
                />

                {/* Overlay for below lg screens */}
                <div
                    className="lg:hidden absolute bottom-0 w-full h-[50%] md:h-[70%] bg-gradient-to-t from-black/70 via-black/40 to-transparent 
                    flex flex-col justify-end p-[4%] text-white"
                >
                    <h3 className="text-[clamp(1.7rem,1.9vw,2.1rem)] font-semibold">
                        {title}
                    </h3>
                    <p className="text-[clamp(1rem,1.1vw,1.2rem)] md:text-[clamp(.9rem,1vw,1.1rem)] opacity-90 mt-[.3rem] line-clamp-2">
                        {description.length > 90 ? description.slice(0, 90) + "..." : description}
                    </p>
                </div>
            </div>

            {/* Text (hidden below lg) */}
            <div className="hidden lg:block h-[15%] font-semibold">
                <p className="text-[clamp(.9rem,1.1rem,1.3rem)]">
                    {description.length > 90 ? description.slice(0, 90) + "..." : description}
                </p>
            </div>
        </div>
    )
}

export default BlogListCard
