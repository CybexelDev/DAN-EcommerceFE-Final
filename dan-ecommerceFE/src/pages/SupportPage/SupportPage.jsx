import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../home/homeitems/Footer";
import Nav from "../../components/nav/Nav";

const SupportPage = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSent, setIsSent] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSent(true);
        setTimeout(() => setIsSent(false), 3000);
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <>
        <Nav />
            <div className="min-h-screen bg-gradient-to-b from-white via-orange-50/40 to-white flex flex-col items-center pt-20 px-6 sm:px-10 mt-[100px]">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                        How Can We Help You?
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Have a question, issue, or feedback? Our support team is ready to assist you with anything related to your orders, payments, or account.
                    </p>
                </motion.div>

                {/* Contact Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mb-20">
                    {[
                        {
                            icon: <Phone size={36} />,
                            title: "Call Us",
                            text: "+91 98765 43210",
                        },
                        {
                            icon: <Mail size={36} />,
                            title: "Email Us",
                            text: "support@yourstore.com",
                        },
                        {
                            icon: <MapPin size={36} />,
                            title: "Visit Us",
                            text: "123, E-commerce Street, New Delhi",
                        },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05, y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white/60 backdrop-blur-xl shadow-lg border border-orange-100 p-8 rounded-2xl flex flex-col items-center text-center hover:shadow-xl"
                        >
                            <div className="text-orange-500 mb-3">{item.icon}</div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-600">{item.text}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative w-full max-w-3xl bg-white border border-orange-100 shadow-lg rounded-3xl p-10"
                >
                    <AnimatePresence>
                        {isSent && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col justify-center items-center bg-white/90 rounded-3xl z-20"
                            >
                                <CheckCircle size={48} className="text-green-500 mb-3" />
                                <p className="text-lg font-semibold text-gray-700">
                                    Message Sent Successfully!
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                        Send Us a Message
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Your Message
                            </label>
                            <textarea
                                name="message"
                                required
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Type your message here..."
                                rows="5"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none"
                            ></textarea>
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition"
                            >
                                <Send size={18} /> Send Message
                            </button>
                        </div>
                    </form>
                </motion.div>

                {/* Footer Padding */}
                <div className="h-20"></div>
            </div>
            <div className='ml-5 mr-5'>
                <Footer />
            </div>
        </>
    );
};

export default SupportPage;
