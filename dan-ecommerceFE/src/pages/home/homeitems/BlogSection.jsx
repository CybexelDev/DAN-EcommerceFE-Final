import React, { useEffect, useState } from 'react'
import mblog from "../../../assets/images/blog/mblog.png"
import blogauthor from "../../../assets/images/blog/blogauthor.png"
import bloglistimage from "../../../assets/images/blog/bloglistimage.png"
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

    // Function to close modal
    const closeModal = () => setSelectedBlog(null);

    return (
        <div className='w-full aspect-[1440/1021] flex flex-col justify-between mb-[5vw] relative'>
            {/* Head Section */}
            <div className="w-full h-[6.5%] flex">
                <div className="w-full  flex-col justify-start px-1">
                    <h3 className='text-[1.5vw]'>Explore the blog</h3>
                    <p className='text-[1vw]'>Share insights, boost SEO, and build trust with your audience.</p>
                </div>
                <div className="w-full  flex text-[1.3vw] items-center justify-end px-4">
                    <a href="#">View Posts &rarr;</a>
                </div>
            </div>

            {/* Main Blog Section */}
            {blogs.length > 0 && (
                <div
                    className="w-full h-[49%] flex cursor-pointer"
                    onClick={() => setSelectedBlog(blogs[0])}
                >
                    {/* Blog image section */}
                    <div className="h-full aspect-[688/500] bg-[#f3f3] relative rounded-l-[1.5vw]">
                        <div className="absolute bg-white top-0 left-0 w-[16.5%] aspect-[113/49]  rounded-br-[1.5vw] flex justify-center items-center
                            before:content-['']  before:absolute before:w-[1.5vw] before:h-[1.5vw] before:z-10 before:bg-[radial-gradient(circle_at_bottom_right,transparent_0%,_transparent_75%,_white_76%,_white_100%)] 
                            before:top-[0vw] before:-right-[1.5vw] before:mask-shape
                            after:content-[''] after:absolute after:w-[1.5vw] after:h-[1.5vw] after:z-10 after:bg-[radial-gradient(circle_at_bottom_right,transparent_0%,_transparent_75%,_white_76%,_white_100%)]
                            after:-bottom-[1.5vw] after:left-[0vw]
                        ">
                            <div className="bg-[#d8d8d8] w-[80.5%] aspect-[91/29] rounded-full flex justify-center items-center">
                                <p className='text-[10px]'>{blogs[0]?.category}</p>
                            </div>
                        </div>
                        <img src={blogs[0]?.image[0]} alt="main blog image" className='w-full h-full rounded-l-[1.5vw]' />
                    </div>

                    {/* Blog detail Section */}
                    <div className="h-full aspect-[752/500] bg-[#f2f2f2] relative rounded-r-[1.5vw]">
                        <div className="absolute top-[5%] left-[5%] w-[71%] aspect-[532/164]  flex flex-col justify-between">
                            <div className="w-full h-[59%] ">
                                <h4 className='text-[2.2vw] leading-[3vw] font-semibold'>{blogs[0]?.head}</h4>
                            </div>
                            <div className="w-full h-[29%] ">
                                <p className='text-[1.2vw] leading-[1.5vw] text-gray-700'>{blogs[0]?.tittle.length > 450 ?
                                    blogs[0]?.tittle.slice(0, 450) + "..."
                                    : blogs[0]?.tittle}
                                </p>
                            </div>
                        </div>
                        <div className="absolute bottom-[5%] left-[5%] w-[27%] aspect-[203/45] flex ">
                            <div className="h-full aspect-[42/45] flex justify-items-start items-center">
                                <div className="h-[71%] aspect-square ">
                                    <img src={blogauthor} alt=""
                                        className='w-full h-full rounded-full object-center' />
                                </div>
                            </div>
                            <div className="h-full aspect-[161/45]  flex flex-col">
                                <div className="h-[53.4%] aspect-[161/24] ">
                                    <h5 className='text-[1vw]'>Written by Sarah Miller</h5>
                                </div>
                                <div className="h-[46.6%] aspect-[161/21] ">
                                    <h6 className='text-[.9vw] text-gray-700'>Graphic Designer</h6>
                                </div>
                            </div>
                        </div>
                        <div className="absolute  bg-white w-[11%] aspect-square bottom-0 right-0 rounded-tl-[1.5vw]  flex justify-center items-center 
                            before:content-['']  before:absolute before:w-[1.5vw] before:h-[1.5vw] before:z-10 before:bg-[radial-gradient(circle_at_top_left,transparent_0%,_transparent_75%,_white_76%,_white_100%)] 
                            before:-top-[1.5vw] before:-right-0 before:mask-shape
                            after:content-[''] after:absolute after:w-[1.5vw] after:h-[1.5vw] after:z-10 after:bg-[radial-gradient(circle_at_top_left,transparent_0%,_transparent_75%,_white_76%,_white_100%)]
                            after:bottom-0 after:-left-[1.5vw]">
                            <img className="w-[71.5%] aspect-square"
                                src={toprightarrow} alt="tr arrow" />
                        </div>
                    </div>
                </div>
            )}


            {/* Blog List Starting */}
            <div className="w-full h-[35.5%]  flex gap-4">
              {blogs.slice(1).map((product) => (
                    <BlogListCard
                        key={product._id}
                        title={product?.category}
                        image={product?.image[0]}
                        head={product?.head}
                        description={product?.tittle}
                        onClick={() => setSelectedBlog(product)} // ✅ handle click directly
                    />
                ))}
            </div>

            {/* Modal */}
            {selectedBlog && (
                <div className="fixed inset-0 bg-[#e9e9e9] bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-white rounded-[1vw] p-[2vw] w-[80%] max-h-[80vh] overflow-y-auto relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-[1vw] right-[1vw] text-[1.5vw] font-bold text-gray-600 hover:text-black"
                        >
                            ✕
                        </button>
                        <img src={selectedBlog.image[0]} alt="" className="w-full rounded-[1vw] mb-[1vw]" />
                        <h2 className="text-[2vw] font-semibold mb-[1vw]">{selectedBlog.head}</h2>
                        <p className="text-[1vw] text-gray-700 mb-[1vw]">{selectedBlog.tittle}</p>
                        <p className="text-[0.9vw] text-gray-500 italic">Category: {selectedBlog.category}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default BlogSection
