import React from "react";
import { Star, Trash2 } from "lucide-react";

const TestimonialCard = ({ testimonial, onDelete }) => {
  const { _id, name, image, message, starRating } = testimonial;

  return (
    <div className="relative bg-white border border-gray-100 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
      <button
        onClick={() => onDelete(_id)}
        className="cursor-pointer absolute top-3 right-3 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
      >
        <Trash2 size={16} />
      </button>

      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md mx-auto mb-4">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>

      <div className="flex justify-center my-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={`${
              i < starRating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>

      <p className="text-gray-600 text-sm italic">“{message}”</p>
    </div>
  );
};

export default TestimonialCard;
