import React, { useState } from 'react'
import AddressForm from './AddressForm'

function AddressAddAndForm({isAddress, onCancel}) {
    const [isOpen, setIsopen] = useState(false)

    const handleClose = () => {
      setIsopen(false);
      if (onCancel) onCancel();
    }

    const handleClick = () => {
        setIsopen((prev) => !prev )
    }
  return (
        <>
            { isOpen ? (
                <div className="w-full aspect-[824/615]">
                    <AddressForm 
                    mode='create'
                    onSubmit={(data) => {
                      // Addd api end point
                      console.log("Creating new address", data);
                    }}

                    onCancel ={handleClose}
                     />
                </div>
            ) : (
                <div className="w-full aspect-[816/114] bg-white rounded-[1vw] shadow flex justify-center items-center ">
              <div className="w-[95%] aspect-[723/34] flex justify-between items-center">
                <div className={`w-[4.2%] aspect-square  flex justify-center items-center rounded-[.5vw] ${!isAddress ? "pl-[.6vw] pb-[.5vw] text-[2.5vw] font-bold " :"bg-[#D8D8D8] text-[1.5vw] font-semibold"}  `}>
                  <p>{ isAddress ? ("2"):("+")}</p>
                </div>
                <div className="w-[93.5%] h-full flex justify-between">
                  <div className="w-full h-full flex items-center">
                    <h4 className=' text-[1.3vw] font-semibold'>{ isAddress ? "Add Another Address" : "DELIVERY ADDRESS" }</h4>
                  </div>
                  <button onClick={handleClick} className=" h-full aspect-[98/34] font-semibold text-[1vw] bg-[#FDEEEE] rounded-[1vw]"> { isOpen ? "hi" : "Add" }</button>
                </div>
              </div>
            </div>
            )}
        </>
  )
}

export default AddressAddAndForm