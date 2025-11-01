import React from 'react'

function AddressForm() {
  return (
    <form className='relative w-full aspect-[824/615] bg-white flex justify-center pt-[12%] rounded-b-[1vw] rounded-tr-[1vw] shadow-sm'>

        {/* Sticky curve section start */}
        <div className="absolute top-[0] left-[0] w-[30.58%] h-[11.1%] bg-[#0000000D] rounded-br-[1vw] flex flex-col justify-start
            before:content-['']  before:absolute before:w-[1vw] before:h-[1vw] before:z-10 before:bg-[radial-gradient(circle_at_bottom_right,transparent_0%,_transparent_70%,#0000000D_71%,#0000000D_100%)] 
                    before:-top-[0vw] before:-right-[1vw] before:mask-shape
                    after:content-[''] after:absolute after:w-[1vw] after:h-[1vw] after:z-10 after:bg-[radial-gradient(circle_at_bottom_right,transparent_0%,_transparent_70%,#0000000D_71%,#0000000D_100%)]
                    after:-bottom-[1vw] after:-left-[0vw]   ">
            <div className="absolute w-[81%] h-[41%] top-[41%] left-[6.74%] flex justify-between">
                <div className="w-[15.68%] h-full bg-[#E0E0E0] rounded-[.5vw] text-[1.3vw] font-semibold flex items-center justify-center">
                    <p>2</p>
                </div>
                <div className="w-[80.39%] h-full  font-semibold text-[1.2vw] text-[#F2591A]">
                    <p>DELIVERY ADDRESS</p>
                </div>
            </div>
        </div>
        {/* Sticky curve section end */}
        <div className="absolute top-[2.76%] left-[33.25%] w-[30.46%] aspect-[251/46] flex justify-between items-center">
            {/* Checkbox */}
            <input
                type="checkbox"
                id="useLocation"
                // className="w-[12.75%] h-[69.57%] cursor-pointer checked:bg-[#170404] appearance-none bg-[#D9D9D9] rounded-full "
                className="w-[12.75%] h-[69.57%] bg-[#D9D9D9] appearance-none   rounded-full cursor-pointer
                            checked:before:content-['✓'] checked:before:text-black checked:text-[1.3vw] checked:font-semibold  
                        checked:before:flex checked:before:items-center checked:before:justify-center checked:before:h-full checked:before:w-full"
            />

            {/* Label */}
            <label
                htmlFor="useLocation"
                className="w-[82.47%] h-full bg-[#EDE4FC] rounded-[1vw] flex justify-center items-center font-semibold text-[1vw] cursor-pointer"
            >
                Use my current location
            </label>
        </div>

        <div className="w-[93.69%] h-[79.51%]  flex flex-col">
            <div className="w-full h-[86.71%]  flex flex-col justify-between">
                <div className="w-full h-[13.25%]  flex justify-between">
                    <input type='text' placeholder="Name"  required className='w-[49%] p-[1vw] h-full rounded-[1vw] shadow-sm'></input>
                    <input type='number' maxLength={13} placeholder="10 digit Mobile Number" value="" required className='w-[49%] p-[1vw] h-full rounded-[1vw]  shadow-sm'></input>
                </div>
                <div className="w-full h-[13.25%]  flex justify-between">
                    <input type="number" maxLength={6}  placeholder="Pincode" value="" required className='w-[49%] p-[1vw] h-full rounded-[1vw]  shadow-sm'></input>
                    <input type="text" placeholder="Locality" value="" required className='w-[49%] p-[1vw] h-full rounded-[1vw]  shadow-sm'></input>
                </div>
                 <textarea placeholder='Address(area & street)' className="w-full p-[1vw] h-[25%] shadow-sm rounded-[1vw]"></textarea>
                <div className="w-full h-[13.25%]  flex justify-between">
                    <input type="" placeholder="City/Town" value="" required className='w-[49%] p-[1vw] h-full rounded-[1vw]  shadow-sm'></input>
                    <input type="" placeholder="District" value="" required className='w-[49%] p-[1vw] h-full rounded-[1vw]  shadow-sm'></input>
                </div>
                <div className="w-full h-[13.25%]  flex justify-between">
                    <input type="" placeholder="Landmark" value="" required className='w-[49%] p-[1vw] h-full rounded-[1vw]  shadow-sm'></input>
                    <input type="" placeholder="Alternative Phone (optional)" value=""  className='w-[49%] p-[1vw] h-full rounded-[1vw]  shadow-sm'></input>
                </div>
                
               
            </div>
            <div className="w-full h-[13.29%]  flex justify-start items-end">
                <div className="w-[31%] h-[72.3%]  flex justify-between items-center">
                    <button className="w-[62.34%] h-full bg-[#F2591A] rounded-[1.5vw] font-semibold text-white text-[1.2vw]">
                        <p>SAVE</p>
                    </button>
                    <button className="w-[28.87%] h-[57.44%]  flex items-center justify-center font-semibold text-[#3B94CC] text-[1.6vw]">
                        <p>Cancel</p>
                    </button>
                </div>
            </div>
        </div>
    </form>
  )
}

export default AddressForm