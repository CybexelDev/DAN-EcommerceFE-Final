import React from 'react'
import Nav from '../../components/nav/Nav'
import PaymentCard from '../../components/cards/PaymentCard'
import ProfileSection from './ProfileSection'
import AddressSection from './AddressSection'

function ProfileAndAddress() {
  return (
    <div className='w-full min-h-[80vh] bg-[#0000000D] relative pt-[12.22%] pl-[3.12%] pr-[6.39%] pb-[2vw]'>
      <Nav />
      <div className="w-full flex flex-wrap justify-between bg-amber mb-[2vw]">
        <div className="md:w-[62.62%] w-[100%] flex flex-col gap-[2vw]">
          <ProfileSection />
          <AddressSection />
        </div>
        <div className="md:w-[33.77%] md:mt-[20px] mt-[30px] w-[100%] aspect-[440/530]">
          <PaymentCard />
        </div>
      </div>
    </div>
  )
}

export default ProfileAndAddress