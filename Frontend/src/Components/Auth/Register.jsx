import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUserThunk } from "../../app/features/auth/authThunk"
import { useDispatch } from "react-redux"



const Register = () => {

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
    })
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (success || error) {
            const timer = setTimeout(() => {
                setSuccess("");
                setError("");
            }, 5000); // 5 seconds

            return () => clearTimeout(timer);
        }
    }, [success, error]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const response = await dispatch(registerUserThunk(formData)).unwrap();
            console.log("Registration successful:", response.message);
            navigate("/login", { state: { success: response.message } });
        } catch (error) {
            setError(error || "Registration failed. Please try again.");
            // console.error("Registration failed:", error);
        }
    }

    return (
        <div className=" bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                    Welcome to <span className="text-blue-500">Starway Collections</span>
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 relative overflow-hidden">
                    {success && (
                        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <span className="block sm:inline">{success}</span>
                        </div>
                    )}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900">Create your account</h3>
                        <form onSubmit={handleRegister} className="space-y-4">
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
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className="flex-1 justify-center rounded-full border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                                >
                                    Create My Account
                                </button>
                                <Link
                                    to="/login/owner_register"
                                    className="flex-1 justify-center rounded-full border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-center flex items-center cursor-pointer"
                                >
                                    Register As Owner
                                </Link>
                            </div>
                        </form>
                        <div className="mt-4 text-center">
                            <button className="text-sm text-blue-500 hover:text-blue-600 cursor-pointer">
                                Already have an account?<Link to="/login"> Login</Link> 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
