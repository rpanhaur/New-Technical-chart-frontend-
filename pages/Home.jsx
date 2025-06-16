
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from '../components/Navbar';
// import { motion, AnimatePresence } from 'framer-motion';

// // Color configurations for Shift Duty Cards
// const shiftColors = {
//   Morning: 'bg-blue-50 border-blue-400 text-blue-800',
//   Evening: 'bg-purple-50 border-purple-400 text-purple-800',
//   Midnight: 'bg-gray-100 border-gray-400 text-gray-800'
// };

// // Header colors for Technical Chart by shift
// const chartHeaderColors = {
//   Morning: 'bg-blue-600',
//   Evening: 'bg-purple-600',
//   Midnight: 'bg-gray-600'
// };

// const HomePage = () => {
//   const getTodayDate = () => {
//     const today = new Date();
//     return today.toISOString().split('T')[0];
//   };

//   const [selectedDate, setSelectedDate] = useState(getTodayDate());
//   const [shiftDuties, setShiftDuties] = useState([]);
//   const [rosterList, setRosterList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expandedDutySection, setExpandedDutySection] = useState(true);
//   const [expandedChartShifts, setExpandedChartShifts] = useState({});

//   useEffect(() => {
//     const fetchDuties = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/duties');
//         const dutiesFromBackend = response.data.duties.map(duty => ({
//           ...duty,
//           engineers: [
//             { name: duty.engineer1 || '', status: duty.engineer1Status },
//             { name: duty.engineer2 || '', status: duty.engineer2Status },
//             { name: duty.engineer3 || '', status: duty.engineer3Status },
//             { name: duty.engineer4 || '', status: duty.engineer4Status },
//             { name: duty.engineer5 || '', status: duty.engineer5Status },
//             { name: duty.engineer6 || '', status: duty.engineer6Status }
//           ].filter(e => e.name !== ''),
//           technician: { name: duty.technician || 'N/A', status: duty.technicianStatus },
//           electrician: { name: duty.electrician || 'N/A', status: duty.electricianStatus }
//         }));
//         setShiftDuties(dutiesFromBackend);
//       } catch (err) {
//         setError('Failed to load shift duties. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchRoster = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/roster');
//         setRosterList(response.data.rosters || []);
//       } catch (err) {
//         console.error('Error fetching roster data:', err);
//       }
//     };

//     fetchDuties();
//     fetchRoster();
//   }, []);

//   const toLocalDateString = (utcDateString) => {
//     const date = new Date(utcDateString);
//     return date.toISOString().split('T')[0];
//   };

//   const shifts = ['Morning', 'Evening', 'Midnight'];

//   const filteredDuties = shiftDuties.filter(
//     duty => toLocalDateString(duty.shiftDate) === selectedDate
//   );

//   const filteredRoster = rosterList.filter(
//     item => toLocalDateString(item.shiftDate) === selectedDate
//   );

//   const groupedTechnicalCharts = filteredRoster.reduce((acc, item) => {
//     const shift = item.shift;
//     if (!acc[shift]) acc[shift] = [];
//     acc[shift].push(item);
//     return acc;
//   }, {});

//   const toggleChartShift = (shift) => {
//     setExpandedChartShifts(prev => ({
//       ...prev,
//       [shift]: !prev[shift]
//     }));
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="max-w-7xl mx-auto px-6 mt-10">
//         {/* Page Title and Toggle */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800">Engineering Duty Schedule</h1>
//           <button
//             className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-blue-700 transition"
//             onClick={() => setExpandedDutySection(prev => !prev)}
//           >
//             {expandedDutySection ? 'Hide Duty' : 'Show Duty'}
//           </button>
//         </div>

//         {/* Date Picker */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-1">Select Date:</label>
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded-md shadow-sm"
//           />
//         </div>

//         {/* Shift Duties Section */}
//         <AnimatePresence>
//           {expandedDutySection && (
//             <motion.div
//               className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.4 }}
//             >
//               {shifts.map((shiftTime) => {
//                 const duty = filteredDuties.find(d => d.shiftTime === shiftTime);
//                 if (!duty) return null;
//                 const shiftColor = shiftColors[duty.shiftTime] || 'bg-white border-gray-300';

//                 return (
//                   <div key={shiftTime} className={`rounded-xl shadow-md border-2 ${shiftColor}`}>
//                     <div className="p-5">
//                       <h2 className="text-xl font-bold">{duty.shiftTime} Shift</h2>
//                       <p className="text-sm text-gray-500">
//                         Date: {toLocalDateString(duty.shiftDate)}
//                       </p>
//                     </div>

//                     <div className="px-5 pb-5">
//                       <div className="mb-4">
//                         <h3 className="text-xl font-semibold mb-2">Engineers</h3>
//                         <div className="grid grid-cols-1 gap-2">
//                           {duty.engineers.map((eng, i) => (
//                             <div
//                               key={i}
//                               className="p-2 bg-white rounded shadow text-sm border border-gray-200"
//                             >
//                               <p className="font-medium text-green-800 text-2xl">{eng.name}</p>
//                               <p className="text-red-500 italic">{eng.status}</p>
//                             </div>
//                           ))}
//                         </div>
//                       </div>

