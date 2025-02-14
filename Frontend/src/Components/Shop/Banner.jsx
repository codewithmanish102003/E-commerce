import React from 'react'
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="p-6 bg-blue-500 text-white text-center m-2 rounded-4xl">
    <h2 className="text-2xl font-bold">Welcome to Our Store!</h2>
    <p className="mt-2">Check out our latest deals and discounts!</p>
    <button className="mt-4 px-4 py-2 bg-white text-blue-500 font-semibold rounded cursor-pointer">Shop Now</button>
    <Link to="/products" className="mt-4 block text-sm hover:underline">View all products</Link>
  </div>
  )
}

export default Banner
