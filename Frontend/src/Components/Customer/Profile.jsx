import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutThunk } from '../../app/features/auth/authThunk';
import { deleteUserThunk } from '../../app/features/auth/authThunk';
import {
  User,
  Package,
  Settings,
  CreditCard,
  Gift,
  Heart,
  Bell,
  LogOut,
  ChevronRight,
  Edit2,
  HelpCircle,
} from 'lucide-react';

function Profile() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const firstname = useSelector((state) => state.auth.firstname);
  const lastname = useSelector((state) => state.auth.lastname);
  const email = useSelector((state) => state.auth.email);
  const phone = useSelector((state) => state.auth.phone);
  // const address = useSelector((state) => state.auth.address);
  // const dob = useSelector((state) => state.auth.dob);
  const gen = useSelector((state) => state.auth.gender);
  // const city = useSelector((state) => state.auth.city);
  const [activeSection, setActiveSection] = useState('profile');
  const [gender, setGender] = useState(gen);
  const [isEditing, setIsEditing] = useState(false);
  const [firstnameState, setFirstname] = useState(firstname);
  const [lastnameState, setLastname] = useState(lastname);
  const [emailState, setEmail] = useState(email);
  const [phoneState, setPhone] = useState(phone);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  const handleDeleteAccount = async () => {
    try {
      await dispatch(deleteUserThunk(email));
      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (error) {
      setError(error.message);
      setIsDeleting(false);
    }
  };


  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(updateProfileThunk(firstnameState, lastnameState, emailState, phoneState));
      console.log(response);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-full mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {/* Profile Header */}
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Hello,</p>
                    <h2 className="font-semibold">{isLoggedIn ? firstname : "Guest"}</h2>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveSection('orders')}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 text-left cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <Package className="w-5 h-5 text-gray-600" />
                      <span>MY ORDERS</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>

                  <button
                    onClick={() => setActiveSection('profile')}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 text-left cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <Settings className="w-5 h-5 text-gray-600" />
                      <span>ACCOUNT SETTINGS</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>

                  <button
                    onClick={() => setActiveSection('payments')}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 text-left cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-gray-600" />
                      <span>PAYMENTS</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>

                  <button
                    onClick={() => setActiveSection('stuff')}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 text-left cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <Gift className="w-5 h-5 text-gray-600" />
                      <span>MY STUFF</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>

                  {/* Logout */}
                  <div className="flex items-center space-x-3">

                    <button
                      onClick={handleLogout}
                      className="text-red-500 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 cursor-pointer w-full"
                    >
                      <LogOut className="h-5 w-5" />
                      Logout
                    </button>
                  </div>
                </nav>

                {/* Quick Links */}
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-sm font-medium text-gray-500 mb-4">Frequently Visited:</h3>
                  <div className="space-y-2">
                    <Link href="#" className="text-sm text-blue-600 hover:underline block">Track Order</Link>
                    <Link href="#" className="text-sm text-blue-600 hover:underline block">Help Center</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-9">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {activeSection === 'profile' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h1 className="text-xl font-semibold">Personal Information</h1>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-blue-600 flex items-center space-x-1 cursor-pointer">
                        <Edit2 className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                    </div>

                    {/* Form */}
                    {isEditing ? (
                      <form onSubmit={handleUpdateProfile}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm text-gray-600 mb-2">First Name</label>
                            <input
                              type="text"
                              value={firstname}
                              onChange={(e) => setFirstname(e.target.value)}
                              className="w-full p-2 border rounded-md"
                            />
                          </div>

                          <div>
                            <label className="block text-sm text-gray-600 mb-2">Last Name</label>
                            <input
                              type="text"
                              value={lastname}
                              onChange={(e) => setLastname(e.target.value)}
                              className="w-full p-2 border rounded-md"
                            />
                          </div>

                          <div>
                            <label className="block text-sm text-gray-600 mb-2">Email Address</label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full p-2 border rounded-md"
                            />
                          </div>

                          <div>
                            <label className="block text-sm text-gray-600 mb-2">Mobile Number</label>
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full p-2 border rounded-md"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
                        >
                          Save Changes
                        </button>
                      </form>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm text-gray-600 mb-2">First Name</label>
                          <input
                            type="text"
                            value={`${firstname}`}
                            disabled
                            className="w-full p-2 border rounded-md bg-gray-50"
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-gray-600 mb-2">Last Name</label>
                          <input
                            type="text"
                            value={`${lastname}`}
                            disabled
                            className="w-full p-2 border rounded-md bg-gray-50"
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-gray-600 mb-2">Your Gender</label>
                          <div className="space-x-4">
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={gender === `${gender}`}
                                onChange={(e) => setGender(e.target.value)}
                                className="text-blue-600"
                              />
                              <span className="ml-2">Male</span>
                            </label>
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                name="gender"
                                value={`${gender}`}
                                checked={gender === `${gender}`}
                                onChange={(e) => setGender(e.target.value)}
                                className="text-blue-600"
                              />
                              <span className="ml-2">Female</span>
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-gray-600 mb-2">Email Address</label>
                          <div className="flex items-center justify-between">
                            <input
                              type="email"
                              value={`${email}`}
                              disabled
                              className="w-full p-2 border rounded-md bg-gray-50"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-gray-600 mb-2">Mobile Number</label>
                          <div className="flex items-center justify-between">
                            <input
                              type="tel"
                              value={`${phone}`}
                              disabled
                              className="w-full p-2 border rounded-md bg-gray-50"
                            />
                          </div>
                        </div>
                      </div>

                    )}
                    {/* FAQs Section */}
                    <div className="mt-12">
                      <h2 className="text-lg font-semibold mb-6">FAQs</h2>
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-2">What happens when I update my email address (or mobile number)?</h3>
                          <p className="text-gray-600 text-sm">Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</p>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">When will my account be updated with the new email address (or mobile number)?</h3>
                          <p className="text-gray-600 text-sm">It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</p>
                        </div>
                      </div>
                    </div>

                    {/* Account Actions */}
                    <div className="mt-12 pt-6 border-t space-y-4">
                      <button className="text-blue-600 hover:underline cursor-pointer">Deactivate Account</button>
                      <button onClick={handleDeleteAccount} className="block text-red-600 hover:underline cursor-pointer">Delete Account</button>
                    </div>
                  </div>
                )}

                {activeSection === 'orders' && (
                  <div>
                    <h1 className="text-xl font-semibold mb-6">Orders</h1>
                    <p className="text-gray-600 text-sm">Your orders will appear here.</p>
                  </div>
                )}

                {activeSection === 'payments' && (
                  <div>
                    <h1 className="text-xl font-semibold mb-6">Payments</h1>
                    <p className="text-gray-600 text-sm">Your payment history will appear here.</p>
                  </div>
                )}

                {activeSection === 'stuff' && (
                  <div>
                    <h1 className="text-xl font-semibold mb-6">Stuff</h1>
                    <p className="text-gray-600 text-sm">Your stuff will appear here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;