//                       <div className="space-y-4">
//                         <div className="bg-green-100 p-3 rounded border-l-4 border-green-500">
//                           <h4 className="font-semibold">Technician</h4>
//                           <p className="text-sm">{duty.technician.name}</p>
//                           <p className="text-xs italic text-gray-600">{duty.technician.status}</p>
//                         </div>
//                         <div className="bg-yellow-100 p-3 rounded border-l-4 border-yellow-500">
//                           <h4 className="font-semibold">Electrician</h4>
//                           <p className="text-sm">{duty.electrician.name}</p>
//                           <p className="text-xs italic text-gray-600">{duty.electrician.status}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Technical Chart Section */}
//       <div className="max-w-7xl mx-auto px-6 mb-10">
//         <h2 className="text-4xl font-bold text-blue-800 mb-4">Today's Technical Chart</h2>
//         <h3 className="text-lg font-semibold text-gray-700 mb-4">Date: {selectedDate}</h3>

//         {shifts.map(shift => {
//           const items = groupedTechnicalCharts[shift];
//           if (!items || items.length === 0) return null;

//           const chartHeaderClass = chartHeaderColors[shift] || 'bg-green-700';

//           return (
//             <div key={shift} className="mb-8 border rounded shadow bg-white">
//               <div
//                 className={`${chartHeaderClass} px-4 py-2 border-b font-bold text-2xl text-white cursor-pointer`}
//                 onClick={() => toggleChartShift(shift)}
//               >
//                 {shift} Shift
//               </div>

//               <AnimatePresence>
//                 {expandedChartShifts[shift] && (
//                   <motion.div
//                     className="overflow-x-auto"
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: 'auto' }}
//                     exit={{ opacity: 0, height: 0 }}
//                     transition={{ duration: 0.4 }}
//                   >
//                     <table className="w-full text-sm">
//                       <thead className="bg-gray-200">
//                         <tr>
//                           <th className="p-2 text-left">SN</th>
//                           <th className="p-2 text-left">Schedule Time</th>
//                           <th className="p-2 text-left">Program Details</th>
//                           <th className="p-2 text-left">In Time</th>
//                           <th className="p-2 text-left">Out Time</th>
//                           <th className="p-2 text-left">Duration</th>
//                           <th className="p-2 text-left">On Air Time</th>
//                           <th className="p-2 text-left">Remarks</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {items.map((item, i) => (
//                           <tr key={i} className="odd:bg-white even:bg-gray-50">
//                             <td className="p-2">{item.sn}</td>
//                             <td className="p-2">{item.scheduleTime}</td>
//                             <td className="p-2">{item.programDetails}</td>
//                             <td className="p-2">{item.inTime}</td>
//                             <td className="p-2">{item.outTime}</td>
//                             <td className="p-2">{item.duration}</td>
//                             <td className="p-2">{item.onAirTime}</td>
//                             <td className="p-2">{item.remarks}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// };

// export default HomePage;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from '../components/Navbar';
// import { motion, AnimatePresence } from 'framer-motion';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// // Color configurations for Shift Duty Cards
// const shiftColors = {
//   Morning: 'bg-blue-50 border-blue-400 text-blue-800',
//   Evening: 'bg-purple-50 border-purple-400 text-purple-800',
//   Midnight: 'bg-gray-100 border-gray-400 text-gray-800'
// };

// // Header colors for Technical Chart by shift
// const chartHeaderColors = {
//   Morning: 'bg-blue-600',
//   Evening: 'bg-purple-600',
//   Midnight: 'bg-gray-600'
// };

// // Parse duration string like "HH:MM:SS" or "HH:MM:SS:FF" to seconds for comparison
// const durationToSeconds = (duration) => {
//   if (!duration) return 0;
//   const parts = duration.split(':');
//   if (parts.length < 3) return 0;

//   const hours = parseInt(parts[0], 10) || 0;
//   const minutes = parseInt(parts[1], 10) || 0;
//   const seconds = parseInt(parts[2], 10) || 0;

//   return hours * 3600 + minutes * 60 + seconds;
// };

// // Sum durations array to "HH:MM:SS" string
// const sumDurations = (durations) => {
//   let totalSeconds = durations.reduce((acc, d) => acc + durationToSeconds(d), 0);

//   const hours = Math.floor(totalSeconds / 3600);
//   totalSeconds %= 3600;
//   const minutes = Math.floor(totalSeconds / 60);
//   const seconds = totalSeconds % 60;

//   return `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
// };

// const HomePage = () => {
//   const getTodayDate = () => {
//     const today = new Date();
//     return today.toISOString().split('T')[0];
//   };

//   const [selectedDate, setSelectedDate] = useState(getTodayDate());
//   const [shiftDuties, setShiftDuties] = useState([]);
//   const [rosterList, setRosterList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expandedDutySection, setExpandedDutySection] = useState(true);
//   const [expandedChartShifts, setExpandedChartShifts] = useState({});
//   const [searchText, setSearchText] = useState('');

