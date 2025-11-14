import { useState, useEffect } from "react";
import ProductTable from "../../components/tables/ProductTable";
import { deleteProduct, getPopularProducts } from "../../Api/adminApi";
import Pagination from "../../components/pagination/Pagination";
import AddProductModal from "../../components/modals/AddProduct";
import EditProductModal from "../../components/modals/EditProduct";
import DeleteConfirmationModal from "../../components/modals/DeleteProduct";
import { toast } from "react-hot-toast";

export default function Products() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popularProducts, setPopularProducts] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      await getPopularProducts(setPopularProducts);
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductAdded = (newProduct) => {
    setPopularProducts(prev => [newProduct, ...prev]);
    setCurrentPage(1);
    setShowAddProductModal(false);
  };

  const handleProductUpdated = (updatedProduct) => {
    setPopularProducts(prev =>
      prev.map(product =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
    setShowEditProductModal(false);
    setEditingProduct(null);
    setCurrentPage(1);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowEditProductModal(true);
  };

  const handleDeleteClick = (product) => {
    setDeletingProduct(product);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingProduct) return;

    try {

      console.log("Deleting product with ID:", deletingProduct._id);
      
      // Call delete API
      await deleteProduct(deletingProduct._id);
      
      // Remove product from state
      setPopularProducts(prev => prev.filter(product => product._id !== deletingProduct._id));
      
      // Show success message (you can add a toast here)
      console.log("Product deleted successfully");
      
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product. Please try again.");
    } finally {
      // Close modal and reset state
      setShowDeleteModal(false);
      setDeletingProduct(null);
      
      // Reset to first page if the current page becomes empty
      const remainingProducts = popularProducts.filter(p => p._id !== deletingProduct._id);
      const totalPagesAfterDelete = Math.ceil(remainingProducts.length / productsPerPage);
      if (currentPage > totalPagesAfterDelete) {
        setCurrentPage(Math.max(1, totalPagesAfterDelete));
      }
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeletingProduct(null);
  };

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = popularProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(popularProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-lg text-gray-600">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-2">
            Manage your product inventory and listings
          </p>
        </div>

        {/* Add Product Button */}
        <button
          onClick={() => setShowAddProductModal(true)}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg
            shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </button>
      </div>

      {/* Product Table */}
      <ProductTable
        products={currentProducts}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteClick}
      />

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={showAddProductModal}
        onClose={() => setShowAddProductModal(false)}
        onProductAdded={handleProductAdded}
      />

      {/* Edit Product Modal */}
      <EditProductModal
        isOpen={showEditProductModal}
        onClose={() => {
          setShowEditProductModal(false);
          setEditingProduct(null);
        }}
        onProductUpdated={handleProductUpdated}
        product={editingProduct}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        itemName={deletingProduct?.productName}
        itemType="product"
      />

      {/* Pagination */}
      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={popularProducts.length}
          itemsPerPage={productsPerPage}
        />
      </div>
    </div>
  );
}