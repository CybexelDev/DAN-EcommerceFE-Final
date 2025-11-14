import { useState } from 'react';
import { addCategory } from '../../Api/adminApi';


const AddCategoryModal = ({ isOpen, onClose, onCategoryAdded }) => {
    const [formData, setFormData] = useState({
        category: '',
        image: null
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({
            ...prev,
            image: file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.category.trim()) {
            setErrors({ category: 'Category name is required' });
            return;
        }

        setIsLoading(true);

        try {
            const response = await addCategory(formData);
            console.log(response, "response from add category api");
            
            if (response?.data) {
                // After successful addition
                if (onCategoryAdded) {
                    onCategoryAdded();
                }
                handleClose();

            } else {
                setErrors(prev => ({
                    ...prev,
                    submit: 'Failed to add category. Please try again.'
                }));
            }



            } catch (error) {
                console.error('Error adding category:', error);
                setErrors({ submit: 'Failed to add category' });
            } finally {
                setIsLoading(false);
            }
        };

        const handleClose = () => {
            setFormData({ category: '', image: null });
            setErrors({});
            onClose();
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black/70 bg-opacity-100 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900">Add New Category</h2>
                        <button
                            onClick={handleClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category Name *
                                </label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${errors.category ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter category name"
                                />
                                {errors.category && (
                                    <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isLoading ? 'Adding...' : 'Add Category'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    export default AddCategoryModal;