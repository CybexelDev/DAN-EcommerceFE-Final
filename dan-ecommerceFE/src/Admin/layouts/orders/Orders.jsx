import { useState, useEffect } from "react";
import { getOrder, updateOrderStatus } from "../../Api/adminApi";

// Test data generator
const generateTestOrders = (num = 25) => {
    const statuses = ["pending", "processing", "shipped", "delivered"];
    const paymentStatuses = ["pending", "paid", "failed"];
    const productsList = [
        { name: "Product A", price: 50 },
        { name: "Product B", price: 30 },
        { name: "Product C", price: 20 },
    ];

    return Array.from({ length: num }, (_, i) => ({
        _id: `order-${i + 1}`,
        userId: `user-${i + 1}`,
        products: productsList.map((p, idx) => ({
            productId: `p-${i}-${idx}`,
            name: p.name,
            price: p.price,
            quantity: Math.floor(Math.random() * 5) + 1,
        })),
        totalAmount: Math.floor(Math.random() * 500) + 50,
        paymentStatus: paymentStatuses[Math.floor(Math.random() * 3)],
        orderStatus: statuses[Math.floor(Math.random() * 4)],
    }));
};

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;

    console.log(orders, "ooooooooooooooooooooooo");


    //   useEffect(() => {
    //     setOrders(generateTestOrders());
    //   }, []);

    useEffect(() => {

        getOrder(setOrders);

    }, []);

    const filteredOrders = orders.filter(
        (o) =>
            o._id.toLowerCase().includes(search.toLowerCase()) ||
            o.userId.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLast = currentPage * ordersPerPage;
    const indexOfFirst = indexOfLast - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    const handleStatusChange = (orderId, newStatus) => {
        setOrders((prev) =>
            prev.map((o) =>
                o._id === orderId ? { ...o, orderStatus: newStatus } : o
            )
        );
      
        const updateStatus = async () => {
            try {
                await updateOrderStatus(orderId, newStatus);
                getOrder(setOrders);
            } catch (error) {
                console.error("Failed to update order status:", error);
            }
        };
        updateStatus();

        
    };

    return (
        <div className="p-6 bg-white from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white font-sans">
            <h2 className="text-3xl font-bold mb-6 text-black drop-shadow-lg">
                Orders Dashboard
            </h2>

            {/* Search input */}
            <input
                type="text"
                placeholder="Search by Order ID or User ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-1/3 px-4 py-2 mb-6 rounded-lg bg-white text-black placeholder-gray-400 border border-gray-400 focus:ring-2 focus:ring-gray-400 focus:outline-none transition duration-300"
            />

           
<div className="overflow-x-auto bg-gradient-to-br from-white via-blue-50 to-indigo-50 shadow-xl rounded-3xl border border-blue-100 p-4">
  <table className="min-w-full border-separate border-spacing-y-2">
    <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm uppercase tracking-wide rounded-lg">
      <tr>
        <th className="px-4 py-3 text-left rounded-l-lg">Order ID</th>
        <th className="px-4 py-3 text-left">User ID</th>
        <th className="px-4 py-3 text-left">Address</th>
        <th className="px-4 py-3 text-left">Products</th>
        <th className="px-4 py-3 text-center">Total</th>
        <th className="px-4 py-3 text-center">Payment</th>
        <th className="px-4 py-3 text-center">Status</th>
        <th className="px-4 py-3 text-center rounded-r-lg">Update</th>
      </tr>
    </thead>
    <tbody>
      {currentOrders.map((order, idx) => (
        <tr
          key={order._id}
          className={`transition-all duration-300 hover:scale-[1.01] hover:shadow-md bg-white/70 backdrop-blur-lg border border-gray-100 rounded-xl ${
            idx % 2 === 0 ? "bg-white/80" : "bg-blue-50/50"
          }`}
        >
          {/* Order ID */}
          <td className="px-4 py-3 text-gray-700 font-mono text-xs max-w-[110px] break-all">
            #{order._id.slice(-6)}
          </td>

          {/* User ID */}
          <td className="px-4 py-3 text-gray-700 text-xs font-mono max-w-[110px] break-all">
            {order.userId.slice(-6)}
          </td>

          {/* Address */}
          <td className="px-4 py-3 text-gray-700 text-sm">
            <div className="leading-snug space-y-0.5">
              <p className="font-semibold text-gray-900">{order?.address[0]?.fullName}</p>
              <p className="text-xs text-gray-500">📞 {order?.address[0]?.phoneNumber}</p>
              <p className="text-xs">{order?.address[0]?.area}, {order?.address[0]?.city}</p>
              <p className="text-xs text-gray-500">📮 {order?.address[0]?.pincode}</p>
              {order?.address[0]?.landmark && (
                <p className="text-xs italic text-gray-400">🏠 {order?.address[0]?.landmark}</p>
              )}
            </div>
          </td>

          {/* Products */}
          <td className="px-4 py-3 text-sm text-gray-700">
            <div className="flex flex-col gap-1">
              {order.products.map((p, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-gray-800">{p.name}</span>
                  <span className="text-gray-500 text-xs">x{p.quantity}</span>
                </div>
              ))}
            </div>
          </td>

          {/* Total */}
          <td className="px-4 py-3 text-center font-semibold text-green-600 text-sm">
            ${order.totalAmount}
          </td>

          {/* Payment Status */}
          <td className="px-4 py-3 text-center">
            <span
              className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide ${
                order.paymentStatus === "paid"
                  ? "bg-green-100 text-green-700"
                  : order.paymentStatus === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {order.paymentStatus}
            </span>
          </td>

          {/* Order Status */}
          <td className="px-4 py-3 text-center font-medium">
            <span
              className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide ${
                order.orderStatus === "pending"
                  ? "bg-amber-100 text-amber-700"
                  : order.orderStatus === "processing"
                  ? "bg-blue-100 text-blue-700"
                  : order.orderStatus === "shipped"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {order.orderStatus}
            </span>
          </td>

          {/* Update Status */}
          <td className="px-4 py-3 text-center">
            <select
              value={order.orderStatus}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
              className="px-3 py-1.5 bg-white border border-blue-200 rounded-full text-blue-700 text-sm font-medium focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200 hover:border-blue-400"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


            {/* Pagination */}
            <div className="flex justify-center mt-6 gap-2">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-b-blue-500 rounded-lg text-blue-500 hover:bg-blue-500 hover:text-white disabled:opacity-50 transition duration-300"
                >
                    Prev
                </button>
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 border rounded-lg transition duration-300 ${currentPage === i + 1
                                ? "bg-blue-500 text-white"
                                : "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-blue-500 rounded-lg text-blue-500 hover:bg-blue-500 hover:text-white disabled:opacity-50 transition duration-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Orders;
