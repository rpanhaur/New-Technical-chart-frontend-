import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TechNav from "../components/TechNav";

const CreatePage = ({ duty }) => {
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
    return (h * 3600 + m * 60 + s) * 1000 + (f * 1000) / 25;
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
    if (rosterList.find((item) => item.sn === data.sn)) {
      setErrorMsg(`SN ${data.sn} already exists.`);
      return;
    }

    let newData = {
      ...data,
      shift,
      shiftDate,
    };

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

    setData({
      sn: "",
      scheduleTime: newData.scheduleTime,
      programDetails: "",
      inTime: "",
      outTime: "",
      duration: "",
      onAirTime: newData.onAirTime,
      remarks: "",
    });
    setErrorMsg("");
  };

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
      const submission = rosterList.map((entry) => ({
        ...entry,
        totalDuration: totalDurationFormatted,
      }));

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
        <div className="flex gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Shift</label>
            <select
              value={shift}
              onChange={(e) => setShift(e.target.value)}
              className="border rounded px-2 py-1 text-sm w-48"
            >
              <option value="">-- Select Shift --</option>
              <option value="Morning">Morning (5AM - 1PM)</option>
              <option value="Evening">Evening (1PM - 9PM)</option>
              <option value="Mid-night">Mid-night (9PM - 5AM)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Shift Date</label>
            <input
              type="date"
              value={shiftDate}
              onChange={(e) => setShiftDate(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            />
          </div>
        </div>

        <TechNav />

        {/* Final Technical Chart Preview */}
        {/* Existing UI here for Technical Chart Preview */}

        {/* 🧑‍💼 Shift Duty Details */}
        <div className="mt-10 p-6 rounded-lg shadow bg-gray-50 border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-blue-700">📋 Shift Duty Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            {Object.entries(duty || {}).map(([key, value]) => (
              <div key={key} className="bg-white border rounded p-3 shadow">
                <span className="block text-gray-600 font-medium capitalize">{key.replace(/\d+/, ' $&')}</span>
                <span className="text-gray-800 font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePage;
