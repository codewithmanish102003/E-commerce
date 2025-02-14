import React from 'react'

const Header = () => {
  return (
    <div className="font-['helvetica_now_display'] h-10">
      <nav className="w-full flex justify-between px-5 py-4 bg-teal-400">
        <h3 className="text-xl">💫wayCollections</h3>
        <div className="flex gap-5">
          <a href="/">Home</a>
          <a href="/products">Shop</a>
          <a href="/categories">Categories</a>
          <a href="/cart">Cart</a>
          {/* <a href="/login">SignUP</a> */}
          <a href="/profile">Account</a>
          {/* <a className="text-red-600" href="/user/logout">Logout</a> */}
        </div>
      </nav>
    </div>
  )
}

export default Header
