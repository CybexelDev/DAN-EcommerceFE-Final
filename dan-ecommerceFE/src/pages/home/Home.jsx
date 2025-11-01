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

function Home() {
  return (
    <div className='px-[3.8%] pt-[3%]  bg-white w-full h-[100]'>
      <div className="pb-[4%]">
        <Hero />
      </div>
      <div className="">
        <MostPopular />
      </div>
      <div className="">
        <Testimonal />
      </div>
      <div className="">
        <Collections />
      </div>
      <div className="">
        <VideoSection />
      </div>
      <div className="">
        <FeaturesSection />
      </div>
      <div className="">
        <BlogSection />
      </div>
      <div className="">
        <Footer/>
      </div>
    
    </div>
    
  )
}

export default Home