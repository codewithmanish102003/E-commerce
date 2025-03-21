import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FaMinus, FaPlus, FaShoppingBag, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartProductsThunk, removeProductThunk, updateQuantityThunk } from '../../app/features/cart/cartThunk';

const Cart = () => {
  const dispatch = useDispatch();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const { cart, status } = useSelector((state) => state.cart);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 5000); // 5 seconds

      return () => clearTimeout(timer);
    }
  }, [success, error]);

  useEffect(() => {
    fetchCartProducts();
  }, []);

  useEffect(() => {
    dispatch(fetchCartProductsThunk());
  }, [dispatch]);

  const fetchCartProducts = async () => {
    try {
      dispatch(fetchCartProductsThunk());
    } catch (error) {
      setError(error.message)
    }
  };

  const handleQuantityChange = (productId, operation) => {
    console.log(productId, operation)
    try{
      if (operation === 'decrease') {
        const res=dispatch(updateQuantityThunk({ productId, operation: 'decrease' }));
        setSuccess(res.payload.message)
      } else if (operation === 'increase') {
        dispatch(updateQuantityThunk({ productId, operation: 'increase' }));
      }
    }catch(err){
      
    }
    
  };

  const handleRemoveItem = async (e, item) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      const response = await dispatch(removeProductThunk(item.product._id));
      console.log(response.payload.message);
      setSuccess(response.payload.message);
    } catch (err) {
      setError(err.message);
    }
  };

  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * (discount / 100));
  };

  const calculateGrandTotal = () => {
    return cart.reduce((total, item) => {
      const discountedPrice = calculateDiscountedPrice(item.product.price, item.product.discount);
      return total + (discountedPrice * (item.quantity || 1));
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
          <span className="block sm:inline">{error}</span>
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
      {success && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{success}</span>
        </div>
      )}
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map((item, index) => {
              const discountedPrice = calculateDiscountedPrice(item.product.price, item.product.discount);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row items-center gap-6"
                >
                  <div className="w-full sm:w-32 h-32 relative">
                    {item.image ? (
                      <img
                        src={`data:image/jpeg;base64,${item.image.toString('base64')}`}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">

                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                    {item.product.discount > 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        -{item.product.discount}%
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{item.product.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{item.product.desc}</p>

                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.product._id, 'decrease')}
                          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <FaMinus className="text-gray-600" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.product._id, 'increase')}
                          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <FaPlus className="text-gray-600" />
                        </button>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500 line-through">₹{item.product.price}</span>
                        <span className="text-lg font-semibold text-green-600">₹{discountedPrice.toFixed(2)}</span>
                      </div>

                      <button
                        onClick={(e) => handleRemoveItem(e, item)}
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