import React, { useState } from "react";
import { addAddress } from "../../API/userApi";
import { useDispatch } from "react-redux";
import { FaPencil } from "react-icons/fa6";

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
    ...initialData,
  });

  const [errors, setErrors] = useState({});
  const [useLocation, setUseLocation] = useState(false);
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Basic validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phoneNumber.match(/^[0-9]{10}$/))
      newErrors.phoneNumber = "Enter a valid 10-digit number";
    if (!formData.pincode.match(/^[0-9]{5,6}$/))
      newErrors.pincode = "Enter a valid pincode";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.addressType.trim())
      newErrors.addressType = "Please choose address type";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle location checkbox
  const handleLocationCheck = async (e) => {
    const checked = e.target.checked;
    setUseLocation(checked);

    if (checked && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const city =
            data.address.city || data.address.town || data.address.village || "";
          const state = data.address.state || "";
          const pincode = data.address.postcode || "";

          setFormData((prev) => ({ ...prev, city, state, pincode }));
        } catch (err) {
          console.error("Location fetch failed", err);
        }
      });
    }
  };

  // ✅ Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (onSubmit) onSubmit(formData, mode);
      onCancel()
      await addAddress(userId, formData);
      alert("✅ Address saved successfully!");

      dispatch({ type: "SET_TRUE" });
    } catch (error) {
      alert("❌ Failed to add address. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[800px] mx-auto bg-white p-6 sm:p-8 rounded-xl flex flex-col gap-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="bg-gray-200 p-2 rounded-md text-xl text-gray-700">
          <FaPencil />
        </div>
        <h2 className="text-lg sm:text-xl font-semibold text-[#F2591A]">
          DELIVERY ADDRESS
        </h2>
      </div>

      {/* Use location */}
      <label className="flex items-center gap-3 bg-[#EDE4FC] py-2 px-4 rounded-md cursor-pointer">
        <input
          type="checkbox"
          checked={useLocation}
          onChange={handleLocationCheck}
          className="w-5 h-5 accent-[#F2591A]"
        />
        <span className="font-semibold text-sm sm:text-base">
          Use my current location
        </span>
      </label>

      {/* Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F2591A] outline-none"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="10 digit Mobile Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F2591A] outline-none"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            readOnly={useLocation}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F2591A] outline-none"
          />
          {errors.pincode && (
            <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="addressType"
            list="addressTypeOptions"
            placeholder="Address Type (Home / Work / Other)"
            value={formData.addressType}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F2591A] outline-none"
          />
          <datalist id="addressTypeOptions">
            <option value="Home" />
            <option value="Work" />
            <option value="Other" />
          </datalist>
          {errors.addressType && (
            <p className="text-red-500 text-sm mt-1">{errors.addressType}</p>
          )}
        </div>

        <input
          type="text"
          name="city"
          placeholder="City/Town"
          value={formData.city}
          onChange={handleChange}
          readOnly={useLocation}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F2591A] outline-none"
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          readOnly={useLocation}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F2591A] outline-none"
        />

        <input
          type="text"
          name="landmark"
          placeholder="Landmark"
          value={formData.landmark}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F2591A] outline-none"
        />

        <input
          type="text"
          name="area"
          placeholder="Area"
          value={formData.area}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F2591A] outline-none"
        />

        <input
          type="text"
          name="houseNo"
          placeholder="House No"
          value={formData.houseNo}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F2591A] outline-none sm:col-span-2"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-start items-center gap-4 mt-4">
        <button
          type="submit"
          className="bg-[#F2591A] hover:bg-[#d94d10] text-white font-semibold py-2 px-6 rounded-full transition-all duration-300"
        >
          {mode === "edit" ? "UPDATE" : "SAVE"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-[#3B94CC] font-semibold hover:underline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AddressForm;
