import React from "react";
import { ChevronRight, Package, Truck, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

 function OrderCard({
  _id,
  totalAmount,
  products,
  orderStatus,
  createdAt,
  onViewDetails,
  onTrack,
}) {
  const statusConfig = {
    pending: {
      label: "pending",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-800",
      icon: Package,
    },
    processing: {
      label: "processing",
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
      icon: Package,
    },
    shipped: {
      label: "shipped",
      bgColor: "bg-purple-100",
      textColor: "text-purple-800",
      icon: Truck,
    },
    delivered: {
      label: "delivered",
      bgColor: "bg-green-100",
      textColor: "text-green-800",
      icon: CheckCircle2,
    },
  };

  const navigate = useNavigate();

  const config = statusConfig[orderStatus];
  const StatusIcon = config.icon;

  return (
    <div className="bg-[#fbfbfb] border border-gray-200 rounded-2xl hover:shadow-xl transition-shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-semibold text-lg">{_id}</p>
        </div>
        <div
          className={`flex items-center gap-1 px-3 py-1 rounded-full ${config.bgColor} ${config.textColor} text-sm font-medium`}
        >
          <StatusIcon className="w-3 h-3" />
          {config.label}
        </div>
      </div>

      {createdAt && <p className="text-sm text-gray-500 mb-4">{createdAt}</p>}

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-900 mb-3">
          Items ({products.length})
        </p>
        <div className="space-y-2">
          {products.slice(0, 2).map((product) => (
            <div onClick={() => navigate(`/product/${product.productId}`)} key={product.productId} className="flex gap-3 cursor-pointer">
              <div className="relative w-12 h-12 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex justify-between text-sm">
                <div>
                  <p className="font-medium line-clamp-1 text-gray-900">
                    {product.name}
                  </p>
                  <p className="text-gray-500 text-xs">
                    Qty: {product.quantity}
                  </p>
                </div>
                <p className="font-medium text-gray-900">
                  ${(product.price * product.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
          {products.length > 2 && (
            <p className="text-sm text-gray-500">
              +{products.length - 2} more item
              {products.length - 2 > 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 my-4" />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-xl font-bold text-gray-900">
            ${totalAmount.toFixed(2)}
          </p>
        </div>
        <div className="flex gap-2">
          {orderStatus === "shipped" && onTrack && (
            <button
              onClick={onTrack}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Track
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
          {onViewDetails && (
            <button
              onClick={onViewDetails}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-[#000] rounded-lg hover:bg-[#131313] transition-colors"
            >
              Details
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


export default OrderCard;

