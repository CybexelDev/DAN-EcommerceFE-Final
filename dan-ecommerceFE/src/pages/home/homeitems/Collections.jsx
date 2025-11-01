import React, { useState, useEffect } from 'react'
import CollectionHomeCard from '../../../components/cards/CollectionHomeCard'
import categoryfood from "../../../assets/images/collection/categoryfood.png"
import categorybab from "../../../assets/images/collection/categorybarb.png"
import { getCategorys } from '../.././../API/userApi'

function Collections() {

    const [data, setdata] = useState([])


    useEffect(() => {
        getCategorys(setdata);
    }, []);

    return (
        <div className='w-full aspect-[1440/574]  flex flex-col justify-center mb-[2vw]'>
            <div className=" h-[72%] flex flex-col justify-between">
                <div className=" h-[15.5%] flex">
                    <div className="w-full  flex-col justify-start px-1">
                        <h3 className='text-[1.5vw]'>Most Popular</h3>
                        <p className='text-[1vw]'>Showcase your most popular products, front and center.</p>
                    </div>
                    <div className="w-full  flex text-[1.3vw] items-center justify-end px-4">
                        <a href="#">View All &rarr;</a>
                    </div>

                </div>
                <div className=" h-[77%] flex justify-between">
                    {data.map((item) => (
                        <div className="w-[31.5%] aspect-[448/318] ">
                            <CollectionHomeCard
                                image={item.image[0]}
                                category={item.category} />
                        </div>
                    ))}

                    {/* <div className="w-[31.5%] aspect-[448/318] ">
                    <CollectionHomeCard
                     image={categorybab}
                     category={"Barbeque"} />
                </div>
                <div className="w-[31.5%] aspect-[448/318] ">
                    <CollectionHomeCard
                     image={categoryfood}
                     category={"Paty Items"} />
                </div> */}
                </div>
            </div>
        </div>
    )
}

export default Collections