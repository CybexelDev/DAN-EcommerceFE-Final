import React, { useEffect, useState } from "react";
import Nav from "../../components/nav/Nav";
import Footer from "../home/homeitems/Footer";
import { getBlogs } from "../../API/userApi";
import MobileNav from "../../components/nav/MobileNav";

const BlogPage = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const closeModal = () => setSelectedBlog(null);

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

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <div className="hidden lg:block">
        <Nav />
      </div>
      <div className="block lg:hidden">
        <MobileNav />
      </div>

      {/* Blog Page Content */}
      <div className="flex flex-col items-center py-10 px-4 sm:px-6 md:px-10 mt-[80px] md:mt-[100px]">
        {/* Header */}
        <div className="text-center mb-10 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500">
            Our Blog
          </h1>
          <p className="text-gray-600 mt-3 text-base sm:text-lg">
            Stay inspired with our latest stories, trends, and expert tips.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-8xl">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              onClick={() => setSelectedBlog(blog)}
              className="bg-white border border-gray-200 rounded-2xl shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              <img
                src={blog.image?.[0]}
                alt={blog.head}
                className="w-full h-48 sm:h-56 md:h-auto object-cover"
              />
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 hover:text-orange-500 transition-colors">
                  {blog.head}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mb-3">
                  {blog?.author} • {blog?.date}
                </p>
                <p className="text-gray-600 text-sm sm:text-base line-clamp-3 flex-grow">
                  {blog?.title}
                </p>
                <button className="mt-4 text-orange-500 font-semibold hover:text-orange-600 text-sm sm:text-base self-start">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Blog Modal — exact same as BlogSection */}
        {selectedBlog && (
          <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-sm">
            {/* Click outside to close */}
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
              <p className="text-center text-blue-900 italic text-[clamp(1.5rem,1.7vw,1.9rem)] mb-6">
                Category: {selectedBlog.category}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-6 md:px-10 mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default BlogPage;
