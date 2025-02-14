import React from 'react'
import { Link } from 'react-router-dom'

const AllProducts = () => {
    return (
        <div class="h-[90vh] flex flex-col">
            <div class="container px-10 py-10 flex flex-grow">
                <div class="w-[20%] flex flex-col items-start shadow p-8">
                    <div class="flex flex-col">
                        <Link to="/owner_profile" class="block w-fit mb-2">Profile</Link>
                        <Link to="/allproducts" class="block w-fit mb-2">All Products</Link>
                        <Link to="/createproducts" class="block w-fit mb-2">Create new product</Link>
                    </div>
                </div>
                <main class="w-3/4 bg-white p-8 shadow ml-4">
                    <h1 class="text-3xl font-bold mb-4">All Products</h1>
                </main>
            </div>
        </div>
    )
}

export default AllProducts