//   useEffect(() => {
//     const fetchDuties = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/duties');
//         const dutiesFromBackend = response.data.duties.map(duty => ({
//           ...duty,
//           engineers: [
//             { name: duty.engineer1 || '', status: duty.engineer1Status },
//             { name: duty.engineer2 || '', status: duty.engineer2Status },
//             { name: duty.engineer3 || '', status: duty.engineer3Status },
//             { name: duty.engineer4 || '', status: duty.engineer4Status },
//             { name: duty.engineer5 || '', status: duty.engineer5Status },
//             { name: duty.engineer6 || '', status: duty.engineer6Status }
//           ].filter(e => e.name !== ''),
//           technician: { name: duty.technician || 'N/A', status: duty.technicianStatus },
//           electrician: { name: duty.electrician || 'N/A', status: duty.electricianStatus }
//         }));
//         setShiftDuties(dutiesFromBackend);
//       } catch (err) {
//         setError('Failed to load shift duties. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchRoster = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/roster');
//         setRosterList(response.data.rosters || []);
//       } catch (err) {
//         console.error('Error fetching roster data:', err);
//       }
//     };

//     fetchDuties();
//     fetchRoster();
//   }, []);

//   const toLocalDateString = (utcDateString) => {
//     const date = new Date(utcDateString);
//     return date.toISOString().split('T')[0];
//   };

//   const shifts = ['Morning', 'Evening', 'Midnight'];

//   const filteredDuties = shiftDuties.filter(
//     duty => toLocalDateString(duty.shiftDate) === selectedDate
//   );

//   // Filter roster by date and search text
//   const filteredRoster = rosterList.filter(
//     item =>
//       toLocalDateString(item.shiftDate) === selectedDate &&
//       item.programDetails.toLowerCase().includes(searchText.toLowerCase())
//   );

//   const groupedTechnicalCharts = filteredRoster.reduce((acc, item) => {
//     const shift = item.shift;
//     if (!acc[shift]) acc[shift] = [];
//     acc[shift].push(item);
//     return acc;
//   }, {});

//   const toggleChartShift = (shift) => {
//     setExpandedChartShifts(prev => ({
//       ...prev,
//       [shift]: !prev[shift]
//     }));
//   };

//   // PDF Export function
//   const exportToPDF = (shift) => {
//     try {
//       const doc = new jsPDF();
//       doc.setFontSize(18);
//       doc.text(`${shift} Shift Technical Chart - ${selectedDate}`, 14, 22);

//       const items = groupedTechnicalCharts[shift] || [];
//       if (items.length === 0) {
//         alert('No data to export for this shift.');
//         return;
//       }

//       const tableColumn = [
//         "SN",
//         "Schedule Time",
//         "Program Details",
//         "In Time",
//         "Out Time",
//         "Duration",
//         "On Air Time",
//         "Remarks"
//       ];

//       const tableRows = items.map(item => [
//         item.sn,
//         item.scheduleTime,
//         item.programDetails,
//         item.inTime,
//         item.outTime,
//         item.duration,
//         item.onAirTime,
//         item.remarks
//       ]);

//       doc.autoTable({
//         head: [tableColumn],
//         body: tableRows,
//         startY: 30,
//         styles: { fontSize: 8 },
//         headStyles: { fillColor: [41, 128, 185] }
//       });

//       doc.save(`${shift}_Technical_Chart_${selectedDate}.pdf`);
//     } catch (err) {
//       console.error('PDF export error:', err);
//       alert('Failed to export PDF. See console for details.');
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="max-w-7xl mx-auto px-6 mt-10">
//         {/* Page Title and Toggle */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800">Engineering Duty Schedule</h1>
//           <button
//             className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-blue-700 transition"
//             onClick={() => setExpandedDutySection(prev => !prev)}
//           >
//             {expandedDutySection ? 'Hide Duty' : 'Show Duty'}
//           </button>
//         </div>

//         {/* Date Picker */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-1">Select Date:</label>
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded-md shadow-sm"
//           />
//         </div>

//         {/* Shift Duties Section */}
//         <AnimatePresence>
//           {expandedDutySection && (
//             <motion.div
//               className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.4 }}
//             >
//               {shifts.map((shiftTime) => {
//                 const duty = filteredDuties.find(d => d.shiftTime === shiftTime);
//                 if (!duty) return null;
//                 const shiftColor = shiftColors[duty.shiftTime] || 'bg-white border-gray-300';

//                 return (
//                   <div key={shiftTime} className={`rounded-xl shadow-md border-2 ${shiftColor}`}>
//                     <div className="p-5">
//                       <h2 className="text-xl font-bold">{duty.shiftTime} Shift</h2>
//                       <p className="text-sm text-gray-500">
//                         Date: {toLocalDateString(duty.shiftDate)}
//                       </p>
//                     </div>

//                     <div className="px-5 pb-5">
//                       <div className="mb-4">
//                         <h3 className="text-xl font-semibold mb-2">Engineers</h3>
//                         <div className="grid grid-cols-1 gap-2">
//                           {duty.engineers.map((eng, i) => (
//                             <div
//                               key={i}
//                               className="p-2 bg-white rounded shadow text-sm border border-gray-200"
//                             >
//                               <p className="font-medium text-green-800 text-2xl">{eng.name}</p>
//                               <p className="text-red-500 italic">{eng.status}</p>
//                             </div>
//                           ))}
//                         </div>
//                       </div>

