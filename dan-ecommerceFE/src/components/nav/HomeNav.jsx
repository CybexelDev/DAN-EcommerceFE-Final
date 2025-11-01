import React from 'react'
import logo from "../../assets/images/home/logo.png"
import { FaSearch } from "react-icons/fa";
import { FaShoppingBasket, FaUser, FaBox } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function HomeNav() {
  const navigate = useNavigate();
  return (
    <div className=' nav absolute flex top-[0] left-[0]  w-[42.5%]  bg-white   aspect-[100/11]  rounded-br-[2vw] z-10
    before:content-[""] before:w-[2vw] before:h-[2vw] before:absolute before:bg-[radial-gradient(circle_at_bottom_right,transparent_0%,_transparent_70%,_white_71%,_white_100%)] before:top-0 before:-right-[2vw]
    after:content-[""] after:w-[2vw] after:h-[2vw] after:absolute after:bg-[radial-gradient(circle_at_bottom_right,transparent_0%,_transparent_70%,_white_71%,_white_100%)] after:-bottom-[2vw] after:left-[0]'>
        <div className='w-[23%] h-full   rounded-tl-2xl pl-[4%] py-[2%]'>
            <img className=' cursor-pointer w-full h-full' onClick={() =>navigate('/')} src={logo} alt="logo"  />
        </div>
        <div className='w-[77%] flex  items-center justify-center  rounded-br-2xl  '>
            <div className="h-[57%] w-full flex justify-between items-center px-[10%] gap-[1vw] text-[1vw] ">
  <ul className="flex justify-around gap-[1.7vw] h-[56%] w-[80%] items-center py-2 font-semibold text-[1.1vw]">
    {/* <li className=' cursor-pointer'>Shop</li> */}
    <li className='cursor-pointer' onClick={()=>navigate('/collections')}>Collections</li>
    <li className=' cursor-pointer' onClick={()=>navigate('/blog')}>Blog</li>
    <li className=' cursor-pointer' onClick={()=>navigate('/support')}>Support</li>
    <li className='text-[1.1vw] cursor-pointer' onClick={()=>navigate('/address')}> <FaUser /></li>
    <li className='text-[1.2vw] cursor-pointer' onClick={()=>navigate('/cart')}><FaShoppingBasket /></li>
        <li className='text-[1.2vw] cursor-pointer' onClick={() => navigate('/orders')}><FaBox /></li>
  </ul>
</div>

        </div>
    </div>
  )
}

export default HomeNav