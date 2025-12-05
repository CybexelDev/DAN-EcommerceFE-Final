import { useEffect, useState } from "react";
import BoardSection from "./BoardSection";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { dateBySale, getDashboardCount } from "../../Api/adminApi";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DashBoard() {
  const [totalItems, setTotalItems] = useState({
    products: 0,
    categories: 0,
    orders: 0,
    users: 0,
  });


    const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [orders, setOrders] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    getDashboardCount(setTotalItems).then(() => {
        console.log("Dashboard data fetched successfully");
    }).catch((err) => {
        console.error("Error fetching dashboard data:", err);
    }
  )
  }, []);

  // Colors for Pie Chart
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f"];

 
  // Prepare data for charts
  const chartData = [
    { name: "Products", value: totalItems.products },
    { name: "Categories", value: totalItems.categories },
    { name: "Orders", value: totalItems.orders },
    { name: "Users", value: totalItems.users },
  ];









  const fetchSales = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end date");
      return;
    }

    try {
      const response = await dateBySale(startDate, endDate);

      console.log(response, "response in dashboard??????????????????????");
      

      setOrders(response.data);
      setTotalSales(response.data.reduce((sum, order) => sum + order.totalAmount, 0));
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="w-full h-full mx-auto pt-10">
      <BoardSection totalItems={totalItems} />

      {/* Charts Section */}
      <div className="w-full mt-10 flex gap-8">
        {/* Bar Chart */}
        <div className="w-1/2 h-[50vh] bg-white shadow-custom-soft rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Overview Chart</h2>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="w-1/2 h-[50vh] bg-white shadow-custom-soft rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Distribution</h2>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>





<div className="p-5 max-w-[100%] mx-auto relative z-[1] mt-5 bg-white shadow-2xl rounded-2xl mb-16">

  {/* Header */}
  <h2 className="text-3xl font-bold mb-6 text-gray-800 drop-shadow-md">
     Date-wise Sales Report
  </h2>

  {/* Date Filter Card */}
  <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl p-6 rounded-2xl mb-8 relative z-[10]">
    <h3 className="text-lg font-semibold text-gray-500 mb-4">Filter Sales</h3>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* Start Date */}
      <div className="relative z-[9999]">
        <label className="text-sm text-gray-500 font-semibold">Start Date: </label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="w-full mt-1 p-3 border rounded-lg bg-white/20 text-gray-800 placeholder-gray-400"
          dateFormat="yyyy-MM-dd"
          popperClassName="z-[9999]"
          portalId="root"
        />
      </div>

      {/* End Date */}
      <div className="relative z-[9999]">
        <label className="text-sm text-gray-500 font-semibold">End Date: </label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          className="w-full mt-1 p-3 border rounded-lg bg-white/20 text-gray-800 placeholder-gray-400"
          dateFormat="yyyy-MM-dd"
          popperClassName="z-[9999]"
          portalId="root"
        />
      </div>

      {/* Button */}
      <div className="flex items-end">
        <button
          onClick={fetchSales}
          className="cursor-pointer w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-4 py-3 rounded-lg shadow-md hover:opacity-90 transition"
        >
          Apply Filter
        </button>
      </div>

    </div>
  </div>

  {/* Total Sales Card */}
  <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg p-5 rounded-2xl mb-6 relative z-[1]">
    <h3 className="text-xl text-blackfont-bold">
      Total Sales:
      <span className="ml-2 text-green-600">₹{totalSales.toLocaleString()}</span>
    </h3>
  </div>

  {/* Orders Table */}
  <div className="bg-white/10 backdrop-blur-md shadow-lg rounded-2xl overflow-hidden relative z-[1]">
    <table className="w-full">
      <thead className="bg-blue-500 text-white">
        <tr>
          <th className="p-3">Order ID</th>
          <th className="p-3">User</th>
          <th className="p-3">Products</th>
          <th className="p-3">Amount</th>
          <th className="p-3">Date</th>
        </tr>
      </thead>

      <tbody className="text-gray-500">
        {orders.length === 0 ? (
          <tr>
            <td colSpan="5" className="text-center p-6 text-gray-600">
              No orders found
            </td>
          </tr>
        ) : (
          orders.map((order) => (
            <tr key={order._id} className="bg-white/5 hover:bg-white/10 transition text-gray-600">
              <td className="p-3  break-all">{order._id}</td>
              <td className="p-3  break-all">{order.userId}</td>

              {/* PRODUCT NAME + QTY */}
              <td className="p-3">
                {order.products.map((item, idx) => (
                  <div key={idx} className="text-sm mb-1 text-gray-600">
                    <span className="font-semibold text-gray-600">{item.name}, </span>  
                    <span className="text-green-600 font-semibold"> qty: {item.quantity} </span>
                  </div>
                ))}
              </td>

              <td className="p-3  text-gray-600"><span className=" text-gray-600">₹{order.totalAmount} </span></td>

              <td className="p-3 text-gray-600">
                <span className=" text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>


    
    </div>
  );
}
