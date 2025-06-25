// import React, { useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import Navbar from '../components/Navbar';

// const CreateUser = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: ''
//     });
//     const [message, setMessage] = useState('');

//     const handleChange = (e) => {
//         setFormData(prev => ({
//             ...prev,
//             [e.target.name]: e.target.value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const res = await axios.post('http://localhost:3000/api/sign-up', formData); // Update your backend URL as needed
//             setMessage(res.data.message);
//             setFormData({ name: '', email: '', password: '' });
//         } catch (err) {
//             setMessage('Failed to create user. Please try again.');
//         }
//     };

//     return (
//         <>
//             <Navbar />



//             <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//                 <motion.div
//                     className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200"
//                     initial={{ opacity: 0, y: 40 }}
//                     animate={{ opacity: 1, y: 0 }}
//                 >
//                     <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//                         Create New User
//                     </h2>

//                     {message && (
//                         <div className="mb-4 text-center text-sm text-blue-600">
//                             {message}
//                         </div>
//                     )}

//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Name</label>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 required
//                                 className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800"
//                                 placeholder="Enter full name"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Email</label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 required
//                                 className="mt-1 ml-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800"
//                                 placeholder="Enter email address"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Password</label>
//                             <input
//                                 type="password"
//                                 name="password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 required
//                                 className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800"
//                                 placeholder="Enter password"
//                             />
//                         </div>

//                         <button
//                             type="submit"
//                             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
//                         >
//                             Create User
//                         </button>
//                     </form>
//                 </motion.div>
//             </div>

//         </>
//     );
// };

// export default CreateUser;

import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
    const navigate = useNavigate();
    console.log('check check loading');

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/'); // ⛔ Redirect if not logged in
      }
    }, [navigate]);
  


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:3000/api/sign-up', formData); // adjust your backend route if needed
            setMessage(res.data.message);
            setFormData({ name: '', email: '', password: '' });
        } catch (err) {
            setMessage('Your Email address Exists . Go to login Page.');
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
                        Create New User
                    </h2>

                    {message && (
                        <div className="mb-4 text-center text-sm text-blue-600">
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                                placeholder="Enter full name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                                placeholder="Enter email address"
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
                                placeholder="Enter password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
                        >
                            Create User
                        </button>
                    </form>
                </motion.div>
            </div>
        </>
    );
};

export default CreateUser;

