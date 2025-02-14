import React from 'react'

const Profile = () => {
  return (
    <div class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold mb-4">Profile</h2>
    <div class="bg-white shadow-md rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-2">User Information</h3>
        <p><strong>Name:</strong>Manish Prajapati</p>
        <p><strong>Email:</strong>abc123@gmail.com</p>
    </div>

    <div class="bg-white shadow-md rounded-lg p-6 mt-6">
        <h3 class="text-xl font-semibold mb-2">Carted Products</h3>
            <p>No products in cart.</p>
            {/* <ul>
                <% user.cart.forEach(function(product) { %>
                    <li class="mb-2">
                        <div class="flex items-center">
                            <img class="h-16 w-16 mr-4" src="data:image/jpeg;base64,<%= product.image.toString('base64') %>" alt="<%= product.name %>">
                            <div>
                                <h4 class="text-lg font-semibold"><%= product.name %></h4>
                                <p>Price: ₹ <%= total %></p>
                            </div>
                        </div>
                    </li>
                <% }) %>
            </ul> */}
    </div>
</div>
  )
}

export default Profile