//                       <div className="space-y-4">
//                         <div className="bg-green-100 p-3 rounded border-l-4 border-green-500">
//                           <h4 className="font-semibold">Technician</h4>
//                           <p className="text-sm">{duty.technician.name}</p>
//                           <p className="text-xs italic text-gray-600">{duty.technician.status}</p>
//                         </div>
//                         <div className="bg-yellow-100 p-3 rounded border-l-4 border-yellow-500">
//                           <h4 className="font-semibold">Electrician</h4>
//                           <p className="text-sm">{duty.electrician.name}</p>
//                           <p className="text-xs italic text-gray-600">{duty.electrician.status}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Technical Chart Section */}
//       <div className="max-w-7xl mx-auto px-6 mb-10">
//         <div className="flex justify-between items-center mb-2">
//           <h2 className="text-4xl font-bold text-blue-800">Today's Technical Chart</h2>

//           {/* Search Box */}
//           <input
//             type="text"
//             placeholder="Search by Program Details"
//             className="border border-gray-300 rounded px-3 py-1 shadow-sm"
//             value={searchText}
//             onChange={e => setSearchText(e.target.value)}
//           />
//         </div>
//         <h3 className="text-lg font-semibold text-gray-700 mb-4">Date: {selectedDate}</h3>

//         {shifts.map(shift => {
//           const items = groupedTechnicalCharts[shift];
//           if (!items || items.length === 0) return null;

//           // Calculate total duration for this shift
//           const totalDuration = sumDurations(items.map(i => i.duration));

//           const chartHeaderClass = chartHeaderColors[shift] || 'bg-green-700';

//           return (
//             <div key={shift} className="mb-8 border rounded shadow bg-white">
//               <div
//                 className={`${chartHeaderClass} px-4 py-2 border-b font-bold text-2xl text-white cursor-pointer flex justify-between items-center`}
//                 onClick={() => toggleChartShift(shift)}
//               >
//                 <span>{shift} Shift</span>
//                 <div className="flex items-center space-x-4">
//                   <span>Total Duration: <strong>{totalDuration}</strong></span>
//                   <button
//                     onClick={e => {
//                       e.stopPropagation();
//                       exportToPDF(shift);
//                     }}
//                     className="bg-white text-blue-700 px-3 py-1 rounded shadow hover:bg-blue-100 transition"
//                   >
//                     Export PDF
//                   </button>
//                 </div>
//               </div>

//               <AnimatePresence>
//                 {expandedChartShifts[shift] && (
//                   <motion.div
//                     className="overflow-x-auto"
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: 'auto' }}
//                     exit={{ opacity: 0, height: 0 }}
//                     transition={{ duration: 0.4 }}
//                   >
//                     <table className="w-full text-sm">
//                       <thead className="bg-gray-200">
//                         <tr>
//                           <th className="p-2 text-left">SN</th>
//                           <th className="p-2 text-left">Schedule Time</th>
//                           <th className="p-2 text-left">Program Details</th>
//                           <th className="p-2 text-left">In Time</th>
//                           <th className="p-2 text-left">Out Time</th>
//                           <th className="p-2 text-left">Duration</th>
//                           <th className="p-2 text-left">On Air Time</th>
//                           <th className="p-2 text-left">Remarks</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {items.map((item, i) => {
//                           const isLongDuration = durationToSeconds(item.duration) > 3600; // highlight if duration > 1 hour
//                           const rowStatus = item.remarks ? item.remarks.toLowerCase() : '';
//                           const statusClass = rowStatus.includes('late')
//                             ? 'bg-red-100'
//                             : rowStatus.includes('completed')
//                             ? 'bg-green-100'
//                             : 'bg-white';

//                           return (
//                             <tr
//                               key={i}
//                               className={`odd:bg-white even:bg-gray-50 ${statusClass} ${isLongDuration ? 'font-bold text-red-600' : ''}`}
//                             >
//                               <td className="p-2">{item.sn}</td>
//                               <td className="p-2">{item.scheduleTime}</td>
//                               <td className="p-2">{item.programDetails}</td>
//                               <td className="p-2">{item.inTime}</td>
//                               <td className="p-2">{item.outTime}</td>
//                               <td className="p-2">{item.duration}</td>
//                               <td className="p-2">{item.onAirTime}</td>
//                               <td className="p-2 italic">{item.remarks}</td>
//                             </tr>
//                           );
//                         })}
//                       </tbody>
//                     </table>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// };

// export default HomePage;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from '../components/Navbar';
// import { motion, AnimatePresence } from 'framer-motion';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// // Color configurations for Shift Duty Cards
// const shiftColors = {
//   Morning: 'bg-blue-50 border-blue-400 text-blue-800',
//   Evening: 'bg-purple-50 border-purple-400 text-purple-800',
//   Midnight: 'bg-gray-100 border-gray-400 text-gray-800',
// };

// // Header colors for Technical Chart by shift
// const chartHeaderColors = {
//   Morning: 'bg-blue-600',
//   Evening: 'bg-purple-600',
//   Midnight: 'bg-gray-600',
// };

// // Parse duration string like "HH:MM:SS" or "HH:MM:SS:FF" to seconds for comparison
// const durationToSeconds = (duration) => {
//   if (!duration) return 0;
//   const parts = duration.split(':');
//   if (parts.length < 3) return 0;

