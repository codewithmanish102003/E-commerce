import React from 'react'
import { createProductThunk } from '../../app/features/product/productThunk';
import { useDispatch } from 'react-redux';

const Create_Products = () => {
    const dispatch = useDispatch()

     const handleCreateation = async (e) => {
            e.preventDefault()
            try {
                const response = await dispatch(createProductThunk(formData)).unwrap();
                console.log("Product Created Successfully:", response.message);
                navigate("/owner", { state: { success: response.message } });
            } catch (error) {
                setError(error || "failed. Please try again.");
                // console.error("Registration failed:", error);
            }
        }
    return (
        <div className='flex items-center justify-center mt-0'>
        <div className="h-[100vh] flex flex-col">
                <main className="w-[95vw] bg-white p-8 shadow m-5 mt-0">
                    <h2 className="text-xl font-bold mb-4">Create New Product</h2>
                    <form autoComplete="off" onClick={handleCreateation} method="post" encType="multipart/form-data">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Product Details</h3>
                            <div className="mb-4">
                                <label className="block mb-2 font-medium">Product Image</label>
                                <input name="image" type="file" className="py-2 px-4 rounded border" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input name="name" type="text" placeholder="Product Name" className="border p-2 rounded w-full" />
                                <input name="price" type="text" placeholder="Product Price" className="border p-2 rounded w-full" />
                                <input name="discount" type="text" placeholder="Discount Price" className="border p-2 rounded w-full" />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Panel Details</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <input name="bgcolor" type="text" placeholder="Background Color" className="border p-2 rounded w-full" />
                                <input name="panelcolor" type="text" placeholder="Panel Color" className="border p-2 rounded w-full" />
                                <input name="textcolor" type="text" placeholder="Text Color" className="border p-2 rounded w-full" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Product Description</h3>
                            <div className="w-full">
                                <textarea name='description' placeholder='write your product description here' className='border p-2 rounded w-full'/>
                            </div>
                        </div>
                        <input className="px-5 py-2 rounded mt-3 bg-blue-500 text-white" type="submit" value="Create New Product" />
                    </form>
                </main>
            </div>
    </div>
    )
}

export default Create_Products
