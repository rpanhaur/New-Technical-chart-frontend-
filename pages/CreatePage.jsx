

// import { useState } from "react";
// import Navbar from "../components/Navbar";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const CreatePage = () => {
//   const navigate = useNavigate();
//   const SHIFT_DURATION_SECONDS = 8 * 3600;

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
//   const [existingSNs, setExistingSNs] = useState([]);
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

//     // auto-duration update
//     if (name === "inTime" || name === "outTime") {
//       const inMs = parseTimeWithFrames(name === "inTime" ? value : data.inTime);
//       const outMs = parseTimeWithFrames(name === "outTime" ? value : data.outTime);
//       if (!isNaN(inMs) && !isNaN(outMs)) {
//         const durationMs = Math.max(0, outMs - inMs);
//         const formatted = formatTimeWithFrames(durationMs);
//         setData((prev) => ({ ...prev, duration: formatted }));
//       }
//     }

//     // auto-scheduleTime update
//     if (name === "onAirTime" || name === "duration") {
//       const [h, m, s, f] = (name === "duration" ? value : data.duration).split(":").map(Number);
//       const totalMs = ((h * 3600 + m * 60 + s) * 1000) + (f * 1000 / 25);
//       const now = new Date();
//       const onAir = new Date(now.toDateString() + " " + (name === "onAirTime" ? value : data.onAirTime));
//       if (!isNaN(onAir)) {
//         const schedule = new Date(onAir.getTime() - totalMs);
//         setData((prev) => ({
//           ...prev,
//           scheduleTime: schedule.toTimeString().split(" ")[0].slice(0, 8),
//         }));
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

//     setRosterList([...rosterList, data]);
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
//         await axios.post("http://localhost:3000/api/roster", entry);
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

//   const diff = calculateTotalDuration() - SHIFT_DURATION_SECONDS;
//   const calculateDiff = (seconds) => {
//     const abs = Math.abs(seconds);
//     const h = String(Math.floor(abs / 3600)).padStart(2, "0");
//     const m = String(Math.floor((abs % 3600) / 60)).padStart(2, "0");
//     const s = String(abs % 60).padStart(2, "0");
//     return `${h}:${m}:${s}:00`;
//   };

//   const underTime = diff < 0 ? calculateDiff(diff) : "00:00:00:00";
//   const overTime = diff > 0 ? calculateDiff(diff) : "00:00:00:00";

//   return (
//     <>
//       <Navbar />
//       <div className="p-6">
//         <div className="flex justify-between items-center text-sm mb-2 font-semibold text-gray-700">
//           <div>Under Time: {underTime}</div>
//           <div>Shift Hours: 08:00:00:00</div>
//           <div>Over Time: {overTime}</div>
//         </div>

//         {errorMsg && <div className="text-red-600 mb-2">{errorMsg}</div>}

//         <table className="w-full border border-gray-300 shadow rounded-lg mb-4">
//           <thead className="bg-indigo-600 text-white">
//             <tr>
//               {["SN", "Schedule Time", "Program Details", "In Time", "Out Time", "Duration", "On Air Time", "Remarks"].map((h) => (
//                 <th key={h} className="p-2 text-xs">{h}</th>
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

