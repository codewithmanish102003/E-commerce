import React from 'react'
import { Link } from "react-router-dom";

const Create_Products = () => {
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
                    <h2 class="text-xl font-bold mb-4">Create New Product</h2>
                    <form autocomplete="off" action="/products/create" method="post" enctype="multipart/form-data">
                        <div class="mb-6">
                            <h3 class="text-lg font-semibold mb-2">Product Details</h3>
                            <div class="mb-4">
                                <label class="block mb-2 font-medium">Product Image</label>
                                {/* <input name="image" type="file" class="py-2 px-4 rounded" value="Select File" /> */}
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <input name="name" type="text" placeholder="Product Name" class="border p-2 rounded w-full" />
                                <input name="price" type="text" placeholder="Product Price" class="border p-2 rounded w-full" />
                                <input name="discount" type="text" placeholder="Discount Price" class="border p-2 rounded w-full" />
                            </div>
                        </div>

                        <div>
                            <h3 class="text-lg font-semibold mb-2">Panel Details</h3>
                            <div class="grid grid-cols-2 gap-4">
                                <input name="bgcolor" type="text" placeholder="Background Color" class="border p-2 rounded w-full" />
                                <input name="panelcolor" type="text" placeholder="Panel Color" class="border p-2 rounded w-full" />
                                <input name="textcolor" type="text" placeholder="Text Color" class="border p-2 rounded w-full" />
                            </div>
                        </div>
                        <input class="px-5 py-2 rounded mt-3 bg-blue-500 text-white" type="submit" value="Create New Product" />
                    </form>
                </main>
            </div>
        </div>
    )
}

export default Create_Products
