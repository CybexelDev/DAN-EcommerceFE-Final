import React, { useState } from "react";
import { addAddress } from "../../API/userApi";
import { useDispatch } from "react-redux";
import { FaPencil } from "react-icons/fa6";
import { toastError, toastSuccess } from "../../utils/toast";

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

  // 🔹 Handle input change + clear error
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // 🔹 Validate form
  const validateForm = () => {
    const newErrors = {};
    let firstErrorField = null;

    const setErr = (field, msg) => {
      if (!firstErrorField) firstErrorField = field;
      newErrors[field] = msg;
    };

    if (!formData.fullName.trim())
      setErr("fullName", "Full name is required");

    if (!/^[6-9]\d{9}$/.test(formData.phoneNumber))
      setErr("phoneNumber", "Enter valid 10-digit mobile number");

    if (!/^\d{6}$/.test(formData.pincode))
      setErr("pincode", "Enter valid 6-digit pincode");

    if (!formData.houseNo.trim())
      setErr("houseNo", "House number is required");

    if (!formData.area.trim())
      setErr("area", "Area is required");

    if (!formData.city.trim())
      setErr("city", "City is required");

    if (!formData.state.trim())
      setErr("state", "State is required");

    if (!formData.addressType.trim())
      setErr("addressType", "Select address type");

    setErrors(newErrors);

    if (firstErrorField) {
      document.querySelector(`[name="${firstErrorField}"]`)?.focus();
    }

    return Object.keys(newErrors).length === 0;
  };

  // 🔹 Use current location
  const handleLocationCheck = async (e) => {
    const checked = e.target.checked;
    setUseLocation(checked);

    if (checked && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          setFormData((prev) => ({
            ...prev,
            city:
              data.address.city ||
              data.address.town ||
              data.address.village ||
              "",
            state: data.address.state || "",
            pincode: data.address.postcode || "",
          }));
        } catch (err) {
          console.error("Location fetch failed", err);
        }
      });
    }
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (onSubmit) onSubmit(formData, mode);
      await addAddress(userId, formData);
      dispatch({ type: "SET_TRUE" });
      toastSuccess("Address saved successfully!");
      // alert("✅ Address saved successfully!");
      onCancel();
    } catch (error) {
      toastError("Failed to add address. Please try again.");
      // alert("❌ Failed to add address. Please try again.");
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

      {/* Use Location */}
      <label className="flex items-center gap-3 bg-[#EDE4FC] py-2 px-4 rounded-md cursor-pointer">
        <input
          type="checkbox"
          checked={useLocation}
          onChange={handleLocationCheck}
          className="w-5 h-5 accent-[#F2591A]"
        />
        <span className="font-semibold">Use my current location</span>
      </label>

      {/* Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          ["fullName", "Full Name"],
          ["phoneNumber", "10 digit Mobile Number"],
          ["pincode", "Pincode"],
          ["addressType", "Address Type (Home / Work / Other)"],
          ["city", "City"],
          ["state", "State"],
          ["landmark", "Landmark"],
          ["area", "Area"],
        ].map(([name, placeholder]) => (
          <div key={name}>
            <input
              type="text"
              name={name}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleChange}
              readOnly={useLocation && ["city", "state", "pincode"].includes(name)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F2591A] outline-none"
            />
            {errors[name] && (
              <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
            )}
          </div>
        ))}

        <div className="sm:col-span-2">
          <input
            type="text"
            name="houseNo"
            placeholder="House No"
            value={formData.houseNo}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F2591A] outline-none"
          />
          {errors.houseNo && (
            <p className="text-red-500 text-sm mt-1">{errors.houseNo}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          className="bg-[#F2591A] hover:bg-[#d94d10] text-white font-semibold py-2 px-6 rounded-full"
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
