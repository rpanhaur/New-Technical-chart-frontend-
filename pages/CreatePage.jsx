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

  const [existingSNs, setExistingSNs] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/api/roster")
      .then(res => {
        const snList = res.data.rosters.map(r => String(r.sn));
        setExistingSNs(snList);
      })
      .catch(err => console.error("Failed to fetch SNs:", err));
  }, []);

  useEffect(() => {
    if (data.inTime && data.outTime) {
      const inDate = new Date(`1970-01-01T${data.inTime}`);
      const outDate = new Date(`1970-01-01T${data.outTime}`);

      if (outDate > inDate) {
        const diffMs = outDate - inDate;
        const hours = String(Math.floor(diffMs / 3600000)).padStart(2, "0");
        const minutes = String(Math.floor((diffMs % 3600000) / 60000)).padStart(2, "0");
        const seconds = String(Math.floor((diffMs % 60000) / 1000)).padStart(2, "0");

        const formattedDuration = `${hours}:${minutes}:${seconds}`;
        setData(prev => ({ ...prev, duration: formattedDuration }));
      } else {
        setData(prev => ({ ...prev, duration: "00:00:00" }));
      }
    }
  }, [data.inTime, data.outTime]);

  useEffect(() => {
    if (data.onAirTime && data.duration) {
      const onAir = new Date(`1970-01-01T${data.onAirTime}`);
      const [h, m, s] = data.duration.split(":").map(Number);

      const durationMs = ((h * 3600) + (m * 60) + s) * 1000;
      const schedule = new Date(onAir - durationMs);

      const scheduleTime = schedule.toTimeString().split(" ")[0].slice(0, 8);
      setData(prev => ({ ...prev, scheduleTime }));
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
        alert("Roster Added Successfully");
        navigate("/");
      }
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        {errorMsg && <div className="text-red-600 font-semibold mb-2">{errorMsg}</div>}

        <table className="w-full border border-gray-300 shadow rounded-lg">
          <thead className="bg-indigo-600 text-white">
            <tr>
              {['SN', 'Schedule Time', 'Program Details', 'In Time', 'Out Time', 'Duration', 'On Air Time', 'Remarks'].map(header => (
                <th key={header} className="p-2 text-left text-sm font-semibold">{header}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr className="divide-x divide-gray-200">
              <td className="p-2">
                <input name="sn" value={data.sn} onChange={handleChange} className="w-16 border rounded px-1 py-1 text-sm" type="BIGINT" />
              </td>
              <td className="p-2">
                <input name="scheduleTime" value={data.scheduleTime} onChange={handleChange} className="w-full border rounded px-2 py-1 text-sm" type="time" />
              </td>
              <td className="p-2">
                <input name="programDetails" value={data.programDetails} onChange={handleChange} className="w-full border rounded px-2 py-1 text-sm" type="text" />
              </td>
              <td className="p-2">
                <input name="inTime" value={data.inTime} onChange={handleChange} className="w-full border rounded px-2 py-1 text-sm" type="time" />
              </td>
              <td className="p-2">
                <input name="outTime" value={data.outTime} onChange={handleChange} className="w-full border rounded px-2 py-1 text-sm" type="time" />
              </td>
              <td className="p-2">
                <input name="duration" value={data.duration} onChange={handleChange} className="w-full border rounded px-2 py-1 text-sm" type="text" />
              </td>
              <td className="p-2">
                <input name="onAirTime" value={data.onAirTime} onChange={handleChange} className="w-full border rounded px-2 py-1 text-sm" type="time" />
              </td>
              <td className="p-2">
                <input name="remarks" value={data.remarks} onChange={handleChange} className="w-full border rounded px-2 py-1 text-sm" type="text" />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-4 text-center">
          <button
            onClick={addRoster}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatePage;