//   const hours = parseInt(parts[0], 10) || 0;
//   const minutes = parseInt(parts[1], 10) || 0;
//   const seconds = parseInt(parts[2], 10) || 0;

//   return hours * 3600 + minutes * 60 + seconds;
// };

// // Sum durations array to "HH:MM:SS" string
// const sumDurations = (durations) => {
//   let totalSeconds = durations.reduce((acc, d) => acc + durationToSeconds(d), 0);

//   const hours = Math.floor(totalSeconds / 3600);
//   totalSeconds %= 3600;
//   const minutes = Math.floor(totalSeconds / 60);
//   const seconds = totalSeconds % 60;

//   return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
// };

// const HomePage = () => {
//   const getTodayDate = () => {
//     const today = new Date();
//     return today.toISOString().split('T')[0];
//   };

//   const [selectedDate, setSelectedDate] = useState(getTodayDate());
//   const [shiftDuties, setShiftDuties] = useState([]);
//   const [rosterList, setRosterList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expandedDutySection, setExpandedDutySection] = useState(true);
//   const [expandedChartShifts, setExpandedChartShifts] = useState({});
//   const [searchText, setSearchText] = useState('');

//   useEffect(() => {
//     const fetchDuties = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/duties');
//         const dutiesFromBackend = response.data.duties.map((duty) => ({
//           ...duty,
//           engineers: [
//             { name: duty.engineer1 || '', status: duty.engineer1Status },
//             { name: duty.engineer2 || '', status: duty.engineer2Status },
//             { name: duty.engineer3 || '', status: duty.engineer3Status },
//             { name: duty.engineer4 || '', status: duty.engineer4Status },
//             { name: duty.engineer5 || '', status: duty.engineer5Status },
//             { name: duty.engineer6 || '', status: duty.engineer6Status },
//           ].filter((e) => e.name !== ''),
//           technician: { name: duty.technician || 'N/A', status: duty.technicianStatus },
//           electrician: { name: duty.electrician || 'N/A', status: duty.electricianStatus },
//         }));
//         setShiftDuties(dutiesFromBackend);
//       } catch (err) {
//         setError('Failed to load shift duties. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchRoster = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/roster');
//         setRosterList(response.data.rosters || []);
//       } catch (err) {
//         console.error('Error fetching roster data:', err);
//       }
//     };

//     fetchDuties();
//     fetchRoster();
//   }, []);

//   const toLocalDateString = (utcDateString) => {
//     if (!utcDateString) return '';
//     const date = new Date(utcDateString);
//     return date.toISOString().split('T')[0];
//   };

//   const shifts = ['Morning', 'Evening', 'Midnight'];

//   const filteredDuties = shiftDuties.filter(
//     (duty) => toLocalDateString(duty.shiftDate) === selectedDate
//   );

//   // Filter roster by date and search text (case insensitive)
//   const filteredRoster = rosterList.filter(
//     (item) =>
//       toLocalDateString(item.shiftDate) === selectedDate &&
//       item.programDetails.toLowerCase().includes(searchText.toLowerCase())
//   );

//   // Group technical charts by shift
//   const groupedTechnicalCharts = filteredRoster.reduce((acc, item) => {
//     const shift = item.shift;
//     if (!acc[shift]) acc[shift] = [];
//     acc[shift].push(item);
//     return acc;
//   }, {});

//   const toggleChartShift = (shift) => {
//     setExpandedChartShifts((prev) => ({
//       ...prev,
//       [shift]: !prev[shift],
//     }));
//   };

//   // PDF Export function
//   const exportToPDF = (shift) => {
//     try {
//       const doc = new jsPDF();
//       doc.setFontSize(18);
//       doc.text(`${shift} Shift Technical Chart - ${selectedDate}`, 14, 22);

//       const items = groupedTechnicalCharts[shift] || [];
//       if (items.length === 0) {
//         alert('No data to export for this shift.');
//         return;
//       }

//       const tableColumn = [
//         'SN',
//         'Schedule Time',
//         'Program Details',
//         'In Time',
//         'Out Time',
//         'Duration',
//         'On Air Time',
//         'Remarks',
//       ];

//       const tableRows = items.map((item) => [
//         item.sn,
//         item.scheduleTime,
//         item.programDetails,
//         item.inTime,
//         item.outTime,
//         item.duration,
//         item.onAirTime,
//         item.remarks,
//       ]);

//       doc.autoTable({
//         head: [tableColumn],
//         body: tableRows,
//         startY: 30,
//         styles: { fontSize: 8 },
//         headStyles: { fillColor: [41, 128, 185] },
//       });

//       doc.save(`${shift}_Technical_Chart_${selectedDate}.pdf`);
//     } catch (err) {
//       console.error('PDF export error:', err);
//       alert('Failed to export PDF. See console for details.');
//     }
//   };

//   if (loading) return <div className="text-center mt-20 text-gray-500">Loading...</div>;
//   if (error) return <div className="text-center mt-20 text-red-600">{error}</div>;

//   return (
//     <>
//       <Navbar />

