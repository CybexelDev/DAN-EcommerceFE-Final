import { useState } from "react";

export default function ProductRow({ product, onEdit, onDelete }) {
  const getStockStatus = (quantity) => {
    if (quantity === 0) return { text: "Out of Stock", color: "red" };
    if (quantity < 5) return { text: "Low Stock", color: "orange" };
    return { text: "In Stock", color: "green" };
  };

  const stockStatus = getStockStatus(product.quantity);

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      {/* Product Info */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-12 w-12 flex-shrink-0">
            <img
              className="h-12 w-12 rounded-lg object-cover border border-gray-200"
              src={product.images?.[0] || "/src/assets/images/productdetail/pimage1.png"}
              alt={product.productName}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {product.productName}
            </div>
            <div className="text-sm text-gray-500">
              {product.brandName}
            </div>
          </div>
        </div>
      </td>

      {/* Category */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {product.category}
        </span>
      </td>

      {/* Price */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900">
            ₹{product.discountedRate || product.rate}
          </span>
          {product.discount > 0 && (
            <span className="text-xs text-gray-500 line-through">
              ${product.rate}
            </span>
          )}
        </div>
      </td>

      {/* Stock */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <span className="text-sm text-gray-900 mr-2">{product.quantity}</span>
          <div className={`w-2 h-2 rounded-full bg-${stockStatus.color}-500`}></div>
        </div>
      </td>

      {/* Rating */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          <span className="text-sm text-gray-900 ml-1">
            {product.starRating}
          </span>
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${stockStatus.color}-100 text-${stockStatus.color}-800`}>
          {stockStatus.text}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(product)}
            className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition-colors duration-200"
            aria-label="Edit product"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(product)}
            className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors duration-200"
            aria-label="Delete product"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" x2="10" y1="11" y2="17" />
              <line x1="14" x2="14" y1="11" y2="17" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}