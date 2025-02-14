"use client"

import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const Owner_Register = () => {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
        gstno: "",
    })
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        try {
            const response = await axios.post("http://localhost:3000/api/owners/register", formData)
            console.log("Registration successful:", response.data)
            navigate("/login") // Redirect to login page after successful registration
        } catch (error) {
            console.error("Registration error:", error)
            setError(error.response?.data?.message || "Registration failed. Please try again.")
        }
    }

    return (
        <div className="mt-10 bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl flex flex-col lg:flex-row items-center justify-center">
                <div className="w-full lg:w-3/4 px-4 lg:px-12 mb-8 lg:mb-0">
                    <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                        Welcome to <span className="text-blue-500">Starway Collections</span>
                    </h2>
                    <div className="bg-white mt-4 py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 flex flex-col w-full">
                        <h4 className="text-xl sm:text-2xl mb-5">create your account</h4>
                        <form autoComplete="off" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    id="fullname"
                                    name="fullname"
                                    type="text"
                                    required
                                    value={formData.fullname}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Gst Number
                                </label>
                                <input
                                    id="gstno"
                                    name="gstno"
                                    type="text"
                                    required
                                    value={formData.gstno}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500" />
                            </div>

                            <button
                                className="px-5 rounded-full py-3 mt-2 bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition-colors duration-300 w-full"
                                type="submit"
                            >
                                Create My Account
                            </button>
                        </form>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                        <div className="mt-8 text-center">
                            <p className="text-sm text-blue-500 hover:text-blue-600">
                                Already have an Account?{" "}
                                <Link className="text-blue-700 hover:underline" to="/login">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Owner_Register