//       <div className="max-w-7xl mx-auto px-6 mt-10">
//         {/* Page Title and Toggle */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800">Engineering Duty Schedule</h1>
//           <button
//             className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-blue-700 transition"
//             onClick={() => setExpandedDutySection((prev) => !prev)}
//           >
//             {expandedDutySection ? 'Hide Duty' : 'Show Duty'}
//           </button>
//         </div>

//         {/* Date Picker */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-1">Select Date:</label>
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded-md shadow-sm"
//           />
//         </div>

//         {/* Shift Duties Section */}
//         <AnimatePresence>
//           {expandedDutySection && (
//             <motion.div
//               className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.4 }}
//             >
//               {shifts.map((shiftTime) => {
//                 const duty = filteredDuties.find((d) => d.shiftTime === shiftTime);
//                 if (!duty) return null;
//                 const shiftColor = shiftColors[duty.shiftTime] || 'bg-white border-gray-300';

//                 return (
//                   <div key={shiftTime} className={`rounded-xl shadow-md border-2 ${shiftColor}`}>
//                     <div className="p-5">
//                       <h2 className="text-xl font-bold">{duty.shiftTime} Shift</h2>
//                       <p className="text-sm text-gray-500">Date: {toLocalDateString(duty.shiftDate)}</p>
//                     </div>

//                     <div className="px-5 pb-5">
//                       <div className="mb-4">
//                         <h3 className="text-xl font-semibold mb-2">Engineers</h3>
//                         <div className="grid grid-cols-1 gap-2">
//                           {duty.engineers.map((eng, i) => (
//                             <div
//                               key={i}
//                               className="p-2 bg-white rounded shadow text-sm border border-gray-200"
//                             >
//                               <p className="font-medium text-green-800 text-2xl">{eng.name}</p>
//                               <p className="text-red-500 italic">{eng.status}</p>
//                             </div>
//                           ))}
//                         </div>
//                       </div>

//                       <div className="space-y-4">
//                         <div className="bg-green-100 p-3 rounded border-l-4 border-green-500">
//                           <h4 className="font-semibold">Technician</h4>
//                           <p className="text-sm">{duty.technician.name}</p>
//                           <p className="text-xs italic text-gray-600">{duty.technician.status}</p>
//                         </div>
//                         <div className="bg-yellow-100 p-3 rounded border-l-4 border-yellow-500">
//                           <h4 className="font-semibold">Electrician</h4>
//                           <p className="text-sm">{duty.electrician.name}</p>
//                           <p className="text-xs italic text-gray-600">{duty.electrician.status}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Technical Chart Section */}
//       <div className="max-w-7xl mx-auto px-6 mb-10">
//         <div className="flex justify-between items-center mb-2">
//           <h2 className="text-4xl font-bold text-blue-800">Today's Technical Chart</h2>

//           {/* Search Box */}
//           <input
//             type="text"
//             placeholder="Search by Program Details"
//             className="border border-gray-300 rounded px-3 py-1 shadow-sm"
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//           />
//         </div>
//         <h3 className="text-lg font-semibold text-gray-700 mb-4">Date: {selectedDate}</h3>

//         {shifts.map((shift) => {
//           const items = groupedTechnicalCharts[shift];
//           if (!items || items.length === 0) return null;

//           // Calculate total duration for this shift
//           const totalDuration = sumDurations(items.map((i) => i.duration));

//           const chartHeaderClass = chartHeaderColors[shift] || 'bg-green-700';

//           return (
//             <div key={shift} className="mb-8 border rounded shadow bg-white">
//               <div
//                 className={`${chartHeaderClass} px-4 py-2 border-b font-bold text-2xl text-white cursor-pointer flex justify-between items-center`}
//                 onClick={() => toggleChartShift(shift)}
//               >
//                 <span>{shift} Shift</span>
//                 <div className="flex items-center space-x-4">
//                   <span>
//                     Total Duration: <strong>{totalDuration}</strong>
//                   </span>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       exportToPDF(shift);
//                     }}
//                     className="bg-white text-blue-700 px-3 py-1 rounded shadow hover:bg-blue-100 transition"
//                   >
//                     Generate Report
//                   </button>
//                 </div>
//               </div>

//               <AnimatePresence>
//                 {expandedChartShifts[shift] && (
//                   <motion.div
//                     className="overflow-x-auto"
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: 'auto' }}
//                     exit={{ opacity: 0, height: 0 }}
//                     transition={{ duration: 0.4 }}
//                   >
//                     <table className="w-full text-sm">
//                       <thead className="bg-gray-200">
//                         <tr>
//                           <th className="p-2 text-left">SN</th>
//                           <th className="p-2 text-left">Schedule Time</th>
//                           <th className="p-2 text-left">Program Details</th>
//                           <th className="p-2 text-left">In Time</th>
//                           <th className="p-2 text-left">Out Time</th>
//                           <th className="p-2 text-left">Duration</th>
//                           <th className="p-2 text-left">On Air Time</th>
//                           <th className="p-2 text-left">Remarks</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {items.map((item, i) => {
//                           const isLongDuration = durationToSeconds(item.duration) > 3600; // highlight if duration > 1 hour
//                           const rowStatus = item.remarks ? item.remarks.toLowerCase() : '';
//                           const statusClass = rowStatus.includes('late')
//                             ? 'bg-red-100'
//                             : rowStatus.includes('completed')
//                             ? 'bg-green-100'
//                             : 'bg-white';

