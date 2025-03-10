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
import ProtectedRoute from './Components/Auth/ProtectedRoute';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (token && !isLoggedIn) {
      dispatch(fetchUserDetailsThunk());
    }
  }, [isLoggedIn]);
  console.log("Current role:", role);
  console.log("Is authenticated:", isLoggedIn);

  return (
    <Router>
      <NavigationBar/>
      <div className='w-full h-3 bg-gray-100 mb-15'></div>
      <Routes className="bg-gray-50">
        {role !== 'owner' && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
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
  );
};

export default App;