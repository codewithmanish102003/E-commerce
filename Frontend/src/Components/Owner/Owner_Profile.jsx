import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const Owner_Profile = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const username = useSelector((state) => state.auth.username);
    const email = useSelector((state) => state.auth.email);
    const gstno =useSelector((state) => state.auth.gstno);

    return (
        <div>
            <div className="flex">
                <div className='w-full p-2'>
                    <div className="bg-white p-6 rounded-lg">
                        <div className="flex flex-col gap-4 items-center justify-center">
                            <div>
                                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                                    No Image
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-600"><span className="font-semibold">Full Name : </span>{isLoggedIn ? username : <Link to="/login">plaese login</Link> }</p>
                                <p className="text-gray-600"><span className="font-semibold">Eamil : </span>{isLoggedIn ? email : "user@gmail.com" }</p>
                                <p className="text-gray-600"><span className="font-semibold">GST : </span>{isLoggedIn ? gstno : "your gst number" }</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full bg-black h-[1px]'></div>

                    {/* <!-- Products Created by Owner --> */}
                    <div className="bg-white p-6 ">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Products Created</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-800">Cling Bag</h3>
                            <p className="text-gray-600">Price:1200 </p>
                            <p className="text-gray-600">Discount: 100</p>
                            <p className="text-gray-600">Created At: date</p>
                        </div> */}
                            <p>No products created yet.</p>
                        </div>
                    </div>
                    <div className='w-full bg-black h-[1px]'></div>
                    <div className="bg-white p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Users with Products in Cart</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                <h3 className="text-xl font-semibold text-gray-800">full name</h3>
                                <p className="text-gray-600">Email: </p>
                                <p className="text-gray-600">Products in Cart:</p>
                                {/* <ul className="list-disc list-inside">
                            <% user.cart.forEach(product => { %>
                                <li className="text-gray-600"><%= product.name %></li>
                            <% }); %>
                        </ul> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Owner_Profile
