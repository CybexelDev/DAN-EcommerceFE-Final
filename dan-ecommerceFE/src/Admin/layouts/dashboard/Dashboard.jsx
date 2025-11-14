import { useEffect, useState } from "react";
import BoardSection from "./BoardSection";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

export default function DashBoard() {
  const [totalItems, setTotalItems] = useState({
    products: 0,
    categories: 0,
    enquiries: 0,
    users: 0,
  });

  // Colors for Pie Chart
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f"];

 
  // Prepare data for charts
  const chartData = [
    { name: "Products", value: totalItems.products },
    { name: "Categories", value: totalItems.categories },
    { name: "Enquiries", value: totalItems.enquiries },
    { name: "Users", value: totalItems.users },
  ];

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

    
    </div>
  );
}
