<<<<<<< HEAD


=======

// import { useState } from "react";
// import Navbar from "../components/Navbar";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const CreatePage = () => {
//   const navigate = useNavigate();
//   const SHIFT_DURATION_SECONDS = 8 * 3600;

//   const [shift, setShift] = useState("Morning");
//   const [data, setData] = useState({
//     sn: "",
//     scheduleTime: "",
//     programDetails: "",
//     inTime: "",
//     outTime: "",
//     duration: "",
//     onAirTime: "",
//     remarks: "",
//   });

//   const [rosterList, setRosterList] = useState([]);
//   const [errorMsg, setErrorMsg] = useState("");

//   const parseTimeWithFrames = (timeStr) => {
//     const [h = 0, m = 0, s = 0, f = 0] = timeStr.split(":").map(Number);
//     return ((h * 3600 + m * 60 + s) * 1000) + (f * 1000 / 25);
//   };

//   const formatTimeWithFrames = (ms) => {
//     const totalSec = Math.floor(ms / 1000);
//     const f = Math.floor((ms % 1000) / (1000 / 25));
//     const h = String(Math.floor(totalSec / 3600)).padStart(2, "0");
//     const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
//     const s = String(totalSec % 60).padStart(2, "0");
//     const ff = String(f).padStart(2, "0");
//     return `${h}:${m}:${s}:${ff}`;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({ ...prev, [name]: value }));

//     if (name === "inTime" || name === "outTime") {
//       const inMs = parseTimeWithFrames(name === "inTime" ? value : data.inTime);
//       const outMs = parseTimeWithFrames(name === "outTime" ? value : data.outTime);
//       if (!isNaN(inMs) && !isNaN(outMs)) {
//         const durationMs = Math.max(0, outMs - inMs);
//         const formatted = formatTimeWithFrames(durationMs);
//         setData((prev) => ({ ...prev, duration: formatted }));
//       }
//     }
//   };

//   const addProgramToChart = () => {
//     if (!data.sn || !data.programDetails) {
//       setErrorMsg("SN and Program Details are required.");
//       return;
//     }

//     if (rosterList.find(item => item.sn === data.sn)) {
//       setErrorMsg(`SN ${data.sn} already exists.`);
//       return;
//     }

//     let newData = { ...data };

//     if (rosterList.length === 0) {
//       newData.onAirTime = data.scheduleTime;
//     } else {
//       const prev = rosterList[rosterList.length - 1];
//       const prevOnAirMs = parseTimeWithFrames(prev.onAirTime);
//       const prevDurationMs = parseTimeWithFrames(prev.duration);
//       const nextScheduleMs = prevOnAirMs + prevDurationMs;
//       const nextSchedule = formatTimeWithFrames(nextScheduleMs);
//       newData.scheduleTime = nextSchedule;
//       newData.onAirTime = nextSchedule;
//     }

//     setRosterList([...rosterList, newData]);
//     setData({
//       sn: "",
//       scheduleTime: "",
//       programDetails: "",
//       inTime: "",
//       outTime: "",
//       duration: "",
//       onAirTime: "",
//       remarks: "",
//     });
//     setErrorMsg("");
//   };

//   const submitTechnicalChart = async () => {
//     try {
//       for (let entry of rosterList) {
//         await axios.post("http://localhost:3000/api/roster", {
//           ...entry,
//           shift,
//         });
//       }
//       alert("Technical Chart Submitted Successfully");
//       navigate("/");
//     } catch (err) {
//       console.error("Submission failed:", err);
//       setErrorMsg("Failed to submit the technical chart.");
//     }
//   };

//   const calculateTotalDuration = () => {
//     return rosterList.reduce((sum, item) => {
//       const [h, m, s] = item.duration.split(":").map(Number);
//       return sum + h * 3600 + m * 60 + s;
//     }, 0);
//   };

//   const calculateDiff = (seconds) => {
//     const abs = Math.abs(seconds);
//     const h = String(Math.floor(abs / 3600)).padStart(2, "0");
//     const m = String(Math.floor((abs % 3600) / 60)).padStart(2, "0");
//     const s = String(abs % 60).padStart(2, "0");
//     return `${h}:${m}:${s}:00`;
//   };

