

// import React, { useState, useEffect } from 'react';
// import { useShiftDuty } from './CreateShiftDutyContext';
// import Navbar from '../components/Navbar';

// const shiftColors = {
//   Morning: 'bg-blue-50 border-blue-400 text-blue-800',
//   Evening: 'bg-purple-50 border-purple-400 text-purple-800',
//   Night: 'bg-gray-100 border-gray-400 text-gray-800'
// };

// const HomePage = () => {
//   const { shiftDuties } = useShiftDuty();

//   // Automatically set today's date in YYYY-MM-DD format
//   const getTodayDate = () => {
//     const today = new Date();
//     return today.toISOString().split('T')[0]; // "YYYY-MM-DD"
//   };

//   const [selectedDate, setSelectedDate] = useState(getTodayDate());

//   const filteredDuties = shiftDuties.filter(d => d.shiftDate === selectedDate);
//   const shifts = ['Morning', 'Evening', 'Night'];

//   return (
//     <>
//       <Navbar />

//       <div className="max-w-7xl mx-auto p-6 mt-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">Shift Duty Overview</h1>

//         {/* Date Picker */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Select Date:
//           </label>
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
//           />
//         </div>

//         {/* Display Shift Cards */}
//         {filteredDuties.length === 0 ? (
//           <p className="text-gray-600">No shift duties found for {selectedDate}.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {shifts.map((shiftTime) => {
//               const duty = filteredDuties.find(d => d.shiftTime === shiftTime);
//               if (!duty) return null;

//               const shiftColor = shiftColors[duty.shiftTime] || 'bg-white border-gray-300';

//               return (
//                 <div
//                   key={shiftTime}
//                   className={`rounded-xl shadow-md p-5 border-2 ${shiftColor} transition-all hover:scale-105`}
//                 >
//                   <div className="mb-4">
//                     <h2 className="text-xl font-bold">{duty.shiftTime} Shift</h2>
//                     <p className="text-sm text-gray-500">Date: {duty.shiftDate}</p>
//                   </div>

//                   <div className="mb-4">
//                     <h3 className="text-md font-semibold mb-2">Engineers</h3>
//                     <div className="grid grid-cols-1 gap-2">
//                       {duty.engineers.map((eng, i) => (
//                         <div
//                           key={i}
//                           className="p-2 bg-white rounded shadow text-sm border border-gray-200"
//                         >
//                           <p className="font-medium text-gray-800">{eng.name || 'N/A'}</p>
//                           <p className="text-gray-500 italic">{eng.status}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div className="bg-green-100 p-3 rounded border-l-4 border-green-500">
//                       <h4 className="font-semibold">Technician</h4>
//                       <p className="text-sm">{duty.technician.name || 'N/A'}</p>
//                       <p className="text-xs italic text-gray-600">{duty.technician.status}</p>
//                     </div>

//                     <div className="bg-yellow-100 p-3 rounded border-l-4 border-yellow-500">
//                       <h4 className="font-semibold">Electrician</h4>
//                       <p className="text-sm">{duty.electrician.name || 'N/A'}</p>
//                       <p className="text-xs italic text-gray-600">{duty.electrician.status}</p>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default HomePage;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from '../components/Navbar';

// const shiftColors = {
//   Morning: 'bg-blue-50 border-blue-400 text-blue-800',
//   Evening: 'bg-purple-50 border-purple-400 text-purple-800',
//   Night: 'bg-gray-100 border-gray-400 text-gray-800'
// };

// const HomePage = () => {
//   // Automatically set today's date in YYYY-MM-DD format
//   const getTodayDate = () => {
//     const today = new Date();
//     return today.toISOString().split('T')[0]; // "YYYY-MM-DD"
//   };

