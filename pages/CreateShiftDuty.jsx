

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';  // <-- Import axios
// import Navbar from '../components/Navbar';

// const dutyOptions = ['On Duty', 'OffDay Duty', 'Leave', 'Weekly Off','Live Duty','PCR' ,'Others'];

// const CreateShiftDuty = () => {
//   const navigate = useNavigate();

//   const [duty, setDuty] = useState({
//     shiftDate: '',
//     shiftTime: '',
//     engineers: Array(6).fill({ name: '', status: '' }),
//     technician: { name: '', status: '' },
//     electrician: { name: '', status: '' }
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleEngineerChange = (index, field, value) => {
//     const updatedEngineers = [...duty.engineers];
//     updatedEngineers[index] = {
//       ...updatedEngineers[index],
//       [field]: value
//     };
//     setDuty({ ...duty, engineers: updatedEngineers });
//   };

//   const handleTechChange = (role, field, value) => {
//     setDuty({
//       ...duty,
//       [role]: { ...duty[role], [field]: value }
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setDuty({ ...duty, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     // Prepare payload based on your backend model
//     const payload = {
//       shiftDate: duty.shiftDate,
//       shiftTime: duty.shiftTime,
//       // Extract engineer names and statuses properly
//       engineer1: duty.engineers[0]?.name || '',
//       engineer2: duty.engineers[1]?.name || '',
//       engineer3: duty.engineers[2]?.name || '',
//       engineer4: duty.engineers[3]?.name || '',
//       engineer5: duty.engineers[4]?.name || '',
//       engineer6: duty.engineers[5]?.name || '',
//       // You may want to include statuses or send them as well if backend expects them
//       technician: duty.technician.name || '',
//       electrician: duty.electrician.name || '',
//       // You can send statuses too if backend supports them
//     };

    
    

//     try {
//       const response = await axios.post('http://localhost:3000/api/duties', payload);
//       if (response.status === 201 || response.status === 200) {
//         setLoading(false);
//         navigate('/');  // Redirect after success
//       } else {
//         throw new Error('Failed to create shift duty');
//       }
//     } catch (err) {
//       setLoading(false);
//       setError(err.response?.data?.message || err.message || 'Error submitting duty');
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Technical Shift Duty</h2>
//         <form onSubmit={handleSubmit} className="space-y-6">

//           {/* Shift Time & Date */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-gray-700 font-medium mb-1">Shift Date</label>
//               <input
//                 type="date"
//                 name="shiftDate"
//                 value={duty.shiftDate}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 font-medium mb-1">Shift Time</label>
//               <select
//                 name="shiftTime"
//                 value={duty.shiftTime}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
//                 required
//               >
//                 <option value="">Select Shift</option>
//                 <option value="Morning">Morning</option>
//                 <option value="Evening">Evening</option>
//                 <option value="Night">Night</option>
//               </select>
//             </div>
//           </div>

//           {/* Engineers */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Engineers (6)</label>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {duty.engineers.map((engineer, index) => (
//                 <div key={index} className="flex flex-col gap-2">
//                   <input
//                     type="text"
//                     placeholder={`Engineer ${index + 1} Name`}
//                     value={engineer.name}
//                     onChange={(e) => handleEngineerChange(index, 'name', e.target.value)}
//                     className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
//                   />
//                   <select
//                     value={engineer.status}
//                     onChange={(e) => handleEngineerChange(index, 'status', e.target.value)}
//                     className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="">Select Status</option>
//                     {dutyOptions.map((opt) => (
//                       <option key={opt} value={opt}>{opt}</option>
//                     ))}
//                   </select>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Technician & Electrician */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {['technician', 'electrician'].map((role) => (
//               <div key={role}>
//                 <label className="block text-gray-700 font-medium mb-1 capitalize">{role}</label>
//                 <input
//                   type="text"
//                   placeholder={`${role.charAt(0).toUpperCase() + role.slice(1)} Name`}
//                   value={duty[role].name}
//                   onChange={(e) => handleTechChange(role, 'name', e.target.value)}
//                   className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 mb-2"
//                 />
//                 <select
//                   value={duty[role].status}
//                   onChange={(e) => handleTechChange(role, 'status', e.target.value)}
//                   className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">Select Status</option>
//                   {dutyOptions.map((opt) => (
//                     <option key={opt} value={opt}>{opt}</option>
//                   ))}
//                 </select>
//               </div>
//             ))}
//           </div>

//           {error && (
//             <p className="text-red-600 font-semibold mt-4">{error}</p>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className={`mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 shadow-md ${loading ? 'opacity-50 cursor-not-allowed' : ''
//               }`}
//           >
//             {loading ? 'Submitting...' : 'Next'}
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default CreateShiftDuty;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // <-- Import axios
import Navbar from '../components/Navbar';

const dutyOptions = ['On Duty', 'OffDay Duty', 'Leave', 'Weekly Off','Live Duty','PCR' ,'Others'];

const CreateShiftDuty = () => {
  const navigate = useNavigate();

  const [duty, setDuty] = useState({
    shiftDate: '',
    shiftTime: '',
    engineers: Array(6).fill({ name: '', status: '' }),
    technician: { name: '', status: '' },
    electrician: { name: '', status: '' }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEngineerChange = (index, field, value) => {
    const updatedEngineers = [...duty.engineers];
    updatedEngineers[index] = {
      ...updatedEngineers[index],
      [field]: value
    };
    setDuty({ ...duty, engineers: updatedEngineers });
  };

  const handleTechChange = (role, field, value) => {
    setDuty({
      ...duty,
      [role]: { ...duty[role], [field]: value }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDuty({ ...duty, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Prepare payload based on your backend model
    // const payload = {
    //   shiftDate: duty.shiftDate,
    //   shiftTime: duty.shiftTime,
    //   // Extract engineer names and statuses properly
    //   engineer1: duty.engineers[0]?.name || '',
    //   engineer2: duty.engineers[1]?.name || '',
    //   engineer3: duty.engineers[2]?.name || '',
    //   engineer4: duty.engineers[3]?.name || '',
    //   engineer5: duty.engineers[4]?.name || '',
    //   engineer6: duty.engineers[5]?.name || '',
    //   // You may want to include statuses or send them as well if backend expects them
    //   technician: duty.technician.name || '',
    //   electrician: duty.electrician.name || '',
    //   // You can send statuses too if backend supports them
    // };

    const payload = {
      shiftDate: duty.shiftDate,
      shiftTime: duty.shiftTime,
    
      engineer1: duty.engineers[0]?.name || '',
      engineer1Status: duty.engineers[0]?.status || '',
      engineer2: duty.engineers[1]?.name || '',
      engineer2Status: duty.engineers[1]?.status || '',
      engineer3: duty.engineers[2]?.name || '',
      engineer3Status: duty.engineers[2]?.status || '',
      engineer4: duty.engineers[3]?.name || '',
      engineer4Status: duty.engineers[3]?.status || '',
      engineer5: duty.engineers[4]?.name || '',
      engineer5Status: duty.engineers[4]?.status || '',
      engineer6: duty.engineers[5]?.name || '',
      engineer6Status: duty.engineers[5]?.status || '',
    
      technician: duty.technician.name || '',
      technicianStatus: duty.technician.status || '',
      electrician: duty.electrician.name || '',
      electricianStatus: duty.electrician.status || '',
    };
    

    
    

    try {
      const response = await axios.post('http://localhost:3000/api/duties', payload);
      if (response.status === 201 || response.status === 200) {
        setLoading(false);
        navigate('/');  // Redirect after success
      } else {
        throw new Error('Failed to create shift duty');
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || err.message || 'Error submitting duty');
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Technical Shift Duty</h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Shift Time & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Shift Date</label>
              <input
                type="date"
                name="shiftDate"
                value={duty.shiftDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Shift Time</label>
              <select
                name="shiftTime"
                value={duty.shiftTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Shift</option>
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
              </select>
            </div>
          </div>

          {/* Engineers */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Engineers (6)</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {duty.engineers.map((engineer, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder={`Engineer ${index + 1} Name`}
                    value={engineer.name}
                    onChange={(e) => handleEngineerChange(index, 'name', e.target.value)}
                    className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    value={engineer.status}
                    onChange={(e) => handleEngineerChange(index, 'status', e.target.value)}
                    className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Status</option>
                    {dutyOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Technician & Electrician */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['technician', 'electrician'].map((role) => (
              <div key={role}>
                <label className="block text-gray-700 font-medium mb-1 capitalize">{role}</label>
                <input
                  type="text"
                  placeholder={`${role.charAt(0).toUpperCase() + role.slice(1)} Name`}
                  value={duty[role].name}
                  onChange={(e) => handleTechChange(role, 'name', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 mb-2"
                />
                <select
                  value={duty[role].status}
                  onChange={(e) => handleTechChange(role, 'status', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Status</option>
                  {dutyOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {error && (
            <p className="text-red-600 font-semibold mt-4">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 shadow-md ${loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            {loading ? 'Submitting...' : 'Next'}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateShiftDuty;











