import React, { useEffect } from 'react';
import { fetchCartProductsThunk } from '../../app/features/cart/cartThunk';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FaTrash, FaMinus, FaPlus, FaShoppingBag } from 'react-icons/fa';

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, status, error } = useSelector((state) => state.cart);

  useEffect(() => {
    console.log('Cart component mounted');
    fetchCartProducts();
  }, []);

  const fetchCartProducts = async () => {
    try {
      const response = await dispatch(fetchCartProductsThunk());
      console.log('Cart data fetched:', response);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };


  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      // Dispatch action to update quantity
      // TODO: Implement quantity update action
      console.log('Updating quantity for product:', productId, 'to:', newQuantity);
    }
  };

  const handleRemoveItem = (productId) => {
    // Dispatch action to remove item
    // TODO: Implement remove item action
    console.log('Removing product:', productId);
  };

  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * (discount / 100));
  };

  const calculateGrandTotal = () => {
    return cart.reduce((total, item) => {
      const discountedPrice = calculateDiscountedPrice(item.price, item.discount);
      return total + (discountedPrice * (item.tempQuantity || 1));
    }, 0);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (status === error) {
    console.log(error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );

  }

  if (!cart.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <FaShoppingBag className="text-gray-400 text-6xl" />
        <h2 className="text-2xl font-semibold text-gray-600">Your cart is empty</h2>
        <p className="text-gray-500">Add some items to get started!</p>
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          onClick={() => window.history.back()}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map((item, index) => {
              { console.log(item) }
              const discountedPrice = calculateDiscountedPrice(item.price, item.discount);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row items-center gap-6"
                >
                  <div className="w-full sm:w-32 h-32 relative">
                    {item.image ? (
                      <img
                        src={`data:image/jpeg;base64,${item.image.toString('base64')}`}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">

                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                    {item.discount > 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        -{item.discount}%
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{item.desc}</p>

                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, (item.tempQuantity || 1) - 1)}
                          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <FaMinus className="text-gray-600" />
                        </button>
                        <span className="w-8 text-center">{item.tempQuantity || 1}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, (item.tempQuantity || 1) + 1)}
                          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <FaPlus className="text-gray-600" />
                        </button>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500 line-through">₹{item.price.toFixed(2)}</span>
                        <span className="text-lg font-semibold text-green-600">₹{discountedPrice.toFixed(2)}</span>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="ml-auto text-red-500 hover:text-red-600 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{calculateGrandTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{calculateGrandTotal().toFixed(2)}</span>
                </div>
                <p className="text-gray-500 text-sm mt-1">Including GST</p>
              </div>
            </div>
            <button className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
              <span>Proceed to Checkout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;