import React from 'react'
import { Link } from 'react-router-dom'

const Owner_Header = () => {
  return (
    <div className="font-['helvetica_now_display'] overflow-auto">
      <nav className="w-full flex justify-between px-5 py-3">
        <div className="flex gap-5">
          <Link to="/owner" className="block w-fit mb-2">Profile</Link>
          <Link to="/owner/allproducts" className="block w-fit mb-2">All Products</Link>
          <Link to="/owner/createproducts" className="block w-fit mb-2">Create new product</Link>
        </div>
      </nav>
    </div>
  )
}

export default Owner_Header
