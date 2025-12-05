
import adminApi from '../axiosinstence/adminAxiosInstence';



export const getPopularProducts = async (fetchProductdata) => {
  try {
    const response = await adminApi.get(`admin/getProduct`);
    fetchProductdata(response.data);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export const addNewProduct = async (productData) => {
  try {
    const response = await adminApi.post(`admin/addProduct`, productData, {
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
    const response = await adminApi.put(`admin/product/${productId}`, updatedData, {
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
    const response = await adminApi.delete(`admin/deleteProduct/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

export const getCategories = async (fetchCategoryData) => {
  try {
    const response = await adminApi.get(`admin/getCategory`);
    fetchCategoryData(response.data);
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export const addCategory = async (formData) => {
  try {
    const response = await adminApi.post(`admin/addCategory`, formData, {
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

export const addSubcategory = async (subcategoryData) => {
  try {
    const response = await adminApi.post(`admin/addSubCategory`, subcategoryData);
    return response.data;
  } catch (error) {
    console.error("Error adding subcategory:", error);
    throw error;
  }
}

export const editCategory = async (categoryId, updatedData) => {
  try {
    const response = await adminApi.put(`admin/updateCategory/${categoryId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
}

export const deleteCategory = async (categoryId) => {
  try {
    const response = await adminApi.delete(`admin/deleteCategory/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
}


export const getHeader = async (fetchHeaderData) => {
  try {
    const response = await adminApi.get(`admin/header`);
    fetchHeaderData(response.data.data);
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export const addHeader = async (formData) => {
  try {
    const response = await adminApi.post(`admin/addHeader`,
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
    const response = await adminApi.delete(`admin/deleteHeader`, {
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
    const response = await adminApi.get(`admin/getOrders`);
    fetchOrderData(response.data.data);
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export const updateOrderStatus = async (orderId, orderStatus) => {
  try {
    const res = await adminApi.put(`admin/updateStatus`, {
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
    const response = await adminApi.get(`admin/getTestimonials`);
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
    const response = await adminApi.post(`admin/addTestimonial`,
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
    const response = await adminApi.delete(`admin/deleteTestimonial`, {
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
    const response = await adminApi.get(`admin/getUsers`);
    fetchUsersData(response.data.data);
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}


export const deleteUser = async (id) => {
  try {
    const response = await adminApi.delete(`admin/deleteUser`, {
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
    const response = await adminApi.get(`admin/dashboardCount`);
    fetchDashData(response.data.data);
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}


export const adminLogin = async (data) => {
  try {
    const response = await adminApi.post(`admin/login`, data);
    return response.data;
  } catch (error) {
    console.error("Error uploading header:", error);
    throw error;
  }
};

export const getSalesByDate = async (startDate, endDate) => {
  const adminToken = localStorage.getItem("adminToken");

  const response = await axios.get(`${BASE_URL}orders/sales`, {
    headers: { Authorization: `Bearer ${adminToken}` },
    params: { startDate, endDate }
  });

  return response.data;
};



// const response = await axios.get("http://localhost:3000/admin/sales", {
//     params: {
//       startDate: startDate.toISOString(),
//       endDate: endDate.toISOString(),
//     },
//   });

export const dateBySale = async (startDate, endDate) => {

  const response = await adminApi.get(`admin/sales`, {
    params: {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    },
    },);

  return response.data;
};