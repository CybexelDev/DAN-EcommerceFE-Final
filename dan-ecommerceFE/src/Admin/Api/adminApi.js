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


export const getHeader = async (fetchHeaderData) => {
    try {
        const response = await axios.get(`${BASE_URL}admin/header`);  
        fetchHeaderData(response.data.data);
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}

export const addHeader = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}admin/addHeader`, 
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading header:", error);
    throw error;
  }
};


export const deleteHeader = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}admin/deleteHeader`, {
      data: { id: id }, // ✅ send in `data` for DELETE requests
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error deleting header:", error);
  }
};

export const getOrder = async (fetchOrderData) => {
    try {
        const response = await axios.get(`${BASE_URL}admin/getOrders`);  
        fetchOrderData(response.data.data);
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}

export const updateOrderStatus = async (orderId, orderStatus) => {
  try {
    const res = await axios.put(`${BASE_URL}admin/updateStatus`, {
      orderId,
      orderStatus,
    });
    return res.data;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

export const getTestimaonials = async (fetchTestimonialData) => {
    try {
        const response = await axios.get(`${BASE_URL}admin/getTestimonials`);  
        fetchTestimonialData(response.data.data);
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}

export const addTestimonial = async (newTestimonial) => {
  try {
    const formData = new FormData();
    formData.append("name", newTestimonial.name);
    formData.append("message", newTestimonial.message);
    formData.append("starRating", newTestimonial.starRating);
    formData.append("image", newTestimonial.image);
    const response = await axios.post(`${BASE_URL}admin/addTestimonial`, 
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading header:", error);
    throw error;
  }
};


export const deleteTestimonial = async (testimonialId) => {
  try {
    const response = await axios.delete(`${BASE_URL}admin/deleteTestimonial`, {
      data: { testimonialId: testimonialId }, 
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error deleting header:", error);
  }
};


export const getUsers = async (fetchUsersData) => {
    try {
        const response = await axios.get(`${BASE_URL}admin/getUsers`);  
        fetchUsersData(response.data.data);
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}


export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}admin/deleteUser`, {
      data: { id: id }, 
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error deleting User:", error);
  }
};


export const getDashboardCount = async (fetchDashData) => {
    try {
        const response = await axios.get(`${BASE_URL}admin/dashboardCount`);  
        fetchDashData(response.data.data);
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}


export const adminLogin = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}admin/login`, data);
    return response.data;
  } catch (error) {
    console.error("Error uploading header:", error);
    throw error;
  }
};