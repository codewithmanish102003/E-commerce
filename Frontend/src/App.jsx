import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetailsThunk } from './app/features/auth/authThunk';
import Home from './Components/Main/Home';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Owner_Register from './Components/Auth/Owner_Register';
import Customer from './Components/Dashboard/Customer';
import Cart from './Components/Customer/Cart';
import Products from './Components/Shop/Products';
import NavigationBar from './Components/Partials/NavigationBar';
import Footer from './Components/Partials/Footer';
import ProductDetails from './Components/Products/ProductDetails';
import Owner from './Components/Dashboard/Owner';
import './App.css';
import { CartListData } from './Store/cart-list-store';

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchUserDetailsThunk());
    }
  }, [dispatch]);

  return (
    <CartListData >
    <Router>
      <NavigationBar />
      <div className='w-full h-3 bg-gray-100'></div>
      <Routes className="bg-gray-50">
        {role !== 'owner' && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
          </>
        )}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login/owner_register" element={<Owner_Register />} />
        {role === 'user' && (
          <Route path="/profile" element={<Customer />} />
        )}
        {role === 'owner' && (
          <Route path="/owner/*" element={<Owner />} />
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
    </CartListData>
  );
};

export default App;
