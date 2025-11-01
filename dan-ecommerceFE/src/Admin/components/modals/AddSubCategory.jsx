import { useState } from 'react';
import { addSubcategory } from '../../Api/adminApi';

const AddSubcategoryModal = ({ isOpen, onClose, onSubcategoryAdded, category }) => {
    const [subcategoryName, setSubcategoryName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!subcategoryName.trim()) {
            setError('Subcategory name is required');
            return;
        }

        setIsLoading(true);

        try {
            const requestData = {
                categoryId: category._id,
                subCategories: [{ name: subcategoryName }] // Changed to match backend expectation
            };
            console.log(requestData, "request data>>>>>>>>>>>>");
            
            const response = await addSubcategory(requestData);
            if (response?.data) {
                if (onSubcategoryAdded) {
                    onSubcategoryAdded();
                }
                handleClose();
            }

        } catch (error) {
            console.error('Error adding subcategory:', error);
            setError(error.response?.data?.error || 'Failed to add subcategory');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setSubcategoryName('');
        setError('');
        onClose();
    };

    if (!isOpen || !category) return null;

    return (
        <div className="fixed inset-0 bg-black/70 bg-opacity-100 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">
                        Add Subcategory to {category.category}
                    </h2>
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
                                Subcategory Name *
                            </label>
                            <input
                                type="text"
                                value={subcategoryName}
                                onChange={(e) => setSubcategoryName(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${error ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Enter subcategory name"
                            />
                            {error && (
                                <p className="mt-1 text-sm text-red-600">{error}</p>
                            )}
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
                            {isLoading ? 'Adding...' : 'Add Subcategory'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSubcategoryModal;