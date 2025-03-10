import axiosInstance from './axiosInstance';

export const addToCart = async (product) => {
  try {
    const response = await axiosInstance.post(`/cart/addtocart/${product}`, { withCredentials: true })
    console.log(response)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add to cart")
  }
};

export const removeFromCart = async (productId) => {
  try {
    const response = await axiosInstance.delete(`/cart/removefromcart/${productId}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to remove item from cart");
  }
};

export const updateQuantity = async (productId, operation) => {
  console.log("Update quantity " + operation +  " to " + productId )
    try {
    const response = await axiosInstance.put(`/cart/updatequantity/${productId}`, {
      params: { operation },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update quantity");
  }
}


export const fetchCartProducts = async () => {
  try {
    const response = await axiosInstance.get('/cart/cartproducts', { withCredentials: true });
    return ({
      cart: response.data.user
    }
    )
  } catch (err) {
    console.error("Error fetching cart products from server ", err);
    throw err;
  }
}