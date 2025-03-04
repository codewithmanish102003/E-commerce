
import React, { useContext, useState } from 'react';
import { CartListData } from '../../Store/cart-list-store';

const Cart = () => {
  const { cartList, setCartList } = useContext(CartListData);
  console.log(cartList);

  // Filter to remove duplicate products based on name
  const uniqueCartList = cartList.reduce((acc, item) => {
    if (!acc.some(cartItem => cartItem.name === item.name)) {
      acc.push({ ...item, quantity: item.quantity || 1 });
    }
    return acc;
  }, []);

  const [updatedCart, setUpdatedCart] = useState(uniqueCartList);

  const handleQuantityChange = (index, change) => {
    const newCart = [...updatedCart];
    newCart[index].quantity = Math.max(1, newCart[index].quantity + change);
    setUpdatedCart(newCart);
  };

  const handleRemoveItem = (index) => {
    const newCart = updatedCart.filter((_, i) => i !== index);
    setUpdatedCart(newCart);
    setCartList(newCart); // Updating the cart list in global state
  };

  const totalAmount = updatedCart.reduce((sum, item) => sum + (item.price - (item.price * (item.discount / 100))) * item.quantity, 0);

  return (
    <div className='m-10 p-5 bg-gray-100 rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold mb-5'>Your Carted Products</h2>
      {updatedCart.length === 0 ? (
        <p className='text-gray-500'>Your cart is empty.</p>
      ) : (
        <div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {updatedCart.map((cartItem, index) => {
              const discountedPrice = cartItem.price - (cartItem.price * (cartItem.discount / 100));
              return (
                <div key={index} className='p-4 bg-white rounded-lg shadow-md'>
                  <img src={cartItem.image} alt={cartItem.name} className='w-full h-40 object-cover rounded-md mb-3' />
                  <h3 className='text-xl font-semibold'>{cartItem.name}</h3>
                  <p className='text-gray-600'>{cartItem.desc}</p>
                  <p className='text-lg font-bold text-red-500 line-through'>₹{cartItem.price}</p>
                  <p className='text-lg font-bold text-green-600'>₹{discountedPrice.toFixed(2)}</p>
                  <p className='text-sm text-blue-500'>Discount: {cartItem.discount}%</p>
                  <div className='flex items-center mt-2'>
                    <button onClick={() => handleQuantityChange(index, -1)} className='px-3 py-1 bg-red-500 text-white rounded'>-</button>
                    <p className='mx-3'>{cartItem.quantity}</p>
                    <button onClick={() => handleQuantityChange(index, 1)} className='px-3 py-1 bg-green-500 text-white rounded'>+</button>
                  </div>
                  <p className='text-gray-700 mt-2'>Total: ₹{(discountedPrice * cartItem.quantity).toFixed(2)}</p>
                  <button onClick={() => handleRemoveItem(index)} className='mt-3 px-4 py-2 bg-red-600 text-white rounded-lg'>Remove</button>
                </div>
              );
            })}
          </div>
          <h3 className='text-2xl font-bold mt-5'>Grand Total: ₹{totalAmount.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;