//         <div className="mt-10">
//           <h2 className="text-xl font-bold mb-2 text-indigo-700">📝 Final Technical Chart Preview</h2>
//           <table className="w-full border border-gray-300 shadow rounded-lg mb-4">
//             <thead className="bg-indigo-600 text-white">
//               <tr>
//                 {["SN", "Schedule", "Program", "In", "Out", "Duration", "On Air", "Remarks"].map((h) => (
//                   <th key={h} className="p-2 text-xs">{h}</th>
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

    if (name === "onAirTime" || name === "duration") {
      const [h, m, s, f] = (name === "duration" ? value : data.duration).split(":").map(Number);
      const totalMs = ((h * 3600 + m * 60 + s) * 1000) + (f * 1000 / 25);
      const now = new Date();
      const onAir = new Date(now.toDateString() + " " + (name === "onAirTime" ? value : data.onAirTime));
      if (!isNaN(onAir)) {
        const schedule = new Date(onAir.getTime() - totalMs);
        setData((prev) => ({
          ...prev,
          scheduleTime: schedule.toTimeString().split(" ")[0].slice(0, 8),
        }));
      }
    }
  };

  const addProgramToChart = () => {
    if (!data.sn || !data.programDetails) {
      setErrorMsg("SN and Program Details are required.");
      return;
    }

    if (rosterList.find((item) => item.sn === data.sn)) {
      setErrorMsg(`SN ${data.sn} already exists.`);
      return;
    }

    setRosterList([...rosterList, data]);
    setData({
      sn: "",
      scheduleTime: "",
      programDetails: "",
      inTime: "",
      outTime: "",
      duration: "",
      onAirTime: "",
      remarks: "",
    });
    setErrorMsg("");
  };

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

  const calculateTotalDuration = () => {
    return rosterList.reduce((sum, item) => {
      const [h, m, s] = item.duration.split(":").map(Number);
      return sum + h * 3600 + m * 60 + s;
    }, 0);
  };

  const diff = calculateTotalDuration() - SHIFT_DURATION_SECONDS;
  const calculateDiff = (seconds) => {
    const abs = Math.abs(seconds);
    const h = String(Math.floor(abs / 3600)).padStart(2, "0");
    const m = String(Math.floor((abs % 3600) / 60)).padStart(2, "0");
    const s = String(abs % 60).padStart(2, "0");
    return `${h}:${m}:${s}:00`;
  };

  const underTime = diff < 0 ? calculateDiff(diff) : "00:00:00:00";
  const overTime = diff > 0 ? calculateDiff(diff) : "00:00:00:00";

  return (
    <>
      <Navbar />
      <div className="p-6">
        <div className="flex justify-between items-center text-sm mb-2 font-semibold text-gray-700">
          <div>Under Time: {underTime}</div>
          <div>Shift Hours: 08:00:00:00</div>
          <div>Over Time: {overTime}</div>
        </div>

        {errorMsg && <div className="text-red-600 mb-2">{errorMsg}</div>}

        <table className="w-full border border-gray-300 shadow rounded-lg mb-4">
          <thead className="bg-indigo-600 text-white">
            <tr>
              {["SN", "Schedule Time", "Program Details", "In Time", "Out Time", "Duration", "On Air Time", "Remarks"].map((h) => (
                <th key={h} className="p-2 text-xs">{h}</th>
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

        <div className="mb-6 text-center">
          <button
            onClick={addProgramToChart}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            ➕ Add Program
          </button>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold mb-2 text-indigo-700">📝 Final Technical Chart Preview</h2>
          <table className="w-full border border-gray-300 shadow rounded-lg mb-4">
            <thead className="bg-indigo-600 text-white">
              <tr>
                {["SN", "Schedule Time", "Program Details", "In Time", "Out Time", "Duration", "On Air Time", "Remarks"].map((h) => (
                  <th key={h} className="p-2 text-xs text-center">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rosterList.map((item, i) => (
                <tr key={i} className="odd:bg-white even:bg-gray-50 text-sm text-center">
                  <td className="p-2">{item.sn}</td>
                  <td className="p-2 font-mono">{item.scheduleTime}</td>
                  <td className="p-2">{item.programDetails}</td>
                  <td className="p-2 font-mono">{item.inTime}</td>
                  <td className="p-2 font-mono">{item.outTime}</td>
                  <td className="p-2 font-mono">{item.duration}</td>
                  <td className="p-2 font-mono">{item.onAirTime}</td>
                  <td className="p-2">{item.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {rosterList.length > 0 && (
            <div className="text-center">
              <button
                onClick={submitTechnicalChart}
                className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700"
              >
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


