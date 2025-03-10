import { useEffect, useState } from 'react';
import {useLocation } from "react-router-dom";
import Shop from '../Shop/Shop'
import Banner from '../Shop/Banner'
import { motion } from 'framer-motion';

const Home = () => {
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
        <>
            <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay:0.2 }}>
            {success && (
                <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{success}</span>
                </div>
            )}
                <Banner />
                <Shop />
            </motion.div>

        </>
    )
}

export default Home
