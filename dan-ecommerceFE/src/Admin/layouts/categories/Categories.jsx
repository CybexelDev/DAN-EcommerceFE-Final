"use client"

import { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "../../Api/adminApi"; 
import CategoriesTable from "../../components/tables/CategoryTable";
import Pagination from "../../components/pagination/Pagination";
import AddCategoryModal from "../../components/modals/AddCategory";
import AddSubcategoryModal from "../../components/modals/AddSubCategory";
import EditCategoryModal from "../../components/modals/EditCategory";
import DeleteConfirmationModal from "../../components/modals/DeleteCategory";

export default function Categories() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddSubcategoryModal, setShowAddSubcategoryModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false); 
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null); 
  const [deletingCategory, setDeletingCategory] = useState(null); // Simplified state

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      await getCategories(setCategoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Pagination calculations
  const totalItems = categoriesData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCategories = categoriesData.slice(startIndex, startIndex + itemsPerPage);

  const handleAddCategory = () => {
    setShowAddCategoryModal(true);
  };

  const handleAddSubcategory = (category) => {
    setSelectedCategory(category);
    setShowAddSubcategoryModal(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowEditCategoryModal(true);
  };

  const handleDeleteCategory = (category) => {
    setDeletingCategory(category);
    setShowDeleteModal(true);
  };

  // Remove handleDeleteSubcategory since we're only deleting main categories
  const handleConfirmDelete = async () => {
    if (!deletingCategory) return;

    try {
      // Call your delete API
      await deleteCategory(deletingCategory._id);
      
      // Refresh categories after deletion
      await fetchCategories();
      
      // Show success message
      console.log("Category deleted successfully");
      
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category. Please try again.");
    } finally {
      setShowDeleteModal(false);
      setDeletingCategory(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeletingCategory(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error && !isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-red-600 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-2">
            Manage product categories and subcategories
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4 sm:mt-0">
          <button
            onClick={handleAddCategory}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Category
          </button>
        </div>
      </div>

      {/* Categories Table */}
      <div className="mb-6">
        <CategoriesTable
          categories={currentCategories}
          onAddSubcategory={handleAddSubcategory}
          onEditCategory={handleEditCategory}
          onDeleteCategory={handleDeleteCategory}
          isLoading={isLoading}
        />
      </div>

      {/* Pagination */}
      {!isLoading && categoriesData.length > 0 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
          />
        </div>
      )}

      {/* Modals */}
      <AddCategoryModal
        isOpen={showAddCategoryModal}
        onClose={() => setShowAddCategoryModal(false)}
        onCategoryAdded={fetchCategories}
      />

      <AddSubcategoryModal
        isOpen={showAddSubcategoryModal}
        onClose={() => {
          setShowAddSubcategoryModal(false);
          setSelectedCategory(null);
        }}
        onSubcategoryAdded={fetchCategories}
        category={selectedCategory}
      />

      <EditCategoryModal
        isOpen={showEditCategoryModal}
        onClose={() => {
          setShowEditCategoryModal(false);
          setEditingCategory(null);
        }}
        onCategoryUpdated={fetchCategories}
        category={editingCategory}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        categoryName={deletingCategory?.category}
      />
    </div>
  );
}