// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from '../components/Navbar';
// import { motion, AnimatePresence } from 'framer-motion';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

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

// // Utility: Parse duration string like "HH:MM:SS" to seconds
// const durationToSeconds = (duration) => {
//   if (!duration) return 0;
//   const parts = duration.split(':');
//   if (parts.length < 3) return 0;
//   const hours = parseInt(parts[0], 10) || 0;
//   const minutes = parseInt(parts[1], 10) || 0;
//   const seconds = parseInt(parts[2], 10) || 0;
//   return hours * 3600 + minutes * 60 + seconds;
// };

// // Utility: Sum durations array to "HH:MM:SS" string
// const sumDurations = (durations) => {
//   let totalSeconds = durations.reduce((acc, d) => acc + durationToSeconds(d), 0);
//   const hours = Math.floor(totalSeconds / 3600);
//   totalSeconds %= 3600;
//   const minutes = Math.floor(totalSeconds / 60);
//   const seconds = totalSeconds % 60;
//   return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
// };

// const HomePage = () => {
//   // Helper: Format today's date as YYYY-MM-DD
//   const getTodayDate = () => {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, '0');
//     const day = String(today.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   // State Management
//   const [selectedDate, setSelectedDate] = useState(getTodayDate());
//   const [shiftDuties, setShiftDuties] = useState([]);
//   const [rosterList, setRosterList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expandedDutySection, setExpandedDutySection] = useState(true);
//   const [expandedChartShifts, setExpandedChartShifts] = useState({});
//   const [searchText, setSearchText] = useState('');

//   // Fetch Shift Duties
//   useEffect(() => {
//     const fetchDuties = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/duties');
//         const dutiesFromBackend = response.data.duties.map((duty) => ({
//           ...duty,
//           engineers: [
//             { name: duty.engineer1 || '', status: duty.engineer1Status || 'N/A' },
//             { name: duty.engineer2 || '', status: duty.engineer2Status || 'N/A' },
//             { name: duty.engineer3 || '', status: duty.engineer3Status || 'N/A' },
//             { name: duty.engineer4 || '', status: duty.engineer4Status || 'N/A' },
//             { name: duty.engineer5 || '', status: duty.engineer5Status || 'N/A' },
//             { name: duty.engineer6 || '', status: duty.engineer6Status || 'N/A' },
//           ].filter((e) => e.name.trim() !== ''),
//           technician: { name: duty.technician || 'N/A', status: duty.technicianStatus || 'N/A' },
//           electrician: { name: duty.electrician || 'N/A', status: duty.electricianStatus || 'N/A' },
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

//   const filteredRoster = rosterList.filter(
//     (item) =>
//       toLocalDateString(item.shiftDate) === selectedDate &&
//       item.programDetails?.toLowerCase().includes(searchText.toLowerCase())
//   );

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

//   // ✅ PDF Export Function for Technical Chart (Single Shift) - Save Version
//   const exportToPDF = (shift) => {
//     try {
//       const doc = new jsPDF();
//       const items = groupedTechnicalCharts[shift] || [];
//       if (items.length === 0) {
//         alert('No data available for this shift to export.');
//         return;
//       }

//       doc.setFontSize(18);
//       doc.text(`${shift} Shift Technical Chart - ${selectedDate}`, 14, 22);

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
//         item.sn || '',
//         item.scheduleTime || '',
//         item.programDetails || '',
//         item.inTime || '',
//         item.outTime || '',
//         item.duration || '',
//         item.onAirTime || '',
//         item.remarks || '',
//       ]);

//       autoTable(doc, {
//         head: [tableColumn],
//         body: tableRows,
//         startY: 30,
//         styles: { fontSize: 8 },
//         headStyles: { fillColor: [41, 128, 185] },
//       });

//       doc.save(`${shift}_Technical_Chart_${selectedDate}.pdf`);
//     } catch (err) {
//       console.error('PDF Export Error:', err);
//       alert('Failed to generate PDF report. Please check console for details.');
//     }
//   };

//   // ✅ Generate Base64 PDF for Technical Chart (used for Email)
//   const generateTechnicalChartPDFBase64 = (shift) => {
//     const doc = new jsPDF();
//     const items = groupedTechnicalCharts[shift] || [];

//     doc.setFontSize(18);
//     doc.text(`${shift} Shift Technical Chart - ${selectedDate}`, 14, 22);

//     const tableColumn = [
//       'SN',
//       'Schedule Time',
//       'Program Details',
//       'In Time',
//       'Out Time',
//       'Duration',
//       'On Air Time',
//       'Remarks',
//     ];

