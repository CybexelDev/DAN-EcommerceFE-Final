import React, { useState } from "react";
import { Star } from "lucide-react";

const AddTestimonialModal = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [starRating, setStarRating] = useState(5);
  const [imagePreview, setImagePreview] = useState("");
  const [fileName, setFileName] = useState("");
  const [imagefile, setImageFile] = useState(null);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => setImagePreview(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!name || !message || !imagePreview) return;
    const newTestimonial = {
      name,
      message,
      starRating,
      image: imagefile,
    };
    onAdd(newTestimonial);
    onClose();
    setName("");
    setMessage("");
    setStarRating(5);
    setImagePreview("");
    setFileName("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-96 shadow-2xl relative">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Add Testimonial
        </h2>

        {/* Name */}
        <div className="mb-3">
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Message */}
        <div className="mb-3">
          <label className="block text-gray-700 mb-1">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Star Rating */}
        <div className="mb-3">
          <label className="block text-gray-700 mb-1">Star Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <Star
                key={num}
                onClick={() => setStarRating(num)}
                className={`cursor-pointer ${
                  num <= starRating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
                size={22}
              />
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-600
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-600 file:text-white
              hover:file:bg-blue-700"
          />
          {fileName && (
            <p className="text-xs text-gray-500 mt-1">Selected: {fileName}</p>
          )}
        </div>

        {/* Preview */}
        {imagePreview && (
          <div className="relative mb-4 h-32 w-full overflow-hidden rounded-md border border-gray-200">
            <img
              src={imagePreview}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!name || !message || !imagePreview}
            className={`px-4 py-2 rounded-lg text-white font-semibold transition-colors ${
              !name || !message || !imagePreview
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTestimonialModal;
