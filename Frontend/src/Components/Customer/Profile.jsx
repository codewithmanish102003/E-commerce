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
        <div className='w-[60px] rounded-full h-[60px] bg-amber-300'>
        </div>
        <p><strong>Username : </strong>{isLoggedIn ? username : <Link to="/login">plaese login</Link> }</p>
        <p><strong>Email : </strong>{isLoggedIn ? email : "user@gmail.com" }</p>
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
