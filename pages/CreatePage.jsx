import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const navigate=useNavigate()
  const [data, setData] = useState({
    sn: "",
    programDetails: "",
    inTime: "",
    outTime: "",
    duration: "",
    remarks: ""
  });

  const [existingSNs, setExistingSNs] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch existing SNs on mount
  useEffect(() => {
    axios.get("http://localhost:3000/api/roster")
      .then(res => {
        const snList = res.data.rosters.map(r => String(r.sn)); // Convert to string for input comparison
        setExistingSNs(snList);
      })
      .catch(err => {
        console.error("Failed to fetch existing SNs:", err);
      });
  }, []);

  // Automatically calculate duration when inTime or outTime changes
  useEffect(() => {
    if (data.inTime && data.outTime) {
      const start = new Date(`1970-01-01T${data.inTime}`);
      const end = new Date(`1970-01-01T${data.outTime}`);

      if (end > start) {
        const diffMs = end - start;
        const hours = String(Math.floor(diffMs / 3600000)).padStart(2, "0");
        const minutes = String(Math.floor((diffMs % 3600000) / 60000)).padStart(2, "0");
        const seconds = String(Math.floor((diffMs % 60000) / 1000)).padStart(2, "0");

        const formatted = `${hours}:${minutes}:${seconds}`;
        setData(prev => ({ ...prev, duration: formatted }));
      } else {
        setData(prev => ({ ...prev, duration: "00:00:00" }));
      }
    }
  }, [data.inTime, data.outTime]);

  const fileHandel = (event) => {
    const { name, value } = event.target;

    // Reset SN error when user edits it
    if (name === "sn") {
      setErrorMsg("");
    }

    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addRoster = async (event) => {
    event.preventDefault();

    // Check for duplicate SN
    if (existingSNs.includes(String(data.sn))) {
      setErrorMsg(`SN ${data.sn} already exists. Please use a different SN.`);
      return;
    }

    try {
      console.log("Sending data:", data);
      const response = await axios.post('http://localhost:3000/api/roster', data);
      console.log('Response:', response.data);
      setErrorMsg(""); // Clear any previous error
      if(response.status==200){
        navigate('/')
        alert('Added Roster Successfully in Home Page')
      }
    } catch (error) {
      if (error.response) {
        console.error('Server responded with error:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="overflow-x-auto p-4">
        {errorMsg && <div className="text-red-600 font-semibold mb-2">{errorMsg}</div>}
        <table className="min-w-full table-fixed border border-gray-300 bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-2 py-3 text-sm font-semibold text-left">SN</th>
              <th className="px-2 py-3 text-sm font-semibold text-left">PROGRAMS DETAILS</th>
              <th className="px-2 py-3 text-sm font-semibold text-left">IN TIME</th>
              <th className="px-2 py-3 text-sm font-semibold text-left">OUT TIME</th>
              <th className="px-2 py-3 text-sm font-semibold text-left">DURATION</th>
              <th className="px-2 py-3 text-sm font-semibold text-left">REMARKS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-2 py-3">
                <input
                  className="w-10 border border-gray-300 rounded px-1 py-1 text-sm"
                  type="number"
                  name="sn"
                  value={data.sn}
                  onChange={fileHandel}
                />
              </td>
              <td className="px-2 py-3">
                <input
                  className="w-full border border-gray-300 rounded px-1 py-1 text-sm"
                  type="text"
                  name="programDetails"
                  value={data.programDetails}
                  onChange={fileHandel}
                />
              </td>
              <td className="px-2 py-3">
                <input
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  type="time"
                  name="inTime"
                  value={data.inTime}
                  onChange={fileHandel}
                />
              </td>
              <td className="px-2 py-3">
                <input
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  type="time"
                  name="outTime"
                  value={data.outTime}
                  onChange={fileHandel}
                />
              </td>
              <td className="px-2 py-3">
                <input
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  type="text"
                  name="duration"
                  value={data.duration}
                  readOnly
                />
              </td>
              <td className="px-2 py-3">
                <input
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  type="text"
                  name="remarks"
                  value={data.remarks}
                  onChange={fileHandel}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-indigo-700"
            onClick={addRoster}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatePage;