//     const tableRows = items.map((item) => [
//       item.sn || '',
//       item.scheduleTime || '',
//       item.programDetails || '',
//       item.inTime || '',
//       item.outTime || '',
//       item.duration || '',
//       item.onAirTime || '',
//       item.remarks || '',
//     ]);

//     autoTable(doc, {
//       head: [tableColumn],
//       body: tableRows,
//       startY: 30,
//       styles: { fontSize: 8 },
//       headStyles: { fillColor: [41, 128, 185] },
//     });

//     return doc.output('datauristring');
//   };

//   // ✅ Export Engineering Duty Schedule as PDF (All Shifts)
//   const exportDutyScheduleToPDF = () => {
//     try {
//       const doc = new jsPDF();
//       let startY = 20;

//       shifts.forEach((shift) => {
//         const duty = filteredDuties.find((d) => d.shiftTime === shift);
//         if (!duty) return;

//         doc.setFontSize(16);
//         doc.text(`${shift} Shift - Engineering Duty Schedule`, 14, startY);
//         startY += 8;

//         doc.setFontSize(12);
//         doc.text(`Date: ${selectedDate}`, 14, startY);
//         startY += 10;

//         doc.setFontSize(14);
//         doc.text("Engineers", 14, startY);
//         startY += 6;

//         const engineerData = duty.engineers.map(e => [e.name, e.status]);
//         autoTable(doc, {
//           head: [['Name', 'Status']],
//           body: engineerData,
//           startY,
//           styles: { fontSize: 10 },
//           headStyles: {
//             fillColor: shift === 'Morning' ? [41, 128, 185] :
//               shift === 'Evening' ? [127, 63, 152] : [128, 128, 128]
//           }
//         });
//         startY = doc.lastAutoTable.finalY + 8;

//         doc.setFontSize(14);
//         doc.text("Technician", 14, startY);
//         startY += 6;

//         autoTable(doc, {
//           body: [[duty.technician.name, duty.technician.status]],
//           startY,
//           styles: { fontSize: 10 },
//           headStyles: { fillColor: [39, 174, 96] }
//         });
//         startY = doc.lastAutoTable.finalY + 8;

//         doc.setFontSize(14);
//         doc.text("Electrician", 14, startY);
//         startY += 6;

//         autoTable(doc, {
//           body: [[duty.electrician.name, duty.electrician.status]],
//           startY,
//           styles: { fontSize: 10 },
//           headStyles: { fillColor: [241, 196, 15] }
//         });
//         startY = doc.lastAutoTable.finalY + 15;
//       });

//       doc.save(`Engineering_Duty_Schedule_Report_${selectedDate}.pdf`);
//     } catch (err) {
//       console.error('Duty Schedule PDF Export Error:', err);
//       alert('Failed to generate Engineering Duty Schedule PDF. Check console for details.');
//     }
//   };

//   // ✅ Generate Base64 PDF for Engineering Duty Schedule
//   const generateDutySchedulePDFBase64 = () => {
//     const doc = new jsPDF();
//     let startY = 20;

//     shifts.forEach((shift) => {
//       const duty = filteredDuties.find((d) => d.shiftTime === shift);
//       if (!duty) return;

//       doc.setFontSize(16);
//       doc.text(`${shift} Shift - Engineering Duty Schedule`, 14, 22);

//       doc.setFontSize(12);
//       doc.text(`Date: ${selectedDate}`, 14, 30);

//       const engineerData = duty.engineers.map(e => [e.name, e.status]);
//       autoTable(doc, {
//         head: [['Name', 'Status']],
//         body: engineerData,
//         startY: 40,
//         styles: { fontSize: 10 },
//         headStyles: {
//           fillColor: shift === 'Morning' ? [41, 128, 185] :
//             shift === 'Evening' ? [127, 63, 152] : [128, 128, 128]
//         }
//       });

//       let finalY = doc.lastAutoTable.finalY + 10;

//       autoTable(doc, {
//         head: [['Technician']],
//         body: [[duty.technician.name]],
//         startY: finalY,
//         styles: { fontSize: 10 },
//         headStyles: { fillColor: [39, 174, 96] }
//       });

//       finalY = doc.lastAutoTable.finalY + 10;

//       autoTable(doc, {
//         head: [['Electrician']],
//         body: [[duty.electrician.name]],
//         startY: finalY,
//         styles: { fontSize: 10 },
//         headStyles: { fillColor: [241, 196, 15] }
//       });

