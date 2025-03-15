import axiosInstance from './axiosInstance';

//fetching all products of cart
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

//add to cart
export const addToCart = async (product) => {
  try {
    const response = await axiosInstance.post(`/cart/addtocart/${product}`, { withCredentials: true })
    console.log(response)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add to cart")
  }
};

//remove from cart
export const removeFromCart = async (productId) => {
  try {
    const response = await axiosInstance.delete(`/cart/removefromcart/${productId}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to remove item from cart");
  }
};

//update quantity of product
export const updateQuantity = async (productId, operation) => {
  try {
    const response = await axiosInstance.put(`/cart/updatequantity/${productId}`, {
      params: { operation },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update quantity");
  }
};

