import React, { useState, useEffect } from "react";
import { UserPlus } from "lucide-react";
import UserTable from "../../components/tables/UserTable";
import { getUsers } from "../../Api/adminApi";

const Users = () => {
  const [users, setUsers] = useState([]);

  // ✅ Dummy user data
//   useEffect(() => {




//     const dummyData = [
//       {
//         _id: "68d6314e14b83cd19230dd18",
//         phone: "+919048098282",
//         isEmailVerified: false,
//         addresses: ["Chennai, Tamil Nadu"],
//         cart: ["Gold Ring", "Silver Chain", "Diamond Bracelet"],
//         createdAt: "2025-09-26T06:23:10.835+00:00",
//         updatedAt: "2025-11-03T06:08:09.651+00:00",
//       },
//       {
//         _id: "68c7c33bea2c350bb430b20d",
//         email: "ashifbashi@gmail.com",
//         isEmailVerified: false,
//         addresses: ["Bangalore, Karnataka", "Hyderabad, Telangana"],
//         cart: ["Pearl Necklace", "Platinum Band"],
//         createdAt: "2025-09-15T07:41:47.616+00:00",
//         updatedAt: "2025-11-07T05:43:12.748+00:00",
//       },
//     ];
//     setUsers(dummyData);
//   }, []);

useEffect(() => {
    getUsers(setUsers).then(() => {
        console.log("Users fetched successfully");

    }).catch((err) => {
        console.error("Error fetching users:", err);
    });
}, []);



  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-500">Manage registered users with email or phone login</p>
        </div>
      </div>

      {/* User Table Component */}
      <UserTable users={users} />
    </div>
  );
};

export default Users;
