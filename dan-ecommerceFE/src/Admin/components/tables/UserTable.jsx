import React, { useState } from "react";
import { Trash2, UsersRound  } from "lucide-react";
import { deleteUser } from "../../Api/adminApi";

const UserTable = ({ users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // You can change this if needed

  const handleDelete = (id) => {
    console.log("Delete user:", id);
    deleteUser(id)
      .then(() => {
        alert("User deleted successfully");
        // Optionally, you can refresh the user list here
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
        alert("Failed to delete user");
      });
  };

  // Pagination logic
  const totalPages = Math.ceil(users.length / itemsPerPage) || 1;
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl border border-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 tracking-tight flex gap-2">
          <UsersRound /> User List
        </h2>
        <span className="text-sm text-gray-500">
          Total Users: {users.length}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-inner">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100/70 text-gray-700 text-sm uppercase tracking-wide">
              <th className="py-3 px-4 text-left font-semibold">#</th>
              <th className="py-3 px-4 text-left font-semibold">User ID</th>
              <th className="py-3 px-4 text-left font-semibold">Login Type</th>
              <th className="py-3 px-4 text-left font-semibold">Contact</th>
              <th className="py-3 px-4 text-left font-semibold">Cart Items</th>
              <th className="py-3 px-4 text-left font-semibold">Created</th>
              <th className="py-3 px-4 text-left font-semibold">Updated</th>
              <th className="py-3 px-4 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-100 hover:bg-blue-50/40 transition-all duration-300"
                >
                  <td className="py-3 px-4 text-gray-700">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="py-3 px-4 text-gray-800 font-medium">
                    {user._id}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.email
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {user.email ? "Email" : "Phone"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700 font-medium">
                    {user.email || user.phone}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {user.cart?.length || 0} item(s)
                  </td>
                  <td className="py-3 px-4 text-gray-500 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-gray-500 text-sm">
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="flex items-center gap-1 bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition-all duration-300"
                    >
                      <Trash2 size={16} />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-8 text-gray-400 text-lg"
                >
                  No users found 😕
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex mt-6 space-x-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md text-sm font-medium transition ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-600 hover:bg-blue-50"
          }`}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-blue-50"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md text-sm font-medium transition ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-600 hover:bg-blue-50"
          }`}
        >
          Next
        </button>
      </div>

       <div className="flex justify-end mt-[-10px] text-gray-500 text-sm">
        Showing {indexOfFirstUser + 1}–
        {Math.min(indexOfLastUser, users.length)} of {users.length} users
      </div>
    </div>
  );
};

export default UserTable;
