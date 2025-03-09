import React, { useEffect, useState } from 'react';
import { fetchCartProductsThunk } from '../../app/features/cart/cartThunk';
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    console.log('Cart component mounted');
    fetchCartProducts();
  }, []);

  const fetchCartProducts = async () => {
    try {
      const response = await dispatch(fetchCartProductsThunk());
      console.log('Cart data fetched:', response);
      console.log(cart.image);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const handleIncrement = (productId) => {
    setQuantity(quantity + 1);
    const updatedCart = updateCartQuantity(cart.cart, productId, quantity + 1);
    const grandTotal = updateGrandTotal(updatedCart);
    // Update the cart and grand total in the state
    // For simplicity, we will just log the updated cart and grand total
    console.log(updatedCart);
    console.log(grandTotal);
  };

  const handleDecrement = (productId) => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      const updatedCart = updateCartQuantity(cart.cart, productId, quantity - 1);
      const grandTotal = updateGrandTotal(updatedCart);
      // Update the cart and grand total in the state
      // For simplicity, we will just log the updated cart and grand total
      console.log(updatedCart);
      console.log(grandTotal);
    }
  };

  const updateCartQuantity = (cartItems, productId, newQuantity) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === productId) {
        return { ...cartItem, tempQuantity: newQuantity };
      }
      return cartItem;
    });
    return updatedCartItems;
  };

  const updateGrandTotal = (updatedCart) => {
    const grandTotal = updatedCart.reduce((acc, item) => acc + (item.price - (item.price * (item.discount / 100))) * (item.tempQuantity || 1), 0);
    return grandTotal;
  };

  return (
    <div className='m-10 p-5 bg-gray-100 rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold mb-5'>Your Carted Products</h2>
      {cart.status === 'loading' ? (
        <p>Loading...</p>
      ) : cart.cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
            {cart.cart.map((cartItem, index) => {
              const discountedPrice = cartItem.price - (cartItem.price * (cartItem.discount / 100));
              return (
                <div key={index} className='p-4 bg-white rounded-lg shadow-md'>
                  {cartItem.image ? (
                    <img src={`data:image/jpeg;base64,${cartItem.image.toString('base64')}`} alt={cartItem.name} className='w-[20] h-30 object-cover rounded-md mb-3' />
                  ) : (
                    <p>No image available</p>
                  )}
                  <h3 className='text-xl font-semibold'>{cartItem.name}</h3>
                  <p className='text-gray-600'>{cartItem.desc}</p>
                  <p className='text-lg font-bold text-red-500 line-through'>₹{cartItem.price}</p>
                  <p className='text-lg font-bold text-green-600'>₹{discountedPrice.toFixed(2)}</p>
                  <p className='text-sm text-blue-500'>Discount: {cartItem.discount}%</p>
                  <div className='flex items-center mt-2'>
                    <button className='px-3 py-1 bg-red-500 text-white rounded' onClick={() => handleDecrement(cartItem.id)}>-</button>
                    <p className='mx-3 text-black'>{quantity}</p>
                    <button className='px-3 py-1 bg-green-500 text-white rounded' onClick={() => handleIncrement(cartItem.id)}>+</button>
                  </div>
                  <p className='text-gray-700 mt-2'>Total: ₹{(discountedPrice * quantity).toFixed(2)}</p>
                  <button className='mt-3 px-4 py-2 bg-red-600 text-white rounded-lg'>Remove</button>
                </div>
              );
            })}
          </div>
          <h3 className='text-2xl font-bold mt-5'>Grand Total: ₹{cart.cart.reduce((acc, item) => acc + (item.price - (item.price * (item.discount / 100))) * (item.tempQuantity || 1), 0).toFixed(2)}</h3>
          <button className='mt-5 px-4 py-2 bg-blue-500 text-white rounded-lg'>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;