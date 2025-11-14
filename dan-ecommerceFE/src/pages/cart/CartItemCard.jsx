import React from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import aedicon from "../../assets/images/main/aedicon.png"

function CartItemCard({ id, name, brand, image, price, qty, productId, onDelete, onQuantityChange }) {
  const navigate = useNavigate();

  const handleIncrease = (e) => {
    e.stopPropagation();
    onQuantityChange(id, qty + 1);
  };

  const handleDecrease = (e) => {
    e.stopPropagation();
    if (qty > 1) onQuantityChange(id, qty - 1);
  };

  return (
    <div
      onClick={() => navigate(`/product/${productId}`)}
      className="w-full bg-white flex flex-col sm:flex-row justify-between items-center border-b border-[#C3C3C3] p-[3vw] sm:p-[1vw] gap-4 sm:gap-0 cursor-pointer hover:bg-gray-50 transition-all"
    >
      {/* LEFT: Image + Product Info */}
      <div className="flex w-full sm:w-[36%] items-center gap-[3vw] sm:gap-[1vw]">
        <div className="w-[25vw] sm:w-[6vw] aspect-square bg-[#f4f4f4] rounded-lg overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover rounded-md" />
        </div>

        <div className="flex flex-col justify-between w-[70%] sm:w-[66%]">
          <p className="text-[clamp(1.3rem,1.5vw,1.7rem)] font-medium leading-snug line-clamp-2">
            {name}
          </p>
          <p className="text-[clamp(1.1rem,1.3vw,1.5rem)] text-gray-500">{brand}</p>
        </div>
      </div>

      {/* RIGHT: Quantity + Price + Delete */}
      <div className="flex flex-nowrap justify-between sm:justify-around w-full sm:w-[60%] items-center gap-4 sm:gap-0 mt-3 sm:mt-0">

        {/* Capsule Quantity Controls */}
        <div className="flex items-center justify-between w-[45%] sm:w-[30%]">
          <div className="flex items-center justify-between bg-[#D9D9D9] rounded-full w-full sm:w-[8vw] md:w-full h-[10vw] sm:h-[2.5vw] px-[3vw] sm:px-[0.8vw] shadow-inner">
            <button
              onClick={handleDecrease}
              disabled={qty <= 1}
              className={`text-[clamp(1.2rem,1.6vw,1.3rem)] font-bold px-[0.5vw] transition ${
                qty <= 1 ? "text-gray-400 cursor-not-allowed" : "hover:text-black text-gray-700"
              }`}
            >
              −
            </button>

            <span className="text-[clamp(1rem,1.5vw,1.2rem)] font-semibold select-none">
              {qty}
            </span>

            <button
              onClick={handleIncrease}
              className="text-[clamp(1.2rem,1.6vw,1.3rem)] font-bold px-[0.5vw] hover:text-black text-gray-700 transition"
            >
              +
            </button>
          </div>
        </div>

        {/* Price */}
        <div
  className="
    text-[clamp(1rem,1.5vw,1.7rem)]
    font-semibold
    w-[30%] sm:w-[25%]
    text-center sm:text-right
    flex items-center justify-center sm:justify-end
  "
>
  <img
    src={aedicon}
    alt="AED"
    className="h-[.7em] w-auto mr-[0.3em] inline-block align-baseline"
  />
  {(price * qty).toFixed(2)}
</div>


        {/* Delete Button */}
        <div className="w-[15%] flex justify-center sm:justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            className="text-[clamp(1.5rem,2vw,1.8rem)] text-black hover:text-red-600 transition"
          >
            <RiDeleteBin6Fill />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItemCard;
