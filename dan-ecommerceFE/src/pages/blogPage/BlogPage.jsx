import React, { useEffect, useState } from 'react'
import Nav from '../../components/nav/Nav'
import Footer from '../home/homeitems/Footer'
import { getBlogs } from '../../API/userApi';


const blogs = [
    {
        id: 1,
        title: "The Art of Crafting Fine Jewelry",
        author: "By Design Studio",
        date: "September 25, 2025",
        image:
            "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80",
        content:
            "Discover the timeless elegance behind handcrafted jewelry. Every gemstone and metal piece is carefully chosen to reflect beauty, precision, and individuality. Explore how artisans blend tradition with innovation to create jewelry that tells your story.",
    },
    {
        id: 2,
        title: "How to Care for Your Jewelry",
        author: "By Gem Experts",
        date: "October 2, 2025",
        image:
            "https://images.unsplash.com/photo-1616469829581-2be7f1a7b3bb?auto=format&fit=crop&w=900&q=80",
        content:
            "Taking care of your jewelry ensures it remains radiant and long-lasting. Learn the best ways to clean, store, and maintain your favorite gold, silver, and diamond pieces to preserve their shine for years.",
    },
    {
        id: 3,
        title: "Top Jewelry Trends for 2025",
        author: "By Trend Watch",
        date: "October 5, 2025",
        image:
            "https://images.unsplash.com/photo-1603052875873-7d9b3cfe4a26?auto=format&fit=crop&w=900&q=80",
        content:
            "From layered necklaces to gemstone rings, explore the latest trends that are dominating the jewelry world this year. See how contemporary design meets traditional beauty in 2025’s fashion-forward collections.",
    },
];






const BlogPage = () => {
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [blogs, setBlogs] = useState([]);

    console.log(blogs, "blog data>>>>>>>>>>>>");
    

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
        <div>
            <Nav />

            <div className="min-h-screen bg-white text-black flex flex-col items-center py-10 px-4 md:px-10 mt-[100px]">
                {/* Page Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-orange-500">Our Blog</h1>
                    <p className="text-gray-600 mt-2 text-lg">
                        Stay inspired with our latest stories, trends, and expert tips.
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
                    {blogs.map((blog) => (
                        <div
                            key={blog._id}
                            onClick={() => setSelectedBlog(blog)}
                            className="bg-white border border-gray-200 rounded-2xl shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                            <img
                                src={blog.image[0]}
                                alt={blog.head}
                                className="w-full h-52 object-cover"
                            />
                            <div className="p-5">
                                <h3 className="text-xl font-semibold mb-2 hover:text-orange-500 transition">
                                    {blog.head}
                                </h3>
                                <p className="text-sm text-gray-500 mb-3">
                                    {blog?.author} • {blog?.date}
                                </p>
                                <p className="text-gray-600 line-clamp-3">{blog?.title}</p>
                                <button className="mt-4 text-orange-500 font-semibold hover:text-orange-600">
                                    Read More →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Popup Modal */}
                {selectedBlog && (
                    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-4">
                        <div className="bg-white max-w-3xl w-full rounded-2xl overflow-hidden shadow-xl relative animate-fadeIn">
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedBlog(null)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-orange-500 text-2xl"
                            >
                                ✕
                            </button>

                            <img
                                src={selectedBlog.image[0]}
                                alt={selectedBlog.head}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-6">
                                <h2 className="text-2xl md:text-3xl font-bold text-orange-500 mb-2">
                                    {selectedBlog.head}
                                </h2>
                                <p className="text-sm text-gray-500 mb-4">
                                    {selectedBlog?.author} • {selectedBlog?.date}
                                </p>
                                <p className="text-gray-700 text-base leading-relaxed">
                                    {selectedBlog.tittle}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className='ml-5 mr-5'>
                <Footer />
            </div>
        </div>
    )
}

export default BlogPage