//       finalY = doc.lastAutoTable.finalY + 20;

//       if (shift !== 'Midnight') doc.addPage();
//     });

//     return doc.output('datauristring');
//   };

//   // ✅ Send Email Function for Technical Chart
//   const sendEmail = async (shift) => {
//     const email = prompt('Enter recipient email:', '');
//     if (!email) return;

//     try {
//       const pdfBase64 = generateTechnicalChartPDFBase64(shift);
//       await axios.post('http://localhost:3000/api/send-email', {
//         pdfBase64,
//         email,
//         subject: `${shift} Shift Technical Chart - ${selectedDate}`
//       });
//       alert('✅ Email sent successfully!');
//     } catch (err) {
//       console.error('Failed to send email:', err);
//       alert('❌ Failed to send email. Check console for details.');
//     }
//   };

//   // ✅ Send Email Function for Engineering Duty Schedule
//   const sendDutyEmail = async () => {

//     console.log('mail checking in frontend ');
//     const email = prompt('Enter recipient email:', '');
//     if (!email) return;

//     try {
//       const pdfBase64 = generateDutySchedulePDFBase64();
//       await axios.post('http://localhost:3000/api/send-email', {
//         pdfBase64,
//         email,
//         subject: `Engineering Duty Schedule - ${selectedDate}`
//       });
//       alert('✅ Email sent successfully!');
//     } catch (err) {
//       console.error('Failed to send email:', err);
//       alert('❌ Failed to send email. Check console for details.');
//     }
//   };

//   if (loading) return <div className="text-center mt-20 text-gray-500">Loading...</div>;
//   if (error) return <div className="text-center mt-20 text-red-600">{error}</div>;

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-6 mt-10 flex gap-4">
//         <button
//           onClick={exportDutyScheduleToPDF}
//           className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-green-700"
//         >
//           Generate Duty Schedule
//         </button>
//         <button
//           onClick={sendDutyEmail}
//           className="bg-purple-500 text-white px-4 py-2 rounded shadow hover:bg-purple-700"
//         >
//           Email Duty Schedule
//         </button>
//       </div>

//       {/* Existing UI Below */}
//       <div className="max-w-7xl mx-auto px-6 mt-10">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800">Engineering Duty Schedule</h1>
//           <button
//             className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-blue-700 transition"
//             onClick={() => setExpandedDutySection((prev) => !prev)}
//           >
//             {expandedDutySection ? 'Hide Duty' : 'Show Duty'}
//           </button>
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-1">Select Date:</label>
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded-md shadow-sm"
//           />
//         </div>

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
//                   <span>Total Duration: <strong>{totalDuration}</strong></span>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       exportToPDF(shift);
//                     }}
//                     className="bg-white text-blue-700 px-3 py-1 rounded shadow hover:bg-blue-100 transition"
//                   >
//                     Generate Report
//                   </button>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       sendEmail(shift);
//                     }}
//                     className="bg-purple-500 text-white px-3 py-1 rounded shadow hover:bg-purple-600 transition"
//                   >
//                     Email Report
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
//                           const isLongDuration = durationToSeconds(item.duration) > 3600;
//                           const rowStatus = item.remarks ? item.remarks.toLowerCase() : '';
//                           const statusClass = rowStatus.includes('late')
//                             ? 'bg-red-100'
//                             : rowStatus.includes('completed')
//                               ? 'bg-green-100'
//                               : 'bg-white';
//                           return (
//                             <tr
//                               key={i}
//                               className={`odd:bg-white even:bg-gray-50 ${statusClass} ${isLongDuration ? 'font-bold text-red-600' : ''
//                                 }`}
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
import { useNavigate } from 'react-router-dom';

import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

// Utility: Parse duration string like "HH:MM:SS" to seconds
const durationToSeconds = (duration) => {
  if (!duration) return 0;
  const parts = duration.split(':');
  if (parts.length < 3) return 0;
  const hours = parseInt(parts[0], 10) || 0;
  const minutes = parseInt(parts[1], 10) || 0;
  const seconds = parseInt(parts[2], 10) || 0;
  return hours * 3600 + minutes * 60 + seconds;
};