//   const [selectedDate, setSelectedDate] = useState(getTodayDate());
//   const [shiftDuties, setShiftDuties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDuties = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get('http://localhost:3000/api/duties');
//         // Transform backend data to expected frontend format
//         const dutiesFromBackend = response.data.duties.map(duty => {
//           return {
//             ...duty,
//             engineers: [
//               { name: duty.engineer1 || '', status: 'On Duty' },
//               { name: duty.engineer2 || '', status: 'On Duty' },
//               { name: duty.engineer3 || '', status: 'On Duty' },
//               { name: duty.engineer4 || '', status: 'On Duty' },
//               { name: duty.engineer5 || '', status: 'On Duty' },
//               { name: duty.engineer6 || '', status: 'On Duty' },
//             ].filter(e => e.name !== ''),
//             technician: { name: duty.technician || 'N/A', status: 'On Duty' },
//             electrician: { name: duty.electrician || 'N/A', status: 'On Duty' }
//           };
//         });

//         setShiftDuties(dutiesFromBackend);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load shift duties. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchDuties();
//   }, []);

//   // Filter duties by selected date
//   const filteredDuties = shiftDuties.filter(d => d.shiftDate === selectedDate);
//   const shifts = ['Morning', 'Evening', 'Night'];

//   return (
//     <>
//       <Navbar />

//       <div className="max-w-7xl mx-auto p-6 mt-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">Shift Duty Overview</h1>

//         {/* Date Picker */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Select Date:
//           </label>
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
//           />
//         </div>

//         {loading ? (
//           <p className="text-gray-600">Loading shift duties...</p>
//         ) : error ? (
//           <p className="text-red-600">{error}</p>
//         ) : filteredDuties.length === 0 ? (
//           <p className="text-gray-600">No shift duties found for {selectedDate}.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {shifts.map((shiftTime) => {
//               const duty = filteredDuties.find(d => d.shiftTime === shiftTime);
//               if (!duty) return null;

//               const shiftColor = shiftColors[duty.shiftTime] || 'bg-white border-gray-300';

//               return (
//                 <div
//                   key={shiftTime}
//                   className={`rounded-xl shadow-md p-5 border-2 ${shiftColor} transition-all hover:scale-105`}
//                 >
//                   <div className="mb-4">
//                     <h2 className="text-xl font-bold">{duty.shiftTime} Shift</h2>
//                     <p className="text-sm text-gray-500">Date: {duty.shiftDate}</p>
//                   </div>

//                   <div className="mb-4">
//                     <h3 className="text-md font-semibold mb-2">Engineers</h3>
//                     <div className="grid grid-cols-1 gap-2">
//                       {duty.engineers.map((eng, i) => (
//                         <div
//                           key={i}
//                           className="p-2 bg-white rounded shadow text-sm border border-gray-200"
//                         >
//                           <p className="font-medium text-gray-800">{eng.name}</p>
//                           <p className="text-gray-500 italic">{eng.status}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div className="bg-green-100 p-3 rounded border-l-4 border-green-500">
//                       <h4 className="font-semibold">Technician</h4>
//                       <p className="text-sm">{duty.technician.name}</p>
//                       <p className="text-xs italic text-gray-600">{duty.technician.status}</p>
//                     </div>

//                     <div className="bg-yellow-100 p-3 rounded border-l-4 border-yellow-500">
//                       <h4 className="font-semibold">Electrician</h4>
//                       <p className="text-sm">{duty.electrician.name}</p>
//                       <p className="text-xs italic text-gray-600">{duty.electrician.status}</p>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default HomePage;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from '../components/Navbar';

// const shiftColors = {
//   Morning: 'bg-blue-50 border-blue-400 text-blue-800',
//   Evening: 'bg-purple-50 border-purple-400 text-purple-800',
//   Night: 'bg-gray-100 border-gray-400 text-gray-800'
// };

// const HomePage = () => {
//   const getTodayDate = () => {
//     const today = new Date();
//     return today.toISOString().split('T')[0]; // YYYY-MM-DD in UTC (might want local date instead)
//   };

