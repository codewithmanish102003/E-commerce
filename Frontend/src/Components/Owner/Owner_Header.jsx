import React from 'react'

const Owner_Header = () => {
  return (
    <div className="font-['helvetica_now_display'] overflow-auto">
      <nav className="w-full flex justify-between px-5 py-3">
        <h3 className="text-xl">💫wayCollections</h3>
        <div className="flex gap-5">
            <a className="block w-fit mb-2" href="/owners/all-products">All Products</a>
            <a href="/owner-profile">Account</a>
            <a className="text-red-600" href="/user/logout">Logout</a>
        </div>
    </nav>
    </div>
  )
}

export default Owner_Header
