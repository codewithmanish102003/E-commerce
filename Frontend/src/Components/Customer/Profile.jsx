import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const username = useSelector((state) => state.auth.username);
  const email = useSelector((state) => state.auth.email);
  return (
    <div className="container mx-auto px-4 py-8 pt-0.5">
      <div className="rounded-lg p-6 flex flex-col justify-center items-center">
        <div>
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
            <input type="file" name="image" id="image" className='w-32 h-32 rounded-full flex items-center justify-center' />
          </div>
        </div>
        <p><strong>Username : </strong>{isLoggedIn ? username : <Link to="/login">plaese login</Link>}</p>
        <p><strong>Email : </strong>{isLoggedIn ? email : "user@gmail.com"}</p>
      </div>
      <div className='w-full bg-black h-[1px]'></div>
      <div className="rounded-lg p-6 mt-6">
        <h3 className="text-xl font-semibold mb-2">Carted Products</h3>
        <p>No products in cart.</p>
      </div>
    </div>
  )
}

export default Profile
