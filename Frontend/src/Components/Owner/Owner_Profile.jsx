import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";

const Owner_Profile = () => {
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
        <div>
             {success && (
                <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{success}</span>
                </div>
            )}
            <div class="container mx-auto p-6 flex px-10 py-10">
                <div class="w-[20%] flex flex-col items-start shadow p-8">
                    <div class="flex flex-col">
                        <Link to="/owner_profile" class="block w-fit mb-2">Profile</Link>
                        <Link to="/allproducts" class="block w-fit mb-2">All Products</Link>
                        <Link to="/createproducts" class="block w-fit mb-2">Create new product</Link>
                    </div>
                </div>
                <div className='w-3/4 pl-8'>
                    <div class="bg-white p-6 rounded-lg shadow-lg mb-6">
                        <div class="flex gap-4 items-center">
                            <div>
                                <div class="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                                    No Image
                                </div>
                            </div>
                            <div>
                                <p class="text-gray-600"><span class="font-semibold">Full Name:</span>Manish Prajapati</p>
                                <p class="text-gray-600"><span class="font-semibold">Email:</span>marveluniverse1942@gmail.com</p>
                                <p class="text-gray-600"><span class="font-semibold">GST No:</span>GST NO.</p>
                            </div>

                        </div>
                    </div>
                    {/* <!-- Products Created by Owner --> */}
                    <div class="bg-white p-6 rounded-lg shadow-lg mb-6">
                        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Products Created</h2>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* <div class="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <h3 class="text-xl font-semibold text-gray-800">Cling Bag</h3>
                            <p class="text-gray-600">Price:1200 </p>
                            <p class="text-gray-600">Discount: 100</p>
                            <p class="text-gray-600">Created At: date</p>
                        </div> */}
                            <p>No products created yet.</p>
                        </div>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Users with Products in Cart</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div class="bg-gray-50 p-4 rounded-lg shadow-sm">
                                <h3 class="text-xl font-semibold text-gray-800">full name</h3>
                                <p class="text-gray-600">Email: </p>
                                <p class="text-gray-600">Products in Cart:</p>
                                {/* <ul class="list-disc list-inside">
                            <% user.cart.forEach(product => { %>
                                <li class="text-gray-600"><%= product.name %></li>
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
