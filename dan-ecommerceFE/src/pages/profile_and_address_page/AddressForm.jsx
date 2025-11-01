import React, { useState, useEffect } from "react";
import { addAddress } from "../../API/userApi";
import { useDispatch } from "react-redux";

function AddressForm({ mode = "create", initialData = {}, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    pincode: "",
    houseNo: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    addressType: "",
    ...initialData, // pre-fill if edit mode
  });
  const dispatch = useDispatch();

  console.log(formData, "form data >>>>>>>>>>>>>>>>>");
  const userId = localStorage.getItem("userId");

  const [useLocation, setUseLocation] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle checkbox click
  const handleLocationCheck = async (e) => {
    const checked = e.target.checked;
    setUseLocation(checked);

    if (checked && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          // Example API: OpenStreetMap Nominatim reverse geocoding
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          const city = data.address.city || data.address.town || data.address.village || "";
          const district = data.address.county || data.address.state_district || "";
          const pincode = data.address.postcode || "";

          setFormData((prev) => ({
            ...prev,
            city,
            district,
            pincode,
          }));
        } catch (err) {
          console.error("Location fetch failed", err);
        }
      });
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData, mode);
      try {
        const data = await addAddress(userId, formData);
        console.log("✅ Address added successfully:", data);
        alert("Address added successfully!");
        dispatch({ type: "SET_TRUE" });
      } catch (error) {
        alert("Failed to add address. Please try again.");
      }
    }
  };

  return (
    <form
      className="relative w-full aspect-[824/615] bg-white flex justify-center pt-[12%] rounded-b-[1vw] rounded-tr-[1vw] shadow-sm"
      onSubmit={handleSubmit}
    >
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
      {/* Checkbox */}
      <div className="absolute top-[2.76%] left-[33.25%] w-[30.46%] aspect-[251/46] flex justify-between items-center">
        <input
          type="checkbox"
          id="useLocation"
          checked={useLocation}
          onChange={handleLocationCheck}
          className="w-[12.75%] h-[69.57%] bg-[#D9D9D9] appearance-none rounded-full cursor-pointer
                      checked:before:content-['✓'] checked:before:text-black checked:text-[1.3vw] checked:font-semibold  
                      checked:before:flex checked:before:items-center checked:before:justify-center checked:before:h-full checked:before:w-full"
        />
        <label
          htmlFor="useLocation"
          className="w-[82.47%] h-full bg-[#EDE4FC] rounded-[1vw] flex justify-center items-center font-semibold text-[1vw] cursor-pointer"
        >
          Use my current location
        </label>
      </div>

      {/* Form Fields */}
      <div className="w-[93.69%] h-[79.51%] flex flex-col">
        <div className="w-full h-[86.71%] flex flex-col justify-between">
          <div className="w-full h-[13.25%] flex justify-between">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-[49%] p-[1vw] h-full rounded-[1vw] shadow-sm"
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="10 digit Mobile Number"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-[49%] p-[1vw] h-full rounded-[1vw] shadow-sm"
            />
          </div>

          <div className="w-full h-[13.25%] flex justify-between">
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              required
              value={formData.pincode}
              onChange={handleChange}
              readOnly={useLocation}
              className="w-[49%] p-[1vw] h-full rounded-[1vw] shadow-sm"
            />
            <input
              type="text"
              name="addressType"
              placeholder="Address Type (Home / Work / Other)"
              required
              value={formData.addressType}
              onChange={handleChange}
              className="w-[49%] p-[1vw] h-full rounded-[1vw] shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              list="addressTypeOptions"
            />

            <datalist id="addressTypeOptions">
              <option value="Home" />
              <option value="Work" />
              <option value="Other" />
            </datalist>

          </div>

          {/* <textarea
            name="address"
            placeholder="Address (Area & Street)"
            value={formData.address}
            onChange={handleChange}
            required

            className="w-full p-3 shadow-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none m-2"
          ></textarea> */}


          <div className="w-full h-[13.25%] flex justify-between">
            <input
              type="text"
              name="city"
              placeholder="City/Town"
              required
              value={formData.city}
              onChange={handleChange}
              readOnly={useLocation}
              className="w-[49%] p-[1vw] h-full rounded-[1vw] shadow-sm"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              required
              value={formData.state}
              onChange={handleChange}
              readOnly={useLocation}
              className="w-[49%] p-[1vw] h-full rounded-[1vw] shadow-sm"
            />
          </div>

          <div className="w-full h-[13.25%] flex justify-between">
            <input
              type="text"
              name="landmark"
              placeholder="Landmark"
              value={formData.landmark}
              onChange={handleChange}
              className="w-[49%] p-[1vw] h-full rounded-[1vw] shadow-sm"
            />
            <input
              type="text"
              name="area"
              placeholder="Area"
              value={formData.area}
              onChange={handleChange}
              className="w-[49%] p-[1vw] h-full rounded-[1vw] shadow-sm"
            />
          </div>
          <div className="w-full h-[13.25%] flex justify-between">
            <input
              type="number"
              name="houseNo"
              placeholder="House No"
              value={formData.houseNo}
              onChange={handleChange}
              className="w-[49%] p-[1vw] h-full rounded-[1vw] shadow-sm"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full h-[13.29%] flex justify-start items-end">
          <div className="w-[31%] h-[72.3%] flex justify-between items-center">
            <button
              type="submit"
              className="w-[62.34%] h-full bg-[#F2591A] rounded-[1.5vw] font-semibold text-white text-[1.2vw]"
            >
              <p>{mode === "edit" ? "UPDATE" : "SAVE"}</p>
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="w-[28.87%] h-[57.44%] flex items-center justify-center font-semibold text-[#3B94CC] text-[1.6vw]"
            >
              <a>Cancel</a>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddressForm;