//   const [selectedDate, setSelectedDate] = useState(getTodayDate());
//   const [shiftDuties, setShiftDuties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDuties = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get('http://localhost:3000/api/duties');
//         const dutiesFromBackend = response.data.duties.map(duty => ({
//           ...duty,
//           engineers: [
//             { name: duty.engineer1 || '', status: 'On Duty' },
//             { name: duty.engineer2 || '', status: 'On Duty' },
//             { name: duty.engineer3 || '', status: 'On Duty' },
//             { name: duty.engineer4 || '', status: 'On Duty' },
//             { name: duty.engineer5 || '', status: 'On Duty' },
//             { name: duty.engineer6 || '', status: 'On Duty' },
//           ].filter(e => e.name !== ''),
//           technician: { name: duty.technician || 'N/A', status: 'On Duty' },
//           electrician: { name: duty.electrician || 'N/A', status: 'On Duty' }
//         }));
//         setShiftDuties(dutiesFromBackend);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load shift duties. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchDuties();
//   }, []);

//   // Convert backend UTC date to local YYYY-MM-DD string for comparison
//   const toLocalDateString = (utcDateString) => {
//     const date = new Date(utcDateString);
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const day = date.getDate().toString().padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   // DEBUG: Log all duties and their local dates
//   console.log('All shift duties:', shiftDuties);
//   shiftDuties.forEach(duty => {
//     console.log('Duty ID:', duty.id, 'Local shiftDate:', toLocalDateString(duty.shiftDate));
//   });

//   // Filter duties by local date string matching selectedDate
//   const filteredDuties = shiftDuties.filter(d => {
//     const localDate = toLocalDateString(d.shiftDate);
//     return localDate === selectedDate;
//   });

//   const shifts = ['Morning', 'Evening', 'Night'];

//   return (
//     <>
//       <Navbar />

//       <div className="max-w-7xl mx-auto p-6 mt-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">Shift Duty Overview</h1>

//         {/* Date Picker */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Select Date:
//           </label>
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
//           />
//         </div>

//         {loading ? (
//           <p className="text-gray-600">Loading shift duties...</p>
//         ) : error ? (
//           <p className="text-red-600">{error}</p>
//         ) : filteredDuties.length === 0 ? (
//           <p className="text-gray-600">No shift duties found for {selectedDate}.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {shifts.map((shiftTime) => {
//               const duty = filteredDuties.find(d => d.shiftTime === shiftTime);
//               if (!duty) return null;

//               const shiftColor = shiftColors[duty.shiftTime] || 'bg-white border-gray-300';

//               return (
//                 <div
//                   key={shiftTime}
//                   className={`rounded-xl shadow-md p-5 border-2 ${shiftColor} transition-all hover:scale-105`}
//                 >
//                   <div className="mb-4">
//                     <h2 className="text-xl font-bold">{duty.shiftTime} Shift</h2>
//                     <p className="text-sm text-gray-500">
//                       Date: {toLocalDateString(duty.shiftDate)}
//                     </p>
//                   </div>

//                   <div className="mb-4">
//                     <h3 className="text-md font-semibold mb-2">Engineers</h3>
//                     <div className="grid grid-cols-1 gap-2">
//                       {duty.engineers.map((eng, i) => (
//                         <div
//                           key={i}
//                           className="p-2 bg-white rounded shadow text-sm border border-gray-200"
//                         >
//                           <p className="font-medium text-gray-800">{eng.name}</p>
//                           <p className="text-gray-500 italic">{eng.status}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div className="bg-green-100 p-3 rounded border-l-4 border-green-500">
//                       <h4 className="font-semibold">Technician</h4>
//                       <p className="text-sm">{duty.technician.name}</p>
//                       <p className="text-xs italic text-gray-600">{duty.technician.status}</p>
//                     </div>

//                     <div className="bg-yellow-100 p-3 rounded border-l-4 border-yellow-500">
//                       <h4 className="font-semibold">Electrician</h4>
//                       <p className="text-sm">{duty.electrician.name}</p>
//                       <p className="text-xs italic text-gray-600">{duty.electrician.status}</p>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default HomePage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const shiftColors = {
  Morning: 'bg-blue-50 border-blue-400 text-blue-800',
  Evening: 'bg-purple-50 border-purple-400 text-purple-800',
  Night: 'bg-gray-100 border-gray-400 text-gray-800'
};

