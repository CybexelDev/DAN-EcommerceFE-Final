import React, { useEffect, useState } from 'react'
import toprightarrow from "../../../assets/images/components/toprightarrowcircle.png"
import BlogListCard from '../../../components/cards/BlogListCard'
import { getBlogs } from '../../../API/userApi'

function BlogSection() {
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await getBlogs();
                setBlogs(data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        fetchBlogs();
    }, []);

    const closeModal = () => setSelectedBlog(null);

    return (
        <div className='w-full flex flex-col justify-between mb-[3vw] relative '>
            {/* Head Section */}
            <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center mb-[%]">
                <div className="w-full lg:w-1/2 flex-col justify-start ">
                    <h3 className='text-[clamp(1.7rem,2.3vw,2.5rem)] lg:text-[clamp(1.3rem,1.5vw,1.7rem)] font-semibold mb-[.5vw]'>Explore the blog</h3>
                    <p className='text-[clamp(1.1rem,1.5vw,1.9rem)] lg:text-[clamp(.9rem,1.07vw,1.3rem)] text-gray-700'>Share insights, boost SEO, and build trust with your audience.</p>
                </div>
                <div className="w-full lg:w-1/2 text-[clamp(1.3rem,1.5vw,1.9rem)] lg:text-[clamp(1.1rem,1.3vw,1.5rem)] md:text-gray-700 text-black hover:text-gray-900 font-medium cursor-pointer flex items-center justify-end px- mt-3 lg:mt-0">
                    <a href="#">View Posts &rarr;</a>
                </div>
            </div>

            {/* Main Blog Section */}
            {blogs.length > 0 && (
                <div
                    className="w-full lg:aspect-[1440/500] flex flex-col lg:flex-row cursor-pointer shadow my-[7vw] md:my-[3vw]"
                    onClick={() => setSelectedBlog(blogs[0])}
                >
                    {/* Image Section */}
                    <div className="w-full lg:w-[48%] relative rounded-t-[1.5vw] lg:rounded-l-[1.5vw] lg:rounded-tr-none overflow-hidden">
                        <div className="absolute bg-white top-0 left-0 w-[17%] hidden    aspect-[112/49] rounded-br-[1.5vw] md:flex justify-center items-center
                            before:content-[''] before:absolute before:w-[4vw] md:before:w-[2vw] lg:before:w-[1.5vw]
                            before:h-[4vw] md:before:h-[2vw] lg:before:h-[1.5vw] before:bg-[radial-gradient(circle_at_bottom_right,transparent_0%,_transparent_75%,_white_76%,_white_100%)]
                            before:top-[0vw] before:-right-[4vw] md:before:-right-[2vw] lg:before:-right-[1.5vw]
                            after:content-[''] after:absolute after:w-[4vw] md:after:w-[2vw] lg:after:w-[1.5vw] 
                            after:h-[4vw] md:after:h-[2vw] lg:after:h-[1.5vw]
                            after:bg-[radial-gradient(circle_at_bottom_right,transparent_0%,_transparent_75%,_white_76%,_white_100%)]
                            after:-bottom-[4vw] md:after:-bottom-[2vw] lg:after:-bottom-[1.5vw] after:left-[0vw]">
                            <div className="bg-[#d8d8d8] w-[80%] h-[60%]  px-[5%] rounded-full flex justify-center items-center">
                                <p className='text-[clamp(.5rem,.6rem,.7rem)] font-semibold'>{blogs[0]?.category?.slice(0,11)}</p>
                            </div>
                        </div>
                        <img
                            src={blogs[0]?.image[0]}
                            alt="main blog"
                            className='w-full h-full object-cover'
                        />
                    </div>

                    {/* Text Section */}
                    <div className="w-full relative lg:w-[52%] bg-[#F2F2F2]  rounded-b-[1.5vw] lg:rounded-r-[1.5vw] lg:rounded-bl-none p-[3%]   flex flex-col justify-between"
                        >
                        <div className=' mb-[3vw] md:mb-[1vw]'>
                            <h4 className='text-[clamp(1.4rem,2vw,2.2vw)] font-semibold  mb-[1vw]'>{blogs[0]?.head}</h4>
                            <p className='text-[clamp(1rem,1.2vw,1.5vw)] mb-[7vw] text-black/55 font-semibold'>
                                {blogs[0]?.tittle.length > 450 ? blogs[0]?.tittle.slice(0, 450) + "..." : blogs[0]?.tittle}
                            </p>
                        </div>

                        {/* <div className="absolute bg-white/10 backdrop-blur-lg bottom-[7.5%] flex items-center mt-4">
                            <img
                                src={blogauthor}
                                alt="author"
                                className='w-[3vw] h-[3vw] min-w-[35px] min-h-[35px] rounded-full object-center mr-3'
                            />
                            <div>
                                <h5 className='text-[clamp(0.8rem,1vw,1.2vw)] font-semibold '>Written by Sarah Miller</h5>
                                <h6 className='text-[clamp(0.7rem,.9vw,1.1vw)] text-black/55 font-semibold '>Graphic Designer</h6>
                            </div>
                        </div> */}

                        <div className="absolute bg-white w-[11%] aspect-square bottom-0 right-0 rounded-tl-[1.5vw] flex justify-center items-center
                                        before:content-['']
                                        before:absolute before:w-[1.5vw] before:h-[1.5vw]
                                        before:bg-[radial-gradient(circle_at_top_left,transparent_0%,transparent_75%,white_76%,white_100%)]
                                        before:-top-[1.5vw] before:-right-0
                                        after:content-[''] after:absolute after:w-[1.5vw] after:h-[1.5vw]
                                        after:bg-[radial-gradient(circle_at_top_left,transparent_0%,transparent_75%,white_76%,white_100%)]
                                        after:bottom-0 after:-left-[1.5vw]">
                            <img className="w-[70%] aspect-square" src={toprightarrow} alt="arrow" />
                        </div>
                    </div>
                </div>
            )}

            {/* Blog List Section */}
<div className="w-full flex flex-wrap justify-center lg:justify-between gap-y-[vw] gap-x-[5%] lg:gap-x-[2%]">
  {blogs.slice(1).map((blog) => (
    <BlogListCard
      key={blog._id}
      title={blog.category}
      image={blog?.image?.[0]}
      description={blog.head}
      onClick={() => setSelectedBlog(blog)}
    />
  ))}
</div>


            {/* Modal */}
            
            {selectedBlog && (
            <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-sm">
                {/* Click outside to close (optional): */}
                <div
                    onClick={closeModal}
                    className="absolute inset-0 cursor-pointer"
                ></div>

                {/* Modal container */}
                <div
                    className="
                    relative z-10 
                    bg-white 
                    w-full md:w-[90%] lg:w-[80%] xl:w-[70%]
                    h-full lg:h-[90%] 
                    rounded-xl 
                    overflow-y-auto 
                    shadow-[0_8px_40px_rgba(0,0,0,0.5)] 
                    flex flex-col items-center 
                    px-[4vw] py-[2vw]
                    animate-fadeIn
                    "
                >
                    {/* Sticky Close Button */}
                    <button
                    onClick={closeModal}
                    className="
                        sticky top-[1vw] right-0 self-end
                        bg-black text-white/80 
                        hover:text-white 
                        hover:scale-110 
                        transition-all 
                        duration-200 
                        rounded-full 
                        px-5 py-2 
                        text-[clamp(1rem,1.2vw,1.5rem)] 
                        font-semibold
                    "
                    >
                    Close
                    </button>

                    {/* Image */}
                    <img
                    src={selectedBlog.image[0]}
                    alt="blog"
                    className="
                        w-[85%] 
                        h-auto 
                        rounded-lg 
                        mt-4 mb-6 
                        object-cover 
                        shadow-lg
                    "
                    />

                    {/* Heading */}
                    <h2
                    className="
                        text-center 
                        text-black 
                        font-bold 
                        text-[clamp(1.9rem,2.3vw,2.8rem)] 
                        mb-4
                    "
                    >
                    {selectedBlog.head}
                    </h2>

                    {/* Content */}
                    <p
                    className="
                        text-center 
                        text-gray-700 
                        text-[clamp(1.6rem,1.8vw,2rem)] 
                        leading-relaxed 
                        max-w-[90%] 
                        mb-4
                    "
                    >
                    {selectedBlog.tittle}
                    </p>

                    {/* Category */}
                    <p className="text-center text-blue-900 italic text-[clamp(1.5rem,1.7vw,1.9rem)]  mb-6">
                    Category: {selectedBlog.category}
                    </p>
                </div>
            </div>
            )}

            
        </div>
    )
}

export default BlogSection
