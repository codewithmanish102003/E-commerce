import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Owner_Header from '../Owner/Owner_Header'
import Owner_Profile from '../Owner/Owner_Profile';
import Create_Products from '../Owner/Create_Products';
import AllProducts from '../Owner/AllProducts';

const Owner = () => {
  const location = useLocation();
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (location.state && location.state.success) {
      setSuccess(location.state.success);
      const timer = setTimeout(() => {
        setSuccess("");
      }, 5000); // 5 seconds

      return () => clearTimeout(timer);
    }
  }, [location.state]);
  return (
    <div>
      {success && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{success}</span>
        </div>
      )}
      <Owner_Header/>
      <Routes>
        <Route path="/" element={<Owner_Profile />} />
        <Route path="/createproducts" element={<Create_Products />} />
        <Route path="/allproducts" element={<AllProducts />} />
      </Routes>
    </div>
  )
}

export default Owner
