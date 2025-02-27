import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Main/Home';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Owner_Register from './Components/Auth/Owner_Register';
import Customer from './Components/Dashboard/Customer';
import Cart from './Components/Customer/Cart';
import Products from './Components/Shop/Products';
import NavigationBar from './Components/Partials/NavigationBar';
import Owner_Profile from './Components/Owner/Owner_Profile'
import Create_Products from './Components/Owner/Create_Products';
import AllProducts from './Components/Owner/AllProducts';
import Footer from './Components/Partials/Footer';
import ProductDetails from './Components/Products/ProductDetails';

const App = () => {
    return (
        <Router>
            <NavigationBar />
            <div className='w-full h-3 bg-gray-100'>

            </div>
            <Routes className="bg-gray-50">
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login/owner_register" element={<Owner_Register />} />
                <Route path="/profile" element={<Customer />} />
                <Route path="/owner_profile" element={<Owner_Profile />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<Products />} />
                <Route path="/details" element={<ProductDetails />} />
                <Route path="/createproducts" element={<Create_Products/>}/>
                <Route path='/allproducts' element={<AllProducts/>}/>
                {/* <Route path='/categories' element={<Categories/>}/> */}
            </Routes>
            <Footer />
        </Router>
      
    );
};

export default App;