//   const diff = calculateTotalDuration() - SHIFT_DURATION_SECONDS;
//   const underTime = diff < 0 ? calculateDiff(diff) : "00:00:00:00";
//   const overTime = diff > 0 ? calculateDiff(diff) : "00:00:00:00";

//   return (
//     <>
//       <Navbar />
//       <div className="p-6">
//         {/* Shift Selection */}
//         <div className="mb-4">
//           <label className="font-semibold mr-2">Select Shift:</label>
//           <select
//             value={shift}
//             onChange={(e) => setShift(e.target.value)}
//             className="border px-2 py-1 rounded"
//           >
//             <option value="Morning">Morning (5 AM - 1 PM)</option>
//             <option value="Evening">Evening (1 PM - 9 PM)</option>
//             <option value="Mid-night">Mid-night (9 PM - 5 AM)</option>
//           </select>
//         </div>

//         <div className="flex justify-between items-center text-sm mb-2 font-semibold text-gray-700">
//           <div>Under Time: {underTime}</div>
//           <div>Shift Hours: 8 Hours</div>
//           <div>Shift: {shift}</div>
//           <div>Over Time: {overTime}</div>
//         </div>

//         {errorMsg && <div className="text-red-600 mb-2">{errorMsg}</div>}

//         {/* Input Table */}
//         <table className="w-full border border-gray-300 shadow rounded-lg mb-4">
//           <thead className="bg-indigo-600 text-white">
//             <tr>
//               {["SN", "Schedule Time", "Program Details", "In Time", "Out Time", "Duration", "On Air Time", "Remarks"].map((h) => (
//                 <th key={h} className="p-2 text-xs text-left">{h}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="divide-x divide-gray-200">
//               {["sn", "scheduleTime", "programDetails", "inTime", "outTime", "duration", "onAirTime", "remarks"].map((field) => (
//                 <td key={field} className="p-2">
//                   <input
//                     type="text"
//                     name={field}
//                     placeholder={["inTime", "outTime"].includes(field) ? "HH:MM:SS:FF" : ""}
//                     value={data[field]}
//                     onChange={handleChange}
//                     className="w-full border rounded px-2 py-1 text-sm"
//                     readOnly={field === "duration"}
//                   />
//                 </td>
//               ))}
//             </tr>
//           </tbody>
//         </table>

//         <div className="mb-6 text-center">
//           <button
//             onClick={addProgramToChart}
//             className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//           >
//             ➕ Add Program
//           </button>
//         </div>

//         {/* Final Chart Preview */}
//         <div className="mt-10">
//           <h2 className="text-xl font-bold mb-2 text-indigo-700">📝 Final Technical Chart Preview</h2>
//           <table className="w-full border border-gray-300 shadow rounded-lg mb-4">
//             <thead className="bg-indigo-600 text-white">
//               <tr>
//                 {["SN", "Schedule Time", "Program Details", "In Time", "Out Time", "Duration", "On Air Time", "Remarks"].map((h) => (
//                   <th key={h} className="p-2 text-xs text-left">{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {rosterList.map((item, i) => (
//                 <tr key={i} className="odd:bg-white even:bg-gray-50 text-sm">
//                   <td className="p-2">{item.sn}</td>
//                   <td className="p-2">{item.scheduleTime}</td>
//                   <td className="p-2">{item.programDetails}</td>
//                   <td className="p-2">{item.inTime}</td>
//                   <td className="p-2">{item.outTime}</td>
//                   <td className="p-2">{item.duration}</td>
//                   <td className="p-2">{item.onAirTime}</td>
//                   <td className="p-2">{item.remarks}</td>
//                 </tr>
//               ))}
//               {/* Total Duration Row */}
//               <tr className="font-semibold bg-yellow-100">
//                 <td colSpan={5} className="p-2 text-right">Total Duration:</td>
//                 <td colSpan={3} className="p-2">{calculateDiff(calculateTotalDuration())}</td>
//               </tr>
//             </tbody>
//           </table>