//                           return (
//                             <tr
//                               key={i}
//                               className={`odd:bg-white even:bg-gray-50 ${statusClass} ${
//                                 isLongDuration ? 'font-bold text-red-600' : ''
//                               }`}
//                             >
//                               <td className="p-2">{item.sn}</td>
//                               <td className="p-2">{item.scheduleTime}</td>
//                               <td className="p-2">{item.programDetails}</td>
//                               <td className="p-2">{item.inTime}</td>
//                               <td className="p-2">{item.outTime}</td>
//                               <td className="p-2">{item.duration}</td>
//                               <td className="p-2">{item.onAirTime}</td>
//                               <td className="p-2 italic">{item.remarks}</td>
//                             </tr>
//                           );
//                         })}
//                       </tbody>
//                     </table>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// };

// export default HomePage;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // ✅ Correct import for Vite

// Color configurations for Shift Duty Cards
const shiftColors = {
  Morning: 'bg-blue-50 border-blue-400 text-blue-800',
  Evening: 'bg-purple-50 border-purple-400 text-purple-800',
  Midnight: 'bg-gray-100 border-gray-400 text-gray-800',
};

// Header colors for Technical Chart by shift
const chartHeaderColors = {
  Morning: 'bg-blue-600',
  Evening: 'bg-purple-600',
  Midnight: 'bg-gray-600',
};

// Parse duration string like "HH:MM:SS" or "HH:MM:SS:FF" to seconds for comparison
const durationToSeconds = (duration) => {
  if (!duration) return 0;
  const parts = duration.split(':');
  if (parts.length < 3) return 0;
  const hours = parseInt(parts[0], 10) || 0;
  const minutes = parseInt(parts[1], 10) || 0;
  const seconds = parseInt(parts[2], 10) || 0;
  return hours * 3600 + minutes * 60 + seconds;
};

