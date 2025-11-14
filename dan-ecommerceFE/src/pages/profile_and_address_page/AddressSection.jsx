import React, { useEffect, useState } from 'react'
import selectedmark from "../../assets/images/profileandaddress/selectedmark.png"
import AddressAddAndForm from './AddressAddAndForm'
import AddressCard from './AddressCard'
import AddressForm from './AddressForm'
import { deleteAddress, getAddress } from '../../API/userApi'
import { useSelector, useDispatch } from "react-redux";


function AddressSection() {
  const [isOpen, setIsopen] = useState(false)
  const [addresses, setAddresses] = useState([])
  const userId = localStorage.getItem("userId");
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const dispatch = useDispatch();
  const { addressAddStatus } = useSelector((state) => state.addressStatus);

  const deliveryAddress = useSelector((state) => state.deliveryAddress);

  console.log(deliveryAddress, "delivery address in address section >>>>>>>>> 555555");
  

  const fetchAddresses = async () => {
    try {
      const data = await getAddress(userId);
      setAddresses(data.addresses);
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  if (addressAddStatus) {
    fetchAddresses();
    dispatch({ type: "SET_FALSE" });
  }

  const handleClick = () => {
    setIsopen((prev) => !prev)
  };


  const handleDelete = async (addressId) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    try {
      const data = await deleteAddress(userId, addressId);
      setAddresses(data.addresses);
    } catch (error) {
      console.error(error);
      alert("Failed to delete address");
    }
  };

  const handleDeliverHere = (addr) => {
    console.log(addr, "777777777777777777777777");
    
    setSelectedAddressId(addr._id);

    dispatch({
      type: "SET_DELIVERY_ADDRESS",
      payload: {
        addressType: addr?.addressType,
        area: addr?.area,
        city: addr?.city,
        fullName: addr?.fullName,
        houseNo:  addr?.houseNo,
        landmark:   addr?.landmark,
        phoneNumber:  addr?.phoneNumber,
        pincode:  addr?.pincode,
        state:  addr?.state,
        _id:  addr?._id,
      },
    });
  }


  useEffect(() => {
    if (deliveryAddress && deliveryAddress._id) {
      setSelectedAddressId(deliveryAddress._id);
    } 
  }, [deliveryAddress]);

  return (
    <div className=" w-full flex flex-col gap-[10px]">
      <div className="">
        {addresses && addresses.length > 0 ? (
          addresses.map((addr) => (
            <AddressCard
              key={addr._id}
              {...addr}
              isSelected={selectedAddressId === addr._id}
              onDeliverHere={() => handleDeliverHere(addr)}
              onChange={() => setSelectedAddressId(addr._id)}
              onDelete={() => handleDelete(addr._id)}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No addresses found</p>
        )}
      </div>
      <AddressAddAndForm isAddress={addresses.length > 0} />
    </div>

  );
}

export default AddressSection