import axios from 'axios';
// import api from './axiosInstence';
const BASE_URL = import.meta.env.VITE_BASE_URL;



export const getCategorys = async (fetchcategorydata) => {
  try {
    const response = await axios.get(`${BASE_URL}users/getcategory`);
    fetchcategorydata(response.data);
  } catch (error) {
    console.error("Error fetching categorys:", error);
    throw error;
  }
}


export const getpopulearProducts = async (fetchProductdata) => {
  try {
    const response = await axios.get(`${BASE_URL}users/getPopular`);
    fetchProductdata(response.data.data);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}


// export const getProducts = async (fetchProductdata) => {
//     try {
//         const response = await axios.get(`${BASE_URL}users/getProduct`);
//         fetchProductdata(response.data);
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         throw error;
//     }       
// }

export const getcategory = async (fetchProductdata) => {
  try {
    const response = await axios.get(`${BASE_URL}users/getCategory`);
    fetchProductdata(response.data);
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
}

export const getCategorybasedProduct = async (id) => {
  try {
    // console.log(id, "idddddddddddddddddddddd");

    const response = await axios.get(`${BASE_URL}users/getCategoryProduct`, { params: { id: id } });

    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
}


export const getSingleProduct = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}users/getSingleProduct`, {
      params: { productId: id },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};


export const getRelatedProduct = async (categoryId) => {
  try {
    const response = await axios.get(`${BASE_URL}users/getRelatedProduct`, {
      params: { id: categoryId },
    });
    console.log(response.data, "related product data>>>>>>>>>>>>");

    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};



export const getCart = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}users/getCart`, {
      params: { userId: userId },
    });

    console.log(response.data, "cart data >>>>>>>>>");
    return response.data.cart;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};


export const addCart = async (userId, productId, quantity) => {
  try {
    const response = await axios.post(`${BASE_URL}users/addCart`, {
      userId,
      productId,
      quantity
    });

    console.log(response.data, "cart add response >>>>>>>>>");
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const getHeader = async () => {
  try {
    const response = await axios.get(`${BASE_URL}users/header`);
    return response.data; // { message, data }
  } catch (error) {
    console.error("Error fetching header:", error);
    throw error;
  }
};


export const getBlogs = async () => {
  try {
    const res = await axios.get(`${BASE_URL}users/getBlogs`);
    return res.data; // returns { message, data }

  } catch (error) {
    res.status(500).json(error)
  }

};


export const mobilLogin = async (mobile) => {
  try {
    const res = await axios.post(`${BASE_URL}auth/send-otp`, { phone: mobile });
    return res.data; // returns { message, data }

  } catch (error) {
    console.error("Error in mobile login:", error);
    throw error;
  }
}

export const verifyMobilLogin = async (mobile, otp) => {
  try {
    const res = await axios.post(`${BASE_URL}auth/verify-otp`, { phone: mobile, otp: otp });
    console.log(res.data, "number login response");

    if (res.data.message && res.data.token) {
      localStorage.setItem('accessToken', res.data.token);
      localStorage.setItem('userName', res.data.user.phone);
      localStorage.setItem('userId', res.data.user._id);
      return res.data;

    } else {
      return false
    }

  } catch (error) {
    console.error("Error in mobile login:", error);
    throw error;
  }
}

export const emailLogin = async (email) => {
  try {
    const res = await axios.post(`${BASE_URL}auth/sendEmailOtp`, { email: email });

  } catch (error) {
    console.error("Error in email login:", error);
    throw error;
  }
}


export const verifyEmailLogin = async (email, otp) => {
  try {
    const res = await axios.post(`${BASE_URL}auth/verifyEmailOtp`, { email: email, otp: otp });

    console.log(res.data, "email login response >>>>>>777777");

    if (res.data.message && res.data.token) {
      localStorage.setItem('accessToken', res.data.token);
      localStorage.setItem('userName', res.data.user.email);
      localStorage.setItem('userId', res.data.user.id);
      return res.data;

    } else {
      return false
    }

  } catch (error) {
    console.error("Error in email login:", error);
    throw error;
  }
}



export const getTestimaonial = async (fetchTestimaonial) => {
  try {
    const res = await axios.get(`${BASE_URL}users/getTestimonials`);
    fetchTestimaonial(res.data.data);
  } catch (error) {
    res.status(500).json(error)
  }

};


export const getBrand = async (fetchBrand) => {
  try {
    const res = await axios.get(`${BASE_URL}users/getBrand`);
    fetchBrand(res.data.data);
  } catch (error) {
    res.status(500).json(error)
  }

};


export const removeCart = async (productId, userId) => {
  console.log(userId, productId, "remove cart api >>>>>>>");

  try {
    const res = await axios.delete(`${BASE_URL}users/removeCart`, {
      data: { productId, userId },
    });

    return res.data;
  } catch (error) {
    console.error("Error in removeCart:", error);
    throw error;
  }
};


export const getSearch = async (query) => {
  try {
    const res = await axios.get(`${BASE_URL}users/search`, {
      params: { query },
    });
    console.log(res.data?.results, "search data >>>>>>>");

    return res.data?.results
  } catch (error) {
    res.status(500).json(error)
  }
};


export const getSummery = async (userId) => {
  try {
    const res = await axios.get(`${BASE_URL}users/summary/${userId}`);

    return res.data
  } catch (error) {
    res.status(500).json(error)
  }
};


export const applayVoucher = async (code, tottelAmmount) => {
  try {
    const response = await axios.post(`${BASE_URL}users/applyVoucher`, {
      code: code,
      cartTotal: tottelAmmount
    });

    console.log(response.data, "applay voucher  response >>>>>>>>>");
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};



export const updateQuantity = async (userId, id, newQty) => {
  try {
    const response = await axios.put(`${BASE_URL}users/cartUpdateQty`, {
      userId: userId,
      productId: id,
      quantity: newQty
    });
    console.log(response.data, "cart product qty update  response >>>>>>>>>");
    return response.data;
  } catch (error) {
    console.error("cart product qty update error:", error);
    throw error;
  }
};



export const addAddress = async (userId, formData) => {
  try {
    const response = await axios.post(`${BASE_URL}users/addAddress`, {
      userId,
      address: formData,
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error adding address:", error.response?.data || error.message);
    throw error;
  }
};


export const getAddress = async (userId) => {
  try {
    const res = await axios.get(`${BASE_URL}users/getAddresses`, {
      params: { userId }, // ✅ sends ?userId=68b2927106e5c87d02b7d48a
    });
    console.log("User addresses:", res.data);
    return res.data
  } catch (error) {
    res.status(500).json(error)
  }
};


export const deleteAddress = async (userId, addressId) => {
  const response = await axios.post(`${BASE_URL}users/deleteAddress`, {
    userId,
    addressId,
  });
  return response.data;
};


export const checkoutSession = async (body) => {

  try {
    const response = await axios.post(`${BASE_URL}users/create-checkout-session`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
    return response;
  } catch (error) {
    console.error("Error creating checkout session:", error);
  }

}


export const getOrders = async (userId) => {
  try {
    const res = await axios.get(`${BASE_URL}users/getUserOrder/${userId}`);
    return res.data;
  }
  catch (error) {
    res.status(500).json(error)
  }
};


export const getCategoryPopularProduct = async (categoryId) => {
  try {
    const response = await axios.get(`${BASE_URL}users/getCategoryPopularProduct`, {
      categoryId,
    });
    return response.data;
  } catch (error) {
    logger.error("Error fetching category popular product:", error);
    console.log(error);
  }
};