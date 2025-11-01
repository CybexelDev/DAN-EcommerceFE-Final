import React from 'react'
import FeaturesCard from '../../../components/cards/FeaturesCard'
import support from "../../../assets/images/features/support.png"
import fsshipping from "../../../assets/images/features/fsshipping.png"
import pqm from "../../../assets/images/features/pqm.png"

function FeaturesSection() {
  return (
    <div className='w-full aspect-[1440/519]  mb-[2vw] flex flex-col justify-center'>
        <div className="w-full h-[70%]  flex flex-col justify-between">
            <div className="w-full h-[25%]  flex flex-col justify-between items-center ">
                <div className="w-[72%] h-[53%] flex justify-center">
                    <h4 className='text-[2.2vw]' >Highlight What Makes You Stand Out </h4>
                </div>
                <div className="w-[72%] h-[30%]  flex justify-center items-center">
                    <p className="text-[1.2vw]" >Use this section to show off the key features like these.</p>
                </div>
            </div>
            <div className="w-full h-[62%]  flex justify-between">
                <FeaturesCard 
                 image={support}
                 title="24/7 Support"
                 description="Get 24/7 support for all your questions and needs, ensuring help is always available."/>
                <FeaturesCard 
                 image={fsshipping}
                 title="24/7 Support"
                 description="Get 24/7 support for all your questions and needs, ensuring help is always available."/>
                <FeaturesCard 
                 image={pqm}
                 title="24/7 Support"
                 description="Get 24/7 support for all your questions and needs, ensuring help is always available."/>
                
            </div>
        </div>
    </div>
    );
}

export default FeaturesSection;