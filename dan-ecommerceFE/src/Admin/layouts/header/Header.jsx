import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { addHeader, deleteHeader, getHeader } from "../../Api/adminApi";

const Header = () => {
  const [headers, setHeaders] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
   const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getHeader(setHeaders);
  }, []);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result;
        setImagePreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

const handleSave = async () => {
  if (!imageFile) return;

  setLoading(true); 

  const formData = new FormData();
  formData.append("image", imageFile); 

  try {
    const res = await addHeader(formData);
    console.log("✅ Upload success:", res);

    // Reset states
    setModalOpen(false);
    setImageFile(null);
    setImagePreview("");
    setFileName("");

    // Refresh headers
    getHeader(setHeaders);
  } catch (err) {
    console.error("❌ Upload failed:", err);
    alert("Failed to upload header.");
  } finally {
    setLoading(false); // Stop loading
  }
};

  // Handle Delete
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this header?");
    try {
        if (confirmed) {
          const data =  await deleteHeader(id);
            console.log("Deleted:", data);
            if (data.message === "header deleted successfully") {
                getHeader(setHeaders);
            }
        }
    } catch (error) {
        console.log("Error deleting header:", error);
    }
  };



  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between py-4 border-b border-gray-200 mt-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Headers</h1>
          <p className="text-md text-gray-400">Manage your header</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New Header
        </button>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-6">
        {headers.map((item) => (
          <div
            key={item.id}
            className="group overflow-hidden rounded-3xl relative shadow-2xl border border-gray-100 bg-white transition-all hover:shadow-lg"
          >
            {/* Delete Button */}
            <button
              onClick={() => handleDelete(item._id)}
              className="cursor-pointer absolute right-2 top-2 z-20 px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>

            {/* Image */}
            <div className="relative h-48 w-full overflow-hidden bg-gray-100">
              <img
                src={item?.image || item?.webImage || "/placeholder.svg"}
                className="h-full w-full object-cover"
                alt="Header"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Add New Header
            </h2>

            {/* File Upload */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Select Image</label>
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
                <p className="text-xs text-gray-500 mt-1">
                  Selected: {fileName}
                </p>
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
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!imagePreview}
                className={`px-4 py-2 flex gap-2 rounded-lg text-white font-semibold transition-colors ${
                  !imagePreview
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading && <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>}
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