// Utility: Sum durations array to "HH:MM:SS" string
const sumDurations = (durations) => {
  let totalSeconds = durations.reduce((acc, d) => acc + durationToSeconds(d), 0);
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const HomePage = () => {

  const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/'); // ⛔ Redirect if not logged in
  }
}, [navigate]);




  // Helper: Format today's date as YYYY-MM-DD
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // State Management
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [shiftDuties, setShiftDuties] = useState([]);
  const [rosterList, setRosterList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedDutySection, setExpandedDutySection] = useState(true);
  const [expandedChartShifts, setExpandedChartShifts] = useState({});
  const [searchText, setSearchText] = useState('');

  // Fetch Shift Duties
  useEffect(() => {
    const fetchDuties = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/duties');
        const dutiesFromBackend = response.data.duties.map((duty) => ({
          ...duty,
          engineers: [
            { name: duty.engineer1 || '', status: duty.engineer1Status || 'N/A' },
            { name: duty.engineer2 || '', status: duty.engineer2Status || 'N/A' },
            { name: duty.engineer3 || '', status: duty.engineer3Status || 'N/A' },
            { name: duty.engineer4 || '', status: duty.engineer4Status || 'N/A' },
            { name: duty.engineer5 || '', status: duty.engineer5Status || 'N/A' },
            { name: duty.engineer6 || '', status: duty.engineer6Status || 'N/A' },
          ].filter((e) => e.name.trim() !== ''),
          technician: { name: duty.technician || 'N/A', status: duty.technicianStatus || 'N/A' },
          electrician: { name: duty.electrician || 'N/A', status: duty.electricianStatus || 'N/A' },
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

  const filteredRoster = rosterList.filter(
    (item) =>
      toLocalDateString(item.shiftDate) === selectedDate &&
      item.programDetails?.toLowerCase().includes(searchText.toLowerCase())
  );

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

  // ✅ PDF Export Function for Technical Chart (Single Shift) - Save Version
  const exportToPDF = (shift) => {
    try {
      const doc = new jsPDF();
      const items = groupedTechnicalCharts[shift] || [];
      if (items.length === 0) {
        alert('No data available for this shift to export.');
        return;
      }

      doc.setFontSize(18);
      doc.text(`${shift} Shift Technical Chart - ${selectedDate}`, 14, 22);

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

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 30,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [41, 128, 185] },
      });

      doc.save(`${shift}_Technical_Chart_${selectedDate}.pdf`);
    } catch (err) {
      console.error('PDF Export Error:', err);
      alert('Failed to generate PDF report. Please check console for details.');
    }
  };

  // ✅ Generate Base64 PDF for Technical Chart (used for Email)
  const generateTechnicalChartPDFBase64 = (shift) => {
    const doc = new jsPDF();
    const items = groupedTechnicalCharts[shift] || [];

    doc.setFontSize(18);
    doc.text(`${shift} Shift Technical Chart - ${selectedDate}`, 14, 22);

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

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    return doc.output('datauristring');
  };

  // ✅ Export Engineering Duty Schedule as PDF (All Shifts)
  const exportDutyScheduleToPDF = () => {
    try {
      const doc = new jsPDF();
      let startY = 20;

      shifts.forEach((shift) => {
        const duty = filteredDuties.find((d) => d.shiftTime === shift);
        if (!duty) return;

        doc.setFontSize(16);
        doc.text(`${shift} Shift - Engineering Duty Schedule`, 14, startY);
        startY += 8;

        doc.setFontSize(12);
        doc.text(`Date: ${selectedDate}`, 14, startY);
        startY += 10;

        doc.setFontSize(14);
        doc.text("Engineers", 14, startY);
        startY += 6;

        const engineerData = duty.engineers.map(e => [e.name, e.status]);
        autoTable(doc, {
          head: [['Name', 'Status']],
          body: engineerData,
          startY,
          styles: { fontSize: 10 },
          headStyles: {
            fillColor: shift === 'Morning' ? [41, 128, 185] :
              shift === 'Evening' ? [127, 63, 152] : [128, 128, 128]
          }
        });
        startY = doc.lastAutoTable.finalY + 8;

        doc.setFontSize(14);
        doc.text("Technician", 14, startY);
        startY += 6;

        autoTable(doc, {
          body: [[duty.technician.name, duty.technician.status]],
          startY,
          styles: { fontSize: 10 },
          headStyles: { fillColor: [39, 174, 96] }
        });
        startY = doc.lastAutoTable.finalY + 8;

        doc.setFontSize(14);
        doc.text("Electrician", 14, startY);
        startY += 6;

        autoTable(doc, {
          body: [[duty.electrician.name, duty.electrician.status]],
          startY,
          styles: { fontSize: 10 },
          headStyles: { fillColor: [241, 196, 15] }
        });
        startY = doc.lastAutoTable.finalY + 15;
      });

      doc.save(`Engineering_Duty_Schedule_Report_${selectedDate}.pdf`);
    } catch (err) {
      console.error('Duty Schedule PDF Export Error:', err);
      alert('Failed to generate Engineering Duty Schedule PDF. Check console for details.');
    }
  };

  // ✅ Generate Base64 PDF for Engineering Duty Schedule
  const generateDutySchedulePDFBase64 = () => {
    const doc = new jsPDF();
    let startY = 20;

    shifts.forEach((shift) => {
      const duty = filteredDuties.find((d) => d.shiftTime === shift);
      if (!duty) return;

      doc.setFontSize(16);
      doc.text(`${shift} Shift - Engineering Duty Schedule`, 14, 22);

      doc.setFontSize(12);
      doc.text(`Date: ${selectedDate}`, 14, 30);

      const engineerData = duty.engineers.map(e => [e.name, e.status]);
      autoTable(doc, {
        head: [['Name', 'Status']],
        body: engineerData,
        startY: 40,
        styles: { fontSize: 10 },
        headStyles: {
          fillColor: shift === 'Morning' ? [41, 128, 185] :
            shift === 'Evening' ? [127, 63, 152] : [128, 128, 128]
        }
      });

      let finalY = doc.lastAutoTable.finalY + 10;

      autoTable(doc, {
        head: [['Technician']],
        body: [[duty.technician.name]],
        startY: finalY,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [39, 174, 96] }
      });

      finalY = doc.lastAutoTable.finalY + 10;

      autoTable(doc, {
        head: [['Electrician']],
        body: [[duty.electrician.name]],
        startY: finalY,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [241, 196, 15] }
      });

      finalY = doc.lastAutoTable.finalY + 20;

      if (shift !== 'Midnight') doc.addPage();
    });

    return doc.output('datauristring');
  };

  // ✅ Send Email Function for Technical Chart
  const sendEmail = async (shift) => {
    const email = prompt('Enter recipient email:', '');
    if (!email) return;

    try {
      const pdfBase64 = generateTechnicalChartPDFBase64(shift);
      await axios.post('http://localhost:3000/api/send-email', {
        pdfBase64,
        email,
        subject: `${shift} Shift Technical Chart - ${selectedDate}`
      });
      alert('✅ Email sent successfully!');
    } catch (err) {
      console.error('Failed to send email:', err);
      alert('❌ Failed to send email. Check console for details.');
    }
  };

  // ✅ Send Email Function for Engineering Duty Schedule
  const sendDutyEmail = async () => {

    console.log('mail checking in frontend ');
    const email = prompt('Enter recipient email:', '');
    if (!email) return;

    try {
      const pdfBase64 = generateDutySchedulePDFBase64();
      await axios.post('http://localhost:3000/api/send-email', {
        pdfBase64,
        email,
        subject: `Engineering Duty Schedule - ${selectedDate}`
      });
      alert('✅ Email sent successfully!');
    } catch (err) {
      console.error('Failed to send email:', err);
      alert('❌ Failed to send email. Check console for details.');
    }
  };

  if (loading) return <div className="text-center mt-20 text-gray-500">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-red-600">{error}</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 mt-10 flex gap-4">
        <button
          onClick={exportDutyScheduleToPDF}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-green-700"
        >
          Generate Duty Schedule
        </button>
        <button
          onClick={sendDutyEmail}
          className="bg-purple-500 text-white px-4 py-2 rounded shadow hover:bg-purple-700"
        >
          Email Duty Schedule
        </button>
      </div>

      {/* Existing UI Below */}
      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Engineering Duty Schedule</h1>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-blue-700 transition"
            onClick={() => setExpandedDutySection((prev) => !prev)}
          >
            {expandedDutySection ? 'Hide Duty' : 'Show Duty'}
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

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
                  <span>Total Duration: <strong>{totalDuration}</strong></span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      exportToPDF(shift);
                    }}
                    className="bg-white text-blue-700 px-3 py-1 rounded shadow hover:bg-blue-100 transition"
                  >
                    Generate Report
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sendEmail(shift);
                    }}
                    className="bg-purple-500 text-white px-3 py-1 rounded shadow hover:bg-purple-600 transition"
                  >
                    Email Report
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
                              className={`odd:bg-white even:bg-gray-50 ${statusClass} ${isLongDuration ? 'font-bold text-red-600' : ''
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










































































































































































































































































































































































































