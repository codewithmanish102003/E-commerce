import React, { useEffect, useState } from 'react';
import {useLocation } from "react-router-dom";
import Shop from '../Shop/Shop'
import Banner from '../Shop/Banner'

const Home = () => {
     const location = useLocation();
        const [success, setSuccess] = useState("");
    
        useEffect(() => {
            console.log(location.state);
            if (location.state && location.state.success) {
                setSuccess(location.state.success);
                const timer = setTimeout(() => {
                    setSuccess("");
                }, 5000); // 5 seconds
    
                return () => clearTimeout(timer);
            }
        }, [location.state]);
    return (
        <>
            <div>
            {success && (
                <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{success}</span>
                </div>
            )}
                <Banner />
                <Shop />
            </div>

        </>
    )
}

export default Home
