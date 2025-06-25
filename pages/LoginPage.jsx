import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/api/sign-in', formData); // Update backend URL if needed

      const { token, message } = res.data;

      // Save token to localStorage or cookie
      localStorage.setItem('token', token);

      setMessage(message);

      // Navigate to homepage after short delay
      setTimeout(() => {
        navigate('/home-page');
      }, 1000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setMessage(errorMessage);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <motion.div
          className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            User Login
          </h2>

          {message && (
            <div className="mb-4 text-center text-sm text-red-600">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
