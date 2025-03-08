import axiosInstance from './axiosInstance';

export const addToCart = (product) => {
  return (dispatch) => {
    axiosInstance.post(`/cart/addtocart/${product._id}`, product)
      .then((response) => response.data)
      .then((data) => dispatch({ type: 'ADD_TO_CART', payload: data }))
      .catch((error) => console.error(error));
  };
};

export const fetchCartProducts = async () => {
  try {
    const response = await axiosInstance.get('/cart/cartproducts', { withCredentials: true });
    console.log(response)
   return ({
    cart:response.data.user
   }
  )
  } catch (err) {
    console.error("Error fetching cart products from server ", err);
    throw err;
  }
}