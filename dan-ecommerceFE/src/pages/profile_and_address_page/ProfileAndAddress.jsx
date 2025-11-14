import React from 'react'
import Nav from '../../components/nav/Nav';
import PaymentCard from '../../components/cards/PaymentCard';
import ProfileSection from './ProfileSection';
import AddressSection from './AddressSection';
import MobileNav from '../../components/nav/MobileNav';
import Footer from '../home/homeitems/Footer.jsx'

function ProfileAndAddress() {
  return (
    <div className='w-full min-h-[80vh] bg-[#f2f2f2]  relative pt-[5%] md:pt-[5%] lg:pt-[10.22%] px-[3.12%]  pb-[2vw] mb-[9vw] md:mb-[2vw] '>
      {/* Nav Section */}
      <div className="hidden lg:block">
        <Nav />
      </div>
      <div className="block lg:hidden">
        <MobileNav />
      </div>

      {/* Main Content */}
      <div className="w-full  flex flex-col lg:flex-row justify-between gap-[2vw] mb-[2vw]">
        {/* Left Section */}
        <div className="lg:w-[63%]  w-full  flex flex-col gap-[12vw] md:gap-[10vw] lg:gap-[2vw]">
          <ProfileSection />
          <AddressSection />
        </div>

        {/* Right Section (Stacks below on small screens) */}
        <div className=" w-full lg:w-[35%] flex justify-center items-start   ">
          <PaymentCard />
        </div>
      </div>
      {/* <div className="my-[11%] md:my-[3%]">
        <Footer />
      </div> */}
    </div>
  )
}

export default ProfileAndAddress
