import React from 'react';
import Nav from '../../components/nav/Nav';
import AboutPrivateLabelCard from './AboutPrivateLabelCard';
import AboutPrivateLabelDetails from './AboutPrivateLabelDetails';
import AboutVisionMisionCard from './AboutVisionMisionCard';
import curveddotlinearrow from "../../assets/images/about/curveddotlinearrow.png";
import AboutFooter from './AboutFooter';
import AboutClientCarousel from './AboutClientCarousel';
import AboutPrivateLabelling from './AboutPrivateLabelling';
import AboutSecondCarousel from './AboutSecondCarousel';
import bgflower from '../../assets/images/about/bgflower.png'
import AboutWaveSection from './AboutWaveSection';

function AboutHome() {
  return (
    <div className='relative overflow-hidden w-full aspect-[1440/3637]  pt-[16.45%]'>
      {/* First image section */}
      <div className="absolute top-[7.2%] -left-[1.5%] rotate-195 transform -scale-x-[1]  opacity-15 w-[35%] h-[20.77%]">
        <img src={bgflower} alt=""
        className='w-full h-full   z-100 ' />
      </div>
      {/* Second image Section */}
      <div className="absolute top-[14.2%] -right-[25.2%] -rotate-99   opacity-15 w-[35%] h-[20.77%] ">
        <img src={bgflower} alt=""
        className='w-full h-full   z-100 ' />
      </div>
      {/* Third image Section */}
      <div className="absolute top-[35.4%] right-[4.9%] -rotate-25 transform -scale-x-[1]   opacity-15 w-[37%] h-[20.77%] z-50 ">
        <img src={bgflower} alt=""
        className='w-full h-full   z-100 ' />
      </div>
      {/* Fourth image Section */}
      <div className="absolute top-[52.5%] left-[6.2%] rotate-25 transform scale-x-[1]   opacity-15 w-[37%] h-[20.77%]  ">
        <img src={bgflower} alt=""
        className='w-full h-full    ' />
      </div>
      <Nav />
      <div className="w-full h-full flex flex-col justify-between">
        <div className="w-full h-[50.6%]  flex justify-center ">
          <div className="h-full w-[84%] bg-white flex flex-col justify-between items-center">
            <div className="w-full h-[56%] flex flex-col justify-between items-end">
              <div className="w-[83.8%] h-[38.38%] flex flex-col justify-between items-start">
                <div className=" w-[11.74%] h-[9.73%] text-[1.5vw] flex items-center font-semibold text-[#8F8F8F]">
                  About us __
                </div>
                <div className=" w-full h-[84.32%] flex flex-col justify-between items-start">
                  <div className="w-[54.1%] h-[30.77%]  text-[2.5vw] font-semibold m-0 leading-[3vw] ">
                    <h4>Bringing Quality Products to Your Doorstep</h4>
                  </div>
                  <div className="w-full h-[59%]  flex flex-col justify-between">
                    <div className="w-full h-[45.65%] ">
                      <p className='text-[1.09vw]'>Established in 2015, Dar Al Nahda Trading is a leading wholesale trading company and B2B distributor
                         across the UAE, Bahrain, Oman, and Qatar. Headquartered in the UAE, we are expanding to Saudi Arabia,
                          Africa, Kuwait, and India. With rapid growth, we now offer a wide portfolio specializing in Barbeque,
                           Camping & Outdoor, Party Items, Door Mats, Blankets, Personal Care, and Masking Tapes.</p>
                    </div>
                    <div className="w-full h-[45.65%] ">
                      <p className='text-[1.07vw]'>Our relationship with our clients has been instrumental in our growth. Some of our clients are Union Coop,
                         Lulu Hypermarket, Nesto Hyper Market, Sharjah Coop, Al Madina Group, Al Ain Coop and Coop to name a few.
                         We deliver quality products that have been sourced globally. We also offer private labelling for many of our products.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-[47.61%] flex justify-between items-start">
                <div className="w-[46.52%] h-[97.6%] ">
                  <AboutPrivateLabelCard />
                </div>
                <div className="w-[47.35%] h-full">
                  <AboutPrivateLabelDetails />
                </div>
              </div>
            </div>
            <div className="relative  w-[86%] h-[36.2%] ">
              <div className="absolute top-[18%] left-[5%] -rotate-15 w-[38.66%] h-[33.43%]">
                <AboutVisionMisionCard
              title={"Vision"}
              color={"bg-[#812C2C]"}
              content={"Our vision it to continue to be a leading trading company and adapt and grow with the times"} />
              </div>
              <div className="relative top-[14%] left-[39%] rotate-9   w-[50%] h-[50%] z-10">
                <img src={curveddotlinearrow} alt="" className='w-full h-full' />
              </div>
              <div className="absolute bottom-[15%] right-[5%] rotate-15 w-[38.66%] h-[33.43%]">
                <AboutVisionMisionCard
              title={"Mission"}
              color={"bg-[#52582A]"}
              content={"Our mission is continue to serve our clients with quality products that meet all standard guidelines"} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[46.5%] flex flex-col justify-between">
          <div className="w-full h-[64.96%]  flex flex-col justify-between items-center">
            <div className="w-[95.97%] h-[75.26%]  flex flex-col justify-between items-center">

              {/* Client carousel section start */}
              <div className="w-[75.84%] h-[36.87%]  flex flex-col justify-between items-center">
                <AboutClientCarousel />
              </div>
              {/* Client carousel setion end */}

              {/* Private labelling section Start */}
              <div className="w-full h-[51.48%]">
                <AboutPrivateLabelling />
              </div>
              {/* Private labelling Section end */}
            </div>

            {/* Second Carousel section start */}
            <div className="w-full h-[8.1%] ">
              <AboutSecondCarousel />
            </div>
            {/* Second Carousel section end */}
          </div>
          <div className="w-full h-[14.74%] bg-red-400 ">
            {/* Wave section start */}
            <AboutWaveSection />

            {/* Wave section end */}

          </div>
          <div className="w-full h-[20.3%] ">
            <AboutFooter />
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default AboutHome