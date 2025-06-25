// import React, { useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post('http://localhost:3000/api/sign-in', formData); // Update backend URL if needed

//       const { token, message } = res.data;

//       // Save token to localStorage or cookie
//       localStorage.setItem('token', token);

//       setMessage(message);

//       // Navigate to homepage after short delay
//       setTimeout(() => {
//         navigate('/home-page');
//       }, 1000);
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || 'Login failed';
//       setMessage(errorMessage);
//     }
//   };

//   return (
//     <>
//       <h1>KANTIPUR TELEVISION ENGINEERING DEPARTMENT</h1>
//       <h2>DUTY SCHEDULE AND DAILY TRANSMISSION REPORT</h2>

//       <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//         <motion.div
//           className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200"
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//             User Login
//           </h2>

//           {message && (
//             <div className="mb-4 text-center text-sm text-red-600">
//               {message}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
//                 placeholder="Enter your email"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
//                 placeholder="Enter your password"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
//             >
//               Login
//             </button>
//           </form>
//         </motion.div>
//       </div>
//     </>
//   );
// };

// export default Login;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post('http://localhost:3000/api/sign-in', formData);
//       const { token, message } = res.data;
//       localStorage.setItem('token', token);
//       setMessage(message);
//       setTimeout(() => {
//         navigate('/home-page');
//       }, 1000);
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || 'Login failed';
//       setMessage(errorMessage);
//     }
//   };

//   return (
//     <>
     
//       <div className="bg-gradient-to-br from-blue-50 to-white py-12 px-4 min-h-screen flex flex-col items-center">
//         <motion.h1
//           className="text-3xl sm:text-4xl font-extrabold text-blue-900 tracking-tight text-center"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           KANTIPUR TELEVISION ENGINEERING DEPARTMENT
//         </motion.h1>

//         <motion.h2
//           className="mt-2 text-xl sm:text-2xl text-blue-700 font-semibold text-center"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           DUTY SCHEDULE & DAILY TRANSMISSION REPORT
//         </motion.h2>

//         <motion.div
//           className="mt-10 w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border border-gray-200"
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//             User Login
//           </h2>

//           {message && (
//             <div className="mb-4 text-center text-sm text-red-600 font-medium">
//               {message}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 placeholder="example@domain.com"
//                 className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your password"
//                 className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition duration-300 shadow-md"
//             >
//               Login
//             </button>
//           </form>
//         </motion.div>
//       </div>
//     </>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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
      const res = await axios.post('http://localhost:3000/api/sign-in', formData);
      const { token, message } = res.data;
      localStorage.setItem('token', token);
      setMessage(message);
      setTimeout(() => {
        navigate('/home-page');
      }, 1000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setMessage(errorMessage);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white py-20 px-4 min-h-screen flex flex-col items-center justify-center">
      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold text-green-800 text-center mb-2 leading-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        KANTIPUR TELEVISION
      </motion.h1>

      <motion.h2
        className="text-xl sm:text-2xl text-blue-500 font-semibold text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        ENGINEERING DEPARTMENT • DUTY SCHEDULE & DAILY TRANSMISSION REPORT
      </motion.h2>

      <motion.div
        className="w-full max-w-md bg-white shadow-2xl rounded-2xl px-8 py-10 border border-gray-200"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          User Login
        </h2>

        {message && (
          <div className="mb-4 text-center text-sm text-red-600 font-medium">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="example@domain.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition duration-300 shadow-md"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
