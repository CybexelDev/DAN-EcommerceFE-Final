import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import TestimonialCard from "../../components/card/TestimonialCard";
import AddTestimonialModal from "../../components/modals/AddTestimonialModal";
import { addTestimonial, deleteTestimonial, getTestimaonials } from "../../Api/adminApi";


const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
//   const testimonials = [
//     {
//       name: "Ayesha Malik",
//       image: "/users/ayesha.jpg",
//       message: "The quality and craftsmanship were beyond expectations. Highly recommended!",
//       starRating: 5,
//     },
//     {
//       name: "Rahul Sharma",
//       image: "/users/rahul.jpg",
//       message: "Quick delivery and excellent packaging. Will order again soon.",
//       starRating: 4,
//     },
//   ];
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getTestimaonials(setTestimonials);
  }, []);

  // Add new testimonial
  const handleAddTestimonial = (newTestimonial) => {
    // setTestimonials([...testimonials, newTestimonial]);
      addTestimonial(newTestimonial).then((res) => {
          console.log("Testimonial added:", res);
          getTestimaonials(setTestimonials);
      }).catch((err) => {
          console.error("Error adding testimonial:", err);
      });
  };

  // Delete testimonial
  const handleDelete = (id) => {
    // setTestimonials(testimonials.filter((t) => t.id !== id));
      deleteTestimonial(id).then((res) => {
          console.log("Testimonial deleted:", res);
          getTestimaonials(setTestimonials);
      }).catch((err) => {
          console.error("Error deleting testimonial:", err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Testimonials</h1>
          <p className="text-gray-500">Manage and showcase client feedback</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="cursor-pointer flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          Add Testimonial
        </button>
      </div>

      {/* Testimonials Grid */}
      {testimonials.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">
          No testimonials added yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {/* Add Testimonial Modal */}
      <AddTestimonialModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddTestimonial}
      />
    </div>
  );
};

export default Testimonials;
