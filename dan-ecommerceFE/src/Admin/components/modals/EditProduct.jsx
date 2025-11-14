import { useState, useEffect } from 'react';
import { updateProduct, getCategories } from '../../Api/adminApi';

const EditProductModal = ({ isOpen, onClose, onProductUpdated, product }) => {
    const [formData, setFormData] = useState({
        brandName: '',
        productName: '',
        subTitle: '',
        starRating: '',
        rate: '',
        discount: '',
        quantity: '',
        description: '',
        category: '',
        subCategory: '',
        categoryId: '',
        subCategoryId: '',
    });

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);

    // Initialize form when product changes
    useEffect(() => {
        if (product) {
            setFormData({
                brandName: product.brandName || '',
                productName: product.productName || '',
                subTitle: product.subTitle || '',
                starRating: product.starRating || '',
                rate: product.rate || '',
                discount: product.discount || '',
                quantity: product.quantity || '',
                description: product.description || '',
                category: product.category || '',
                subCategory: product.subCategory || '',
                categoryId: product.categoryId || '',
                subCategoryId: product.subCategoryId || '',
            });
            setImages([]); // Reset images for edit
        }
    }, [product]);

    // Fetch categories on modal open
    useEffect(() => {
        if (isOpen) {
            fetchCategories();
        }
    }, [isOpen]);

    const fetchCategories = async () => {
        try {
            setIsLoadingCategories(true);
            await getCategories(setCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setErrors(prev => ({
                ...prev,
                categories: 'Failed to load categories'
            }));
        } finally {
            setIsLoadingCategories(false);
        }
    };

    // Update subcategories when category changes
    useEffect(() => {
        if (formData.category) {
            const selectedCategory = categories.find(cat => cat.category === formData.category);
            setSubCategories(selectedCategory?.subCategories || []);
        }
    }, [formData.category, categories]);

    const validateForm = () => {
        const newErrors = {};

        // Required fields validation
        if (!formData.brandName.trim()) newErrors.brandName = 'Brand name is required';
        if (!formData.productName.trim()) newErrors.productName = 'Product name is required';
        if (!formData.subTitle.trim()) newErrors.subTitle = 'Subtitle is required';
        if (!formData.rate) newErrors.rate = 'Price is required';
        if (!formData.quantity) newErrors.quantity = 'Quantity is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.category.trim()) newErrors.category = 'Category is required';

        // Numeric validation
        if (formData.starRating && (formData.starRating < 0 || formData.starRating > 5)) {
            newErrors.starRating = 'Star rating must be between 0 and 5';
        }
        if (formData.rate && formData.rate < 0) newErrors.rate = 'Price must be positive';
        if (formData.discount && (formData.discount < 0 || formData.discount > 100)) {
            newErrors.discount = 'Discount must be between 0 and 100';
        }
        if (formData.quantity && formData.quantity < 0) newErrors.quantity = 'Quantity must be positive';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        // Validate file types
        const validFiles = files.filter(file =>
            file.type.startsWith('image/')
        );

        if (validFiles.length !== files.length) {
            setErrors(prev => ({
                ...prev,
                images: 'Please select only image files'
            }));
            return;
        }

        // Validate file size (max 5MB per file)
        const sizeValidFiles = validFiles.filter(file =>
            file.size <= 5 * 1024 * 1024
        );

        if (sizeValidFiles.length !== validFiles.length) {
            setErrors(prev => ({
                ...prev,
                images: 'File size should be less than 5MB'
            }));
            return;
        }

        setImages(prev => [...prev, ...sizeValidFiles].slice(0, 5));

        // Clear image error
        if (errors.images) {
            setErrors(prev => ({
                ...prev,
                images: ''
            }));
        }
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const submitData = new FormData();

            // Append form data including IDs
            Object.keys(formData).forEach(key => {
                if (formData[key]) {
                    submitData.append(key, formData[key]);
                }
            });

            // Append images if new ones are added
            images.forEach(image => {
                submitData.append('images', image);
            });
            

            const response = await updateProduct(product._id,submitData);
            
            
            if (response?.data) {
                // Call the callback function to update products
                if (onProductUpdated) {
                    onProductUpdated(response.data);
                }
                
                // Close modal and reset form
                handleClose();
            }
        } catch (error) {
            console.error('Error updating product:', error);
            setErrors(prev => ({
                ...prev,
                submit: 'Failed to update product. Please try again.'
            }));
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setFormData({
            brandName: '',
            productName: '',
            subTitle: '',
            starRating: '',
            rate: '',
            discount: '',
            quantity: '',
            description: '',
            category: '',
            subCategory: '',
            categoryId: '',
            subCategoryId: '',
        });
        setImages([]);
        setErrors({});
        setSubCategories([]);
        onClose();
    };

    if (!isOpen || !product) return null;

    return (
        <div className="fixed inset-0 bg-black/70 bg-opacity-100 flex items-center justify-center p-4 z-50 ">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto no-scrollbar">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Edit Product</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    {errors.submit && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700 text-sm">{errors.submit}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column - Same as AddProductModal */}
                        <div className="space-y-6">
                            {/* Brand Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Brand Name *
                                </label>
                                <input
                                    type="text"
                                    name="brandName"
                                    value={formData.brandName}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors.brandName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter brand name"
                                />
                                {errors.brandName && (
                                    <p className="mt-1 text-sm text-red-600">{errors.brandName}</p>
                                )}
                            </div>

                            {/* Product Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Product Name *
                                </label>
                                <input
                                    type="text"
                                    name="productName"
                                    value={formData.productName}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors.productName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter product name"
                                />
                                {errors.productName && (
                                    <p className="mt-1 text-sm text-red-600">{errors.productName}</p>
                                )}
                            </div>

                            {/* Sub Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Sub Title *
                                </label>
                                <input
                                    type="text"
                                    name="subTitle"
                                    value={formData.subTitle}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors.subTitle ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter product subtitle"
                                />
                                {errors.subTitle && (
                                    <p className="mt-1 text-sm text-red-600">{errors.subTitle}</p>
                                )}
                            </div>

                            {/* Star Rating */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Star Rating (0-5) *
                                </label>
                                <input
                                    type="number"
                                    name="starRating"
                                    value={formData.starRating}
                                    onChange={handleInputChange}
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors.starRating ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="4.5"
                                />
                                {errors.starRating && (
                                    <p className="mt-1 text-sm text-red-600">{errors.starRating}</p>
                                )}
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price ($) *
                                </label>
                                <input
                                    type="number"
                                    name="rate"
                                    value={formData.rate}
                                    onChange={handleInputChange}
                                    min="0"
                                    step="0.01"
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors.rate ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="99.99"
                                />
                                {errors.rate && (
                                    <p className="mt-1 text-sm text-red-600">{errors.rate}</p>
                                )}
                            </div>

                            {/* Discount */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Discount (%)
                                </label>
                                <input
                                    type="number"
                                    name="discount"
                                    value={formData.discount}
                                    onChange={handleInputChange}
                                    min="0"
                                    max="100"
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors.discount ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="10"
                                />
                                {errors.discount && (
                                    <p className="mt-1 text-sm text-red-600">{errors.discount}</p>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Same as AddProductModal */}
                        <div className="space-y-6">
                            {/* Quantity */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Quantity *
                                </label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleInputChange}
                                    min="0"
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors.quantity ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="100"
                                />
                                {errors.quantity && (
                                    <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
                                )}
                            </div>

                            {/* Category Dropdown */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category *
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors.category ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                >
                                    <option value="">Select a category</option>
                                    {isLoadingCategories ? (
                                        <option disabled>Loading categories...</option>
                                    ) : (
                                        categories.map((category) => (
                                            <option key={category._id} value={category.category}>
                                                {category.category}
                                            </option>
                                        ))
                                    )}
                                </select>
                                {errors.category && (
                                    <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                                )}
                            </div>

                            {/* Sub Category Dropdown */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Sub Category
                                </label>
                                <select
                                    name="subCategory"
                                    value={formData.subCategory}
                                    onChange={handleInputChange}
                                    disabled={!formData.category || subCategories.length === 0}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                                >
                                    <option value="">
                                        {!formData.category 
                                            ? 'Select a category first' 
                                            : subCategories.length === 0 
                                                ? 'No subcategories available'
                                                : 'Select a subcategory'
                                        }
                                    </option>
                                    {subCategories.map((subCategory) => (
                                        <option key={subCategory._id} value={subCategory.name}>
                                            {subCategory.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Current Images */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Current Images
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {product.images?.map((image, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={image}
                                                alt={`Product ${index + 1}`}
                                                className="h-20 w-full object-cover rounded-lg"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Add New Images */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Add New Images (Optional)
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        id="edit-image-upload"
                                    />
                                    <label
                                        htmlFor="edit-image-upload"
                                        className="cursor-pointer block"
                                    >
                                        <svg className="mx-auto h-8 w-8 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className="mt-2 block text-sm font-medium text-gray-900">
                                            Add new images
                                        </span>
                                        <span className="block text-xs text-gray-500">
                                            PNG, JPG, GIF up to 5MB each
                                        </span>
                                    </label>
                                </div>
                                {errors.images && (
                                    <p className="mt-1 text-sm text-red-600">{errors.images}</p>
                                )}

                                {/* New Image Previews */}
                                {images.length > 0 && (
                                    <div className="mt-4">
                                        <p className="text-sm font-medium text-gray-700 mb-2">New Images:</p>
                                        <div className="grid grid-cols-3 gap-2">
                                            {images.map((image, index) => (
                                                <div key={index} className="relative">
                                                    <img
                                                        src={URL.createObjectURL(image)}
                                                        alt={`New preview ${index + 1}`}
                                                        className="h-20 w-full object-cover rounded-lg"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index)}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Description - Full Width */}
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="4"
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors.description ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Enter product description..."
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                        )}
                    </div>

                    {/* Footer Buttons */}
                    <div className="mt-8 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Updating...
                                </>
                            ) : (
                                'Update Product'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;