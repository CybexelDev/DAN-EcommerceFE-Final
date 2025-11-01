import axios from 'axios';
// import api from './axiosInstence';
const BASE_URL = import.meta.env.VITE_BASE_URL;


export const getPopularProducts = async (fetchProductdata) => {
    try {
        const response = await axios.get(`${BASE_URL}admin/getProduct`);
        fetchProductdata(response.data);
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }       
}

export const addNewProduct = async (productData) => {
    try {
        const response = await axios.post(`${BASE_URL}admin/addProduct`, productData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }); 
        return response.data;
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
}

export const updateProduct = async (productId, updatedData) => {
    try {
        const response = await axios.put(`${BASE_URL}admin/product/${productId}`, updatedData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }); 
        return response.data;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
}

export const deleteProduct = async (productId) => {
    try {
        const response = await axios.delete(`${BASE_URL}admin/deleteProduct/${productId}`); 
        return response.data;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
}

export const getCategories = async (fetchCategoryData) => {
    try {
        const response = await axios.get(`${BASE_URL}admin/getCategory`);  
        fetchCategoryData(response.data);
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}

export const addCategory = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}admin/addCategory`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }); 
        return response.data;
    } catch (error) {
        console.error("Error adding category:", error);
        throw error;
    }
}

export const addSubcategory = async ( subcategoryData) => {
    try {
        const response = await axios.post(`${BASE_URL}admin/addSubCategory`, subcategoryData);
        return response.data;
    } catch (error) {
        console.error("Error adding subcategory:", error);
        throw error;
    }
}

export const editCategory = async (categoryId, updatedData) => {
    try {
        const response = await axios.put(`${BASE_URL}admin/updateCategory/${categoryId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error updating category:", error);
        throw error;
    }
}

export const deleteCategory = async (categoryId) => {
    try {
        const response = await axios.delete(`${BASE_URL}admin/deleteCategory/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting category:", error);
        throw error;
    }
}