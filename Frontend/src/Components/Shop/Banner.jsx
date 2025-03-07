import React from 'react'
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    
    <div className=" bg-gray-600 text-white text-center m-2 rounded">
      <img src="\Banner.PNG" alt="banner" className='w-full rounded p-0' />
    <h2 className="text-2xl font-bold">Welcome to Our Store!</h2>
    <p className="mt-2">Check out our latest deals and discounts!</p>
    <button className="mt-4 px-4 py-2 bg-white text-blue-500 font-semibold rounded cursor-pointer">Shop Now</button>
    <Link to="/products" className="mt-4 block text-sm hover:underline">View all products</Link>
  </div>
  )
}

export default Banner
