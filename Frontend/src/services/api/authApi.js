import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Adjust the URL as needed

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Login user
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    const response = await axios.post(`${API_URL}/auth/logout`);
    return response.data;
  } catch (error) {
    console.error('Error logging out user:', error);
    throw error;
  }
};

// Handle login
export const handleLogin = async (email, password) => {
  try {
    const response = await loginUser({ email, password });
    const { token, role } = response;
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    return { token, role };
  } catch (error) {
    console.error('Error handling login:', error);
    throw error;
  }
};

//fetch users data
export const fetchUserData = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    console.log('User Data:', response.data); // Debugging log
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

// Fetch logged-in user data
export const fetchLogUserData = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/userdata`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

// Forgot password
export const forgotPassword = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/forgot-password`, userData);
    return response.data;
  } catch (error) {
    console.error('Error sending reset email:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
    throw error;
  }
};

// Reset password
export const resetPassword = async (token, userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/reset-password/${token}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};