//           {rosterList.length > 0 && (
//             <div className="text-center">
//               <button
//                 onClick={submitTechnicalChart}
//                 className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700"
//               >
//                 ✅ Submit Technical Chart
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreatePage;

>>>>>>> f18ebad6d8430cf239a502a8819f444d874cb52c
import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const navigate = useNavigate();
  const SHIFT_DURATION_SECONDS = 8 * 3600;

  const [data, setData] = useState({
    sn: "",
    scheduleTime: "",
    programDetails: "",
    inTime: "",
    outTime: "",
    duration: "",
    onAirTime: "",
    remarks: "",
  });

  const [shift, setShift] = useState("");
  const [shiftDate, setShiftDate] = useState("");
  const [rosterList, setRosterList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const parseTimeWithFrames = (timeStr) => {
    const [h = 0, m = 0, s = 0, f = 0] = timeStr.split(":").map(Number);
    return ((h * 3600 + m * 60 + s) * 1000) + (f * 1000 / 25);
  };

  const formatTimeWithFrames = (ms) => {
    const totalSec = Math.floor(ms / 1000);
    const f = Math.floor((ms % 1000) / (1000 / 25));
    const h = String(Math.floor(totalSec / 3600)).padStart(2, "0");
    const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
    const s = String(totalSec % 60).padStart(2, "0");
    const ff = String(f).padStart(2, "0");
    return `${h}:${m}:${s}:${ff}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));

    if (name === "inTime" || name === "outTime") {
      const inMs = parseTimeWithFrames(name === "inTime" ? value : data.inTime);
      const outMs = parseTimeWithFrames(name === "outTime" ? value : data.outTime);
      if (!isNaN(inMs) && !isNaN(outMs)) {
        const durationMs = Math.max(0, outMs - inMs);
        const formatted = formatTimeWithFrames(durationMs);
        setData((prev) => ({ ...prev, duration: formatted }));
      }
    }
  };

  const addProgramToChart = () => {
    if (!shift || !shiftDate) {
      setErrorMsg("Shift and Shift Date must be selected.");
      return;
    }
    if (!data.sn || !data.programDetails) {
      setErrorMsg("SN and Program Details are required.");
      return;
    }
    if (rosterList.find(item => item.sn === data.sn)) {
      setErrorMsg(`SN ${data.sn} already exists.`);
      return;
    }

    let newData = {
      ...data,
      shift,
<<<<<<< HEAD
      shiftDate,
    };
    console.log(newData,'check check check');
=======
      shiftDate
    };
>>>>>>> f18ebad6d8430cf239a502a8819f444d874cb52c

    if (rosterList.length === 0) {
      newData.onAirTime = data.scheduleTime;
    } else {
      const prev = rosterList[rosterList.length - 1];
      const prevOnAirMs = parseTimeWithFrames(prev.onAirTime);
      const prevDurationMs = parseTimeWithFrames(prev.duration);
      const nextScheduleMs = prevOnAirMs + prevDurationMs;
      const nextSchedule = formatTimeWithFrames(nextScheduleMs);
      newData.scheduleTime = nextSchedule;
      newData.onAirTime = nextSchedule;
    }

    setRosterList([...rosterList, newData]);
<<<<<<< HEAD
    
    setData({
      sn: "",
      scheduleTime: newData.scheduleTime,
=======
    setData({
      sn: "",
      scheduleTime: rosterList.length === 0 ? data.scheduleTime : newData.scheduleTime,
>>>>>>> f18ebad6d8430cf239a502a8819f444d874cb52c
      programDetails: "",
      inTime: "",
      outTime: "",
      duration: "",
      onAirTime: newData.onAirTime,
      remarks: "",
    });
    setErrorMsg("");
  };

<<<<<<< HEAD
=======
  const submitTechnicalChart = async () => {
    try {
      for (let entry of rosterList) {
        await axios.post("http://localhost:3000/api/roster", entry);
      }
      alert("Technical Chart Submitted Successfully");
      navigate("/");
    } catch (err) {
      console.error("Submission failed:", err);
      setErrorMsg("Failed to submit the technical chart.");
    }
  };

>>>>>>> f18ebad6d8430cf239a502a8819f444d874cb52c
  const calculateTotalDuration = () => {
    return rosterList.reduce((sum, item) => {
      const ms = parseTimeWithFrames(item.duration);
      return sum + Math.floor(ms / 1000);
    }, 0);
  };

  const calculateDiff = (seconds) => {
    const abs = Math.abs(seconds);
    const h = String(Math.floor(abs / 3600)).padStart(2, "0");
    const m = String(Math.floor((abs % 3600) / 60)).padStart(2, "0");
    const s = String(abs % 60).padStart(2, "0");
    return `${h}:${m}:${s}:00`;
  };

  const diff = calculateTotalDuration() - SHIFT_DURATION_SECONDS;
  const underTime = diff < 0 ? calculateDiff(diff) : "00:00:00:00";
  const overTime = diff > 0 ? calculateDiff(diff) : "00:00:00:00";
  const totalDurationFormatted = calculateDiff(calculateTotalDuration());

  const submitTechnicalChart = async () => {
    try {
      const submission = rosterList.map(entry => ({
        ...entry,
        totalDuration: totalDurationFormatted,
      }));

      console.log(submission,'check submission');

      for (let entry of submission) {
        await axios.post("http://localhost:3000/api/roster", entry);
      }

      alert("Technical Chart Submitted Successfully");
      navigate("/");
    } catch (err) {
      console.error("Submission failed:", err);
      setErrorMsg("Failed to submit the technical chart.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
<<<<<<< HEAD
        {/* Shift Controls */}
        <div className="flex gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Shift</label>
            <select value={shift} onChange={(e) => setShift(e.target.value)} className="border rounded px-2 py-1 text-sm w-48">
=======
        <div className="flex gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Shift</label>
            <select
              value={shift}
              onChange={(e) => setShift(e.target.value)}
              className="border rounded px-2 py-1 text-sm w-48"
            >
>>>>>>> f18ebad6d8430cf239a502a8819f444d874cb52c
              <option value="">-- Select Shift --</option>
              <option value="Morning">Morning (5AM - 1PM)</option>
              <option value="Evening">Evening (1PM - 9PM)</option>
              <option value="Mid-night">Mid-night (9PM - 5AM)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Shift Date</label>
<<<<<<< HEAD
            <input type="date" value={shiftDate} onChange={(e) => setShiftDate(e.target.value)} className="border rounded px-2 py-1 text-sm" />
          </div>
=======
            <input
              type="date"
              value={shiftDate}
              onChange={(e) => setShiftDate(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            />
          </div>
        </div>

        <div className="flex justify-between items-center text-sm mb-2 font-semibold text-gray-700">
          <div>Under Time: {underTime}</div>
          <div>Shift Hours: 8 Hours</div>
          <div>Shift : {shift} ({shiftDate})</div>
          <div>Over Time: {overTime}</div>
>>>>>>> f18ebad6d8430cf239a502a8819f444d874cb52c
        </div>

        {errorMsg && <div className="text-red-600 mb-2">{errorMsg}</div>}

<<<<<<< HEAD
        {/* Input Table */}
        <table className="w-full border border-gray-300 shadow rounded-lg mb-4">
          <thead className="bg-green-600 text-white text-xs">
            <tr>
              {["SN", "Schedule Time", "Program Details", "In Time", "Out Time", "Duration", "On Air Time", "Remarks"].map((h) => (
                <th key={h} className="p-2 text-left">{h}</th>
=======
        <table className="w-full border border-gray-300 shadow rounded-lg mb-4">
          <thead className="bg-indigo-600 text-white">
            <tr>
              {["SN", "Schedule Time", "Program Details", "In Time", "Out Time", "Duration", "On Air Time", "Remarks"].map((h) => (
                <th key={h} className="p-2 text-xs text-left">{h}</th>
>>>>>>> f18ebad6d8430cf239a502a8819f444d874cb52c
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="divide-x divide-gray-200">
              {["sn", "scheduleTime", "programDetails", "inTime", "outTime", "duration", "onAirTime", "remarks"].map((field) => (
                <td key={field} className="p-2">
                  <input
                    type="text"
                    name={field}
                    placeholder={["inTime", "outTime"].includes(field) ? "HH:MM:SS:FF" : ""}
                    value={data[field]}
                    onChange={handleChange}
                    className="w-full border rounded px-2 py-1 text-sm"
                    readOnly={field === "duration"}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>

<<<<<<< HEAD
        {/* Add Button */}
        <div className="mb-6 text-center">
          <button onClick={addProgramToChart} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
=======
        <div className="mb-6 text-center">
          <button
            onClick={addProgramToChart}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
>>>>>>> f18ebad6d8430cf239a502a8819f444d874cb52c
            ➕ Add Program
          </button>
        </div>

<<<<<<< HEAD
        {/* Chart Preview */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-2 text-indigo-700">📝 Final Technical Chart Preview</h2>

          {/* Shift Summary */}
          {shift && shiftDate && (
            <div className="text-lg text-center font-medium mb-4">
              <span className="font-bold text-blue-700">Shift:</span>{" "}
              <span className="font-bold text-gray-800">{shift}</span> |{" "}
              <span className="font-bold text-blue-700">Date:</span>{" "}
              <span className="font-bold text-gray-800">{shiftDate}</span> |{" "}
              <span className="font-bold text-green-700">Total Duration:</span>{" "}
              <span className="font-bold text-gray-800">{totalDurationFormatted}</span> |{" "}
              <span className="font-bold text-red-600">Under Time:</span>{" "}
              <span className="font-bold text-gray-800">{underTime}</span> |{" "}
              <span className="font-bold text-red-600">Over Time:</span>{" "}
              <span className="font-bold text-gray-800">{overTime}</span>
            </div>
          )}

          <table className="w-full border border-gray-300 shadow rounded-lg mb-4">
            <thead className="bg-green-600 text-white text-xs">
              <tr>
                {["SN", "Schedule Time", "Program Details", "In Time", "Out Time", "Duration", "On Air Time", "Remarks"].map((h) => (
                  <th key={h} className="p-2 text-left">{h}</th>
=======
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-2 text-indigo-700">📝 Final Technical Chart Preview</h2>
          <table className="w-full border border-gray-300 shadow rounded-lg mb-4">
            <thead className="bg-indigo-600 text-white">
              <tr>
                {["SN", "Schedule Time", "Program Details", "In Time", "Out Time", "Duration", "On Air Time", "Remarks"].map((h) => (
                  <th key={h} className="p-2 text-xs text-left">{h}</th>
>>>>>>> f18ebad6d8430cf239a502a8819f444d874cb52c
                ))}
              </tr>
            </thead>
            <tbody>
              {rosterList.map((item, i) => (
                <tr key={i} className="odd:bg-white even:bg-gray-50 text-sm">
                  <td className="p-2">{item.sn}</td>
                  <td className="p-2">{item.scheduleTime}</td>
                  <td className="p-2">{item.programDetails}</td>
                  <td className="p-2">{item.inTime}</td>
                  <td className="p-2">{item.outTime}</td>
                  <td className="p-2">{item.duration}</td>
                  <td className="p-2">{item.onAirTime}</td>
                  <td className="p-2">{item.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>

<<<<<<< HEAD
          {/* Submit Button */}
          {rosterList.length > 0 && (
            <div className="text-center">
              <button onClick={submitTechnicalChart} className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700">
=======
          {rosterList.length > 0 && (
            <div className="text-center">
              <button
                onClick={submitTechnicalChart}
                className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700"
              >
>>>>>>> f18ebad6d8430cf239a502a8819f444d874cb52c
                ✅ Submit Technical Chart
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreatePage;



<<<<<<< HEAD




=======
>>>>>>> f18ebad6d8430cf239a502a8819f444d874cb52c
