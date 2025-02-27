import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Adjust the URL as needed

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Login user
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, userData);
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

// Logout user
export const logoutUser = async () => {
  console.log("User logged out")
  try {
    const response = await axios.post(`${API_URL}/user/logout`);
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

