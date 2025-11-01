

const CategoriesTable = ({ 
  categories, 
  onAddSubcategory, 
  onEditCategory, 
  onDeleteCategory,
  onDeleteSubcategory,
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="space-y-3">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Subcategories
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <tr key={category._id} className="hover:bg-gray-50 transition-colors duration-150">
                  {/* Category Name */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                     
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {category.category}
                        </div>
                        <div className="text-xs text-gray-500">
                          {category.subCategories?.length || 0} subcategories
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Subcategories */}
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-md">
                      {category.subCategories?.slice(0, 5).map((subCategory) => (
                        <span 
                          key={subCategory._id}
                          className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {subCategory.name}
                        </span>
                      ))}
                      {category.subCategories?.length > 5 && (
                        <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                          +{category.subCategories.length - 5} more
                        </span>
                      )}
                      {(!category.subCategories || category.subCategories.length === 0) && (
                        <span className="text-xs text-gray-500 italic">No subcategories</span>
                      )}
                    </div>
                  </td>

                  {/* Image */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {category.image?.[0] ? (
                      <img 
                        src={category.image[0]} 
                        alt={category.category}
                        className="h-10 w-10 object-cover rounded-lg border border-gray-200"
                      />
                    ) : (
                      <div className="h-10 w-10 flex items-center justify-center rounded-lg border border-gray-200 bg-gray-100">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onAddSubcategory(category)}
                        className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 p-2 rounded-lg transition-colors duration-200"
                        aria-label="Add subcategory"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                      <button
                        onClick={() => onEditCategory(category)}
                        className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition-colors duration-200"
                        aria-label="Edit category"
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
                        onClick={() => onDeleteCategory(category)}
                        className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors duration-200"
                        aria-label="Delete category"
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
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  No categories found. Create your first category to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesTable;