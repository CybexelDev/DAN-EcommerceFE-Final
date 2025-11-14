// import React from 'react';
import { FaHome, FaShoppingBag, FaUser, FaBox, FaShoppingCart } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

function MobileNav() {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to check active page
  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex justify-around items-center w-[90vw] max-w-[400px] bg-black/20 backdrop-blur-lg rounded-full shadow-xl py-3 px-4 border border-white/30">
        
        {/* Home */}
        <button
          onClick={() => navigate('/')}
          className={`flex flex-col items-center text-[1.3rem] transition-all ${
            isActive('/') ? 'text-black scale-110' : 'text-gray-700'
          }`}
        >
          <FaHome />
          {/* <span className="text-[0.7rem] mt-1">Home</span> */}
        </button>

        {/* Shop */}
        <button
          onClick={() => navigate('/collections')}
          className={`flex flex-col items-center text-[1.3rem] transition-all ${
            isActive('/collections') ? 'text-black scale-110' : 'text-gray-700'
          }`}
        >
          <FaShoppingBag />
          {/* <span className="text-[0.7rem] mt-1">Shop</span> */}
        </button>

        
        {/* Profile */}
        <button
          onClick={() => navigate('/address')}
          className={`flex flex-col items-center text-[1.3rem] transition-all ${
            isActive('/address') ? 'text-black scale-110' : 'text-gray-700'
          }`}
        >
          <FaUser />
          {/* <span className="text-[0.7rem] mt-1">Profile</span> */}
        </button>


        {/* Blog */}
        <button
          onClick={() => navigate('/orders')}
          className={`flex flex-col items-center text-[1.3rem] transition-all ${
            isActive('/orders') ? 'text-black scale-110' : 'text-gray-700'
          }`}
        >
          <FaBox />
          {/* <span className="text-[0.7rem] mt-1">Blog</span> */}
        </button>

        {/* Cart */}
        <button
          onClick={() => navigate('/cart')}
          className={`flex flex-col items-center text-[1.3rem] transition-all ${
            isActive('/cart') ? 'text-black scale-110' : 'text-gray-700'
          }`}
        >
          <FaShoppingCart />
          {/* <span className="text-[0.7rem] mt-1">Cart</span> */}
        </button>
      </div>
    </div>
  );
}

export default MobileNav;
