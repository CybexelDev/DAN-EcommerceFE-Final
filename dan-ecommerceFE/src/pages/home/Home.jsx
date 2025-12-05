import React from 'react'
import Hero from './homeitems/Hero'
import Nav from '../../components/nav/HomeNav'
import MostPopular from './homeitems/MostPopular'
import Testimonal from './homeitems/Testimonal'
import Collections from './homeitems/Collections'
import VideoSection from './homeitems/VideoSection'
import FeaturesSection from './homeitems/FeaturesSection'
import BlogSection from './homeitems/BlogSection'
import Footer from './homeitems/Footer'
import SubNav from '../../components/nav/SubNav'

function Home() {
  return (
    <div className='px-[3.8%] pt-[3%]  bg-white w-full h-[100]'>
      <div className="md:pb-[4%] pb-[7%] ">
      <SubNav subMinDiv="w-[100%] h-[35px] bg-transparent flex gap-4 items-center justify-end pr-2 absolute block right-2 md:right-15 top-[3px] md:top-1 z-40" />

        <Hero />
      </div>
      <div className="pb-[2%]">
        <MostPopular />
      </div>
      <div className="md:pb-[4%] pb-[7%] ">
        <Testimonal />
      </div>
      <div className="md:pb-[2%] pb-[7%] ">
        <Collections />
      </div>
      <div className="md:pb-[4%] pb-[10%]">
        <VideoSection />
      </div>
      <div className="pb-[10%] md:pb-[0%]">
        <FeaturesSection />
      </div>
      <div className="pb-[5%] md:pb-[0%]">
        <BlogSection />
      </div>
      <div className="md:pb-[2%] pb-[17%]">
        <Footer/>
      </div>
    
    </div>
    
  )
}

export default Home