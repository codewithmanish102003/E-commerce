import React from 'react'

const Shop = () => {
    return (
        <div>
            <div class="w-full h-screen flex items-start px-20 py-20">
                <div class="flex items-start gap-5">
                    <div class="w-full text-center">
                        <h3>No Available Products</h3>
                    </div>
                    {/* <div class="w-60">
                            <div class="w-full h-52 flex items-center justify-center bg-[<%= product.bgcolor %>]">
                                <img class="h-[12rem]" src="data:image/jpeg;base64,<%= product.image.toString('base64') %>" alt="" />

                                <img class="h-[12rem]" src="/path/to/default/image.jpg" alt="Default Image" />
                            </div>
                            <div class="flex justify-between bg-[<%= product.panelcolor %>] items-center px-4 py-4 text-[<%= product.textcolor %>]">
                                <div>
                                    <h3>
                                        Cling Bag
                                    </h3>
                                    <h4>₹1200</h4>
                                </div>
                                <a class="w-7 h-7 flex items-center justify-center rounded-full bg-black" href="/addtocart/<%= product._id %>">
                                    <i class="ri-add-line"></i>
                                </a>
                            </div>
                        </div> */}
                </div>
            </div>
        </div>
    )
}

export default Shop