const HomePage = () => {
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // YYYY-MM-DD in UTC (might want local date instead)
  };

  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [shiftDuties, setShiftDuties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDuties = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/duties');
        const dutiesFromBackend = response.data.duties.map(duty => ({
          ...duty,
          engineers: [
            { name: duty.engineer1 || '', status: 'On Duty' },
            { name: duty.engineer2 || '', status: 'On Duty' },
            { name: duty.engineer3 || '', status: 'On Duty' },
            { name: duty.engineer4 || '', status: 'On Duty' },
            { name: duty.engineer5 || '', status: 'On Duty' },
            { name: duty.engineer6 || '', status: 'On Duty' },
          ].filter(e => e.name !== ''),
          technician: { name: duty.technician || 'N/A', status: 'On Duty' },
          electrician: { name: duty.electrician || 'N/A', status: 'On Duty' }
        }));
        setShiftDuties(dutiesFromBackend);
        setLoading(false);
      } catch (err) {
        setError('Failed to load shift duties. Please try again later.');
        setLoading(false);
      }
    };

    fetchDuties();
  }, []);

  // Convert backend UTC date to local YYYY-MM-DD string for comparison
  const toLocalDateString = (utcDateString) => {
    const date = new Date(utcDateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Improved filtering to include Evening and Night shifts possibly starting previous day
  const filteredDuties = shiftDuties.filter(duty => {
    const localDate = toLocalDateString(duty.shiftDate);

    if (localDate === selectedDate) return true;

    // For Night shift, also check if shiftDate's previous day matches selectedDate
    if (duty.shiftTime === 'Night') {
      const dateObj = new Date(duty.shiftDate);
      dateObj.setDate(dateObj.getDate() - 1);
      if (toLocalDateString(dateObj.toISOString()) === selectedDate) return true;
    }

    // For Evening shift, also check previous day (optional, based on your shift time logic)
    if (duty.shiftTime === 'Evening') {
      const dateObj = new Date(duty.shiftDate);
      dateObj.setDate(dateObj.getDate() - 1);
      if (toLocalDateString(dateObj.toISOString()) === selectedDate) return true;
    }

    return false;
  });

  const shifts = ['Morning', 'Evening', 'Night'];

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6 mt-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Shift Duty Overview</h1>

        {/* Date Picker */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Date:
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {loading ? (
          <p className="text-gray-600">Loading shift duties...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : filteredDuties.length === 0 ? (
          <p className="text-gray-600">No shift duties found for {selectedDate}.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shifts.map((shiftTime) => {
              const duty = filteredDuties.find(d => d.shiftTime === shiftTime);
              if (!duty) return null;

              const shiftColor = shiftColors[duty.shiftTime] || 'bg-white border-gray-300';

              return (
                <div
                  key={shiftTime}
                  className={`rounded-xl shadow-md p-5 border-2 ${shiftColor} transition-all hover:scale-105`}
                >
                  <div className="mb-4">
                    <h2 className="text-xl font-bold">{duty.shiftTime} Shift</h2>
                    <p className="text-sm text-gray-500">
                      Date: {toLocalDateString(duty.shiftDate)}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-md font-semibold mb-2">Engineers</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {duty.engineers.map((eng, i) => (
                        <div
                          key={i}
                          className="p-2 bg-white rounded shadow text-sm border border-gray-200"
                        >
                          <p className="font-medium text-gray-800">{eng.name}</p>
                          <p className="text-gray-500 italic">{eng.status}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-green-100 p-3 rounded border-l-4 border-green-500">
                      <h4 className="font-semibold">Technician</h4>
                      <p className="text-sm">{duty.technician.name}</p>
                      <p className="text-xs italic text-gray-600">{duty.technician.status}</p>
                    </div>

                    <div className="bg-yellow-100 p-3 rounded border-l-4 border-yellow-500">
                      <h4 className="font-semibold">Electrician</h4>
                      <p className="text-sm">{duty.electrician.name}</p>
                      <p className="text-xs italic text-gray-600">{duty.electrician.status}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
