// Sum durations array to "HH:MM:SS" string
const sumDurations = (durations) => {
  let totalSeconds = durations.reduce((acc, d) => acc + durationToSeconds(d), 0);
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const HomePage = () => {
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [shiftDuties, setShiftDuties] = useState([]);
  const [rosterList, setRosterList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedDutySection, setExpandedDutySection] = useState(true);
  const [expandedChartShifts, setExpandedChartShifts] = useState({});
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchDuties = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/duties');
        const dutiesFromBackend = response.data.duties.map((duty) => ({
          ...duty,
          engineers: [
            { name: duty.engineer1 || '', status: duty.engineer1Status },
            { name: duty.engineer2 || '', status: duty.engineer2Status },
            { name: duty.engineer3 || '', status: duty.engineer3Status },
            { name: duty.engineer4 || '', status: duty.engineer4Status },
            { name: duty.engineer5 || '', status: duty.engineer5Status },
            { name: duty.engineer6 || '', status: duty.engineer6Status },
          ].filter((e) => e.name !== ''),
          technician: { name: duty.technician || 'N/A', status: duty.technicianStatus },
          electrician: { name: duty.electrician || 'N/A', status: duty.electricianStatus },
        }));
        setShiftDuties(dutiesFromBackend);
      } catch (err) {
        setError('Failed to load shift duties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const fetchRoster = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/roster');
        setRosterList(response.data.rosters || []);
      } catch (err) {
        console.error('Error fetching roster data:', err);
      }
    };

    fetchDuties();
    fetchRoster();
  }, []);

  const toLocalDateString = (utcDateString) => {
    if (!utcDateString) return '';
    const date = new Date(utcDateString);
    return date.toISOString().split('T')[0];
  };

  const shifts = ['Morning', 'Evening', 'Midnight'];
  const filteredDuties = shiftDuties.filter(
    (duty) => toLocalDateString(duty.shiftDate) === selectedDate
  );

  // Filter roster by date and search text (case insensitive)
  const filteredRoster = rosterList.filter(
    (item) =>
      toLocalDateString(item.shiftDate) === selectedDate &&
      item.programDetails?.toLowerCase().includes(searchText.toLowerCase())
  );

  // Group technical charts by shift
  const groupedTechnicalCharts = filteredRoster.reduce((acc, item) => {
    const shift = item.shift;
    if (!acc[shift]) acc[shift] = [];
    acc[shift].push(item);
    return acc;
  }, {});

  const toggleChartShift = (shift) => {
    setExpandedChartShifts((prev) => ({
      ...prev,
      [shift]: !prev[shift],
    }));
  };

  // ✅ Fixed PDF Export Function
  const exportToPDF = (shift) => {
    try {
      const doc = new jsPDF();
      const items = groupedTechnicalCharts[shift] || [];
      
      // Debug: Check data structure
      console.log('Exporting data:', items);
      
      if (items.length === 0) {
        alert('No data available for this shift to export.');
        return;
      }

      // Add title
      doc.setFontSize(18);
      doc.text(`${shift} Shift Technical Chart - ${selectedDate}`, 14, 22);

      // Define table headers
      const tableColumn = [
        'SN',
        'Schedule Time',
        'Program Details',
        'In Time',
        'Out Time',
        'Duration',
        'On Air Time',
        'Remarks',
      ];

      // Map data with fallbacks for undefined values
      const tableRows = items.map((item) => [
        item.sn || '',
        item.scheduleTime || '',
        item.programDetails || '',
        item.inTime || '',
        item.outTime || '',
        item.duration || '',
        item.onAirTime || '',
        item.remarks || '',
      ]);

      // Generate PDF table ✅ Use the autoTable function directly
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 30,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [41, 128, 185] },
      });

      // Save the PDF
      doc.save(`${shift}_Technical_Chart_${selectedDate}.pdf`);
    } catch (err) {
      console.error('PDF Export Error:', err);
      alert('Failed to generate PDF report. Please check console for details.');
    }
  };

  if (loading) return <div className="text-center mt-20 text-gray-500">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-red-600">{error}</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 mt-10">
        {/* Page Title and Toggle */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Engineering Duty Schedule</h1>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-blue-700 transition"
            onClick={() => setExpandedDutySection((prev) => !prev)}
          >
            {expandedDutySection ? 'Hide Duty' : 'Show Duty'}
          </button>
        </div>
        
        {/* Date Picker */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        
        {/* Shift Duties Section */}
        <AnimatePresence>
          {expandedDutySection && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
            >
              {shifts.map((shiftTime) => {
                const duty = filteredDuties.find((d) => d.shiftTime === shiftTime);
                if (!duty) return null;
                const shiftColor = shiftColors[duty.shiftTime] || 'bg-white border-gray-300';
                return (
                  <div key={shiftTime} className={`rounded-xl shadow-md border-2 ${shiftColor}`}>
                    <div className="p-5">
                      <h2 className="text-xl font-bold">{duty.shiftTime} Shift</h2>
                      <p className="text-sm text-gray-500">Date: {toLocalDateString(duty.shiftDate)}</p>
                    </div>
                    <div className="px-5 pb-5">
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-2">Engineers</h3>
                        <div className="grid grid-cols-1 gap-2">
                          {duty.engineers.map((eng, i) => (
                            <div
                              key={i}
                              className="p-2 bg-white rounded shadow text-sm border border-gray-200"
                            >
                              <p className="font-medium text-green-800 text-2xl">{eng.name}</p>
                              <p className="text-red-500 italic">{eng.status}</p>
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
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Technical Chart Section */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-4xl font-bold text-blue-800">Today's Technical Chart</h2>
          {/* Search Box */}
          <input
            type="text"
            placeholder="Search by Program Details"
            className="border border-gray-300 rounded px-3 py-1 shadow-sm"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Date: {selectedDate}</h3>
        {shifts.map((shift) => {
          const items = groupedTechnicalCharts[shift];
          if (!items || items.length === 0) return null;
          // Calculate total duration for this shift
          const totalDuration = sumDurations(items.map((i) => i.duration));
          const chartHeaderClass = chartHeaderColors[shift] || 'bg-green-700';
          return (
            <div key={shift} className="mb-8 border rounded shadow bg-white">
              <div
                className={`${chartHeaderClass} px-4 py-2 border-b font-bold text-2xl text-white cursor-pointer flex justify-between items-center`}
                onClick={() => toggleChartShift(shift)}
              >
                <span>{shift} Shift</span>
                <div className="flex items-center space-x-4">
                  <span>
                    Total Duration: <strong>{totalDuration}</strong>
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      exportToPDF(shift);
                    }}
                    className="bg-white text-blue-700 px-3 py-1 rounded shadow hover:bg-blue-100 transition"
                  >
                    Generate Report
                  </button>
                </div>
              </div>
              <AnimatePresence>
                {expandedChartShifts[shift] && (
                  <motion.div
                    className="overflow-x-auto"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <table className="w-full text-sm">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="p-2 text-left">SN</th>
                          <th className="p-2 text-left">Schedule Time</th>
                          <th className="p-2 text-left">Program Details</th>
                          <th className="p-2 text-left">In Time</th>
                          <th className="p-2 text-left">Out Time</th>
                          <th className="p-2 text-left">Duration</th>
                          <th className="p-2 text-left">On Air Time</th>
                          <th className="p-2 text-left">Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, i) => {
                          const isLongDuration = durationToSeconds(item.duration) > 3600;
                          const rowStatus = item.remarks ? item.remarks.toLowerCase() : '';
                          const statusClass = rowStatus.includes('late')
                            ? 'bg-red-100'
                            : rowStatus.includes('completed')
                            ? 'bg-green-100'
                            : 'bg-white';
                          return (
                            <tr
                              key={i}
                              className={`odd:bg-white even:bg-gray-50 ${statusClass} ${
                                isLongDuration ? 'font-bold text-red-600' : ''
                              }`}
                            >
                              <td className="p-2">{item.sn}</td>
                              <td className="p-2">{item.scheduleTime}</td>
                              <td className="p-2">{item.programDetails}</td>
                              <td className="p-2">{item.inTime}</td>
                              <td className="p-2">{item.outTime}</td>
                              <td className="p-2">{item.duration}</td>
                              <td className="p-2">{item.onAirTime}</td>
                              <td className="p-2 italic">{item.remarks}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HomePage;





































































































































































































