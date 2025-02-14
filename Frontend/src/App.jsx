import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Main/Home';
import Login_Register from './Components/Dashboard/Login&Register';
import Owner_Register from './Components/Auth/Owner_Register';
import Customer from './Components/Dashboard/Customer';
import Cart from './Components/Customer/Cart';
import Products from './Components/Shop/Products';
import NavigationBar from './Components/Partials/NavigationBar';
import Owner_Profile from './Components/Owner/Owner_Profile'
import Create_Products from './Components/Owner/Create_Products';
import AllProducts from './Components/Owner/AllProducts';

const App = () => {
    return (
        <Router>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login_Register />} />
                <Route path="/login/owner_register" element={<Owner_Register />} />
                <Route path="/profile" element={<Customer />} />
                <Route path="/owner_profile" element={<Owner_Profile />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/products" element={<Products />} />
                <Route path="/createproducts" element={<Create_Products/>}/>
                <Route path='/allproducts' element={<AllProducts/>}/>
                {/* <Route path='/categories' element={<Categories/>}/> */}
            </Routes>
        </Router>
    );
};

export default App;