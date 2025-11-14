"use client"

import { useState, useEffect } from 'react';
import { editCategory } from '../../Api/adminApi';

const EditCategoryModal = ({ isOpen, onClose, onCategoryUpdated, category }) => {
    const [categoryName, setCategoryName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (category) {
            setCategoryName(category.category || '');
        }
    }, [category]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!categoryName.trim()) {
            setError('Category name is required');
            return;
        }

        if (categoryName.trim() === category.category) {
            setError('Category name is unchanged');
            return;
        }

        setIsLoading(true);

        try {
            const response = await editCategory(category._id, { category: categoryName });
            if (response?.data) {
                if (onCategoryUpdated) {
                    onCategoryUpdated();
                }
                handleClose();
            }
        } catch (error) {
            console.error('Error updating category:', error);
            setError(error.response?.data?.error || 'Failed to update category');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setCategoryName('');
        setError('');
        onClose();
    };

    if (!isOpen || !category) return null;

    return (
        <div className="fixed inset-0 bg-black/70 bg-opacity-100 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">
                        Edit Category
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
                                Category Name *
                            </label>
                            <input
                                type="text"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${error ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Enter category name"
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
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                        >
                            {isLoading ? 'Updating...' : 'Update Category'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCategoryModal;