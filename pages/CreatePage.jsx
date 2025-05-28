// import { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const CreatePage = () => {
//   const navigate=useNavigate()
//   const [data, setData] = useState({
//     sn: "",
//     scheduleTime: "",
//     programDetails: "",
//     duration: "",
//     onAirTime: "",
//     remarks: ""
//   });

//   const [existingSNs, setExistingSNs] = useState([]);
//   const [errorMsg, setErrorMsg] = useState("");

//   // Fetch existing SNs on mount
//   useEffect(() => {
//     axios.get("http://localhost:3000/api/roster")
//       .then(res => {
//         const snList = res.data.rosters.map(r => String(r.sn)); // Convert to string for input comparison
//         setExistingSNs(snList);
//       })
//       .catch(err => {
//         console.error("Failed to fetch existing SNs:", err);
//       });
//   }, []);

//   // Automatically calculate duration when inTime or outTime changes
//   useEffect(() => {
//     if (data.inTime && data.outTime) {
//       const start = new Date(`1970-01-01T${data.inTime}`);
//       const end = new Date(`1970-01-01T${data.outTime}`);

//       if (end > start) {
//         const diffMs = end - start;
//         const hours = String(Math.floor(diffMs / 3600000)).padStart(2, "0");
//         const minutes = String(Math.floor((diffMs % 3600000) / 60000)).padStart(2, "0");
//         const seconds = String(Math.floor((diffMs % 60000) / 1000)).padStart(2, "0");

//         const formatted = `${hours}:${minutes}:${seconds}`;
//         setData(prev => ({ ...prev, duration: formatted }));
//       } else {
//         setData(prev => ({ ...prev, duration: "00:00:00" }));
//       }
//     }
//   }, [data.inTime, data.outTime]);

//   const fileHandel = (event) => {
//     const { name, value } = event.target;

//     // Reset SN error when user edits it
//     if (name === "sn") {
//       setErrorMsg("");
//     }

//     setData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const addRoster = async (event) => {
//     event.preventDefault();

//     // Check for duplicate SN
//     if (existingSNs.includes(String(data.sn))) {
//       setErrorMsg(`SN ${data.sn} already exists. Please use a different SN.`);
//       return;
//     }

//     try {
//       console.log("Sending data:", data);
//       const response = await axios.post('http://localhost:3000/api/roster', data);
//       console.log('Response:', response.data);
//       setErrorMsg(""); // Clear any previous error
//       if(response.status==200){
//         navigate('/')
//         alert('Added Roster Successfully in Home Page')
//       }
//     } catch (error) {
//       if (error.response) {
//         console.error('Server responded with error:', error.response.data);
//       } else if (error.request) {
//         console.error('No response received:', error.request);
//       } else {
//         console.error('Error setting up request:', error.message);
//       }
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="overflow-x-auto p-4">
//         {errorMsg && <div className="text-red-600 font-semibold mb-2">{errorMsg}</div>}
//         <table className="min-w-full table-fixed border border-gray-300 bg-white shadow-lg rounded-lg overflow-hidden">
//           <thead className="bg-indigo-600 text-white">
//             <tr>
//               <th className="px-2 py-3 text-sm font-semibold text-left">SN</th>
//               <th className="px-2 py-3 text-sm font-semibold text-left">SCHEDULE TIME</th>
//               <th className="px-2 py-3 text-sm font-semibold text-left">PROGRAMS DETAILS</th>
//               <th className="px-2 py-3 text-sm font-semibold text-left">PGM DURATION</th>
//               <th className="px-2 py-3 text-sm font-semibold text-left">ON AIR TIME</th>
//               <th className="px-2 py-3 text-sm font-semibold text-left">REMARKS</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             <tr>
//               <td className="px-2 py-3">
//                 <input
//                   className="w-10 border border-gray-300 rounded px-1 py-1 text-sm"
//                   type="BIGINT"
//                   name="sn"
//                   value={data.sn}
//                   onChange={fileHandel}
//                 />
//               </td>
//               <td className="px-2 py-3">
//                 <input
//                   className="w-full border border-gray-300 rounded px-1 py-1 text-sm"
//                   type="time"
//                   name="scheduleTime"
//                   value={data.scheduleTime}
//                   onChange={fileHandel}
//                 />
//               </td>
//               <td className="px-2 py-3">
//                 <input
//                   className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
//                   type="text"
//                   name="programDetails"
//                   value={data.programDetails}
//                   onChange={fileHandel}
//                 />
//               </td>
//               <td className="px-2 py-3">
//                 <input
//                   className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
//                   type="time"
//                   name="duration"
//                   value={data.duration}
//                   onChange={fileHandel}
//                 />
//               </td>
//               <td className="px-2 py-3">
//                 <input
//                   className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
//                   type="time"
//                   name="onAirTime"
//                   value={data.onAirTime}
//                   onChange={fileHandel}

//                 />
//               </td>
//               <td className="px-2 py-3">
//                 <input
//                   className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
//                   type="text"
//                   name="remarks"
//                   value={data.remarks}
//                   onChange={fileHandel}
//                 />
//               </td>
//             </tr>
//           </tbody>
//         </table>

//         <div className="mt-4">
//           <button
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-indigo-700"
//             onClick={addRoster}
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreatePage;




import { useState, useEffect } from "react";
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
  const [existingSNs, setExistingSNs] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [totalDurationSec, setTotalDurationSec] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3000/api/roster")
      .then(res => {
        const snList = res.data.rosters.map(r => String(r.sn));
        setExistingSNs(snList);
        setRosterList(res.data.rosters);
        setTotalDurationSec(
          res.data.rosters.reduce((sum, r) => {
            const [h, m, s] = r.duration.split(":").map(Number);
            return sum + h * 3600 + m * 60 + s;
          }, 0)
        );
      });
  }, []);

  const parseTimeWithFrames = (timeStr) => {
    const [h = 0, m = 0, s = 0, f = 0] = timeStr.split(":").map(Number);
    return ((h * 3600 + m * 60 + s) * 1000) + (f * 1000 / 25); // 25 FPS
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

  useEffect(() => {
    if (data.inTime && data.outTime) {
      const inMs = parseTimeWithFrames(data.inTime);
      const outMs = parseTimeWithFrames(data.outTime);
      const durationMs = Math.max(0, outMs - inMs);
      const formatted = formatTimeWithFrames(durationMs);
      setData(prev => ({ ...prev, duration: formatted }));
    }
  }, [data.inTime, data.outTime]);

  useEffect(() => {
    if (data.onAirTime && data.duration) {
      const [h, m, s, f] = data.duration.split(":").map(Number);
      const totalMs = ((h * 3600 + m * 60 + s) * 1000) + (f * 1000 / 25);
      const now = new Date();
      const onAir = new Date(now.toDateString() + " " + data.onAirTime);
      const schedule = new Date(onAir.getTime() - totalMs);
      setData(prev => ({
        ...prev,
        scheduleTime: schedule.toTimeString().split(" ")[0],
      }));
    }
  }, [data.onAirTime, data.duration]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "sn") setErrorMsg("");
    setData(prev => ({ ...prev, [name]: value }));
  };

  const addRoster = async (e) => {
    e.preventDefault();
    if (existingSNs.includes(String(data.sn))) {
      setErrorMsg(`SN ${data.sn} already exists.`);
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/roster", data);
      if (res.status === 200) {
        alert("Technical Chart Added Successfully");
        navigate("/");
      }
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  const calculateDiff = (seconds) => {
    const abs = Math.abs(seconds);
    const h = String(Math.floor(abs / 3600)).padStart(2, "0");
    const m = String(Math.floor((abs % 3600) / 60)).padStart(2, "0");
    const s = String(abs % 60).padStart(2, "0");
    const f = "00"; // Static as frames aren't calculated here
    return `${h}:${m}:${s}:${f}`;
  };

  const diff = totalDurationSec - SHIFT_DURATION_SECONDS;
  const underTime = diff < 0 ? calculateDiff(diff) : "00:00:00:00";
  const overTime = diff > 0 ? calculateDiff(diff) : "00:00:00:00";

  return (
    <>
      <Navbar />
      <div className="p-6">

        {/* Status Row */}
        <div className="flex justify-between items-center text-sm mb-2 font-semibold text-gray-700">
          <div>Under Time: {underTime}</div>
          <div>Shift Hours: 08:00:00:00</div>
          <div>Over Time: {overTime}</div>
        </div>

        {errorMsg && <div className="text-red-600 mb-2">{errorMsg}</div>}

        {/* Live Table Preview */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-2 text-indigo-700">📝 Final Technical Chart Preview</h2>
          <table className="w-full border border-gray-300 shadow rounded-lg">
            <thead className="bg-indigo-600 text-white">
              <tr>
                {["SN", "Schedule", "Program", "In", "Out", "Duration", "On Air", "Remarks"].map(h => (
                  <th key={h} className="p-2 text-left text-xs">{h}</th>
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
        </div>

        {/* Form Table */}
        <form onSubmit={addRoster}>
          <table className="w-full border border-gray-300 shadow rounded-lg mb-6">
            <thead className="bg-indigo-600 text-white">
              <tr>
                {["SN", "Schedule Time", "Program Details", "In Time", "Out Time", "Duration", "On Air Time", "Remarks"].map(h => (
                  <th key={h} className="p-2 text-left text-xs">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-gray-200">
                <td className="p-2"><input type="int" name="sn" value={data.sn} onChange={handleChange} className="w-16 border rounded px-1 py-1 text-sm" /></td>
                <td className="p-2"><input type="time" name="scheduleTime" value={data.scheduleTime} onChange={handleChange} className="w-full border rounded px-2 py-1 text-sm" /></td>
                <td className="p-2"><input type="text" name="programDetails" value={data.programDetails} onChange={handleChange} className="w-full border rounded px-2 py-1 text-sm" /></td>
                <td className="p-2"><input name="inTime" placeholder="HH:MM:SS:FF" value={data.inTime} onChange={handleChange} className="w-full border rounded px-2 py-1 text-sm" /></td>
                <td className="p-2"><input name="outTime" placeholder="HH:MM:SS:FF" value={data.outTime} onChange={handleChange} className="w-full border rounded px-2 py-1 text-sm" /></td>
                <td className="p-2"><input name="duration" value={data.duration} onChange={handleChange} className="w-full border rounded px-2 py-1 text-sm" readOnly /></td>
                <td className="p-2"><input type="time" name="onAirTime" value={data.onAirTime} onChange={handleChange} className="w-full border rounded px-2 py-1 text-sm" /></td>
                <td className="p-2"><input type="text" name="remarks" value={data.remarks} onChange={handleChange} className="w-full border rounded px-2 py-1 text-sm" /></td>
              </tr>
            </tbody>
          </table>

          <div className="text-center">
            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              Submit Technical Chart
            </button>
          </div>
        </form>


      </div>
    </>
  );
};

export default CreatePage;
