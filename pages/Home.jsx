


import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ContentPageHead from "../components/ContentPageHead";

const Home = () => {
  const [roster, setRoster] = useState([]);

  const fetchRoster = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/roster");
      setRoster(response.data.rosters);
      console.log(response.data.rosters,'check check rosters data');
     
    } catch (err) {
      console.error("Error fetching roster:", err);
    }
  };

  useEffect(() => {
    fetchRoster();
  }, []);

  // Parse time with frames (HH:MM:SS:FF) into milliseconds
  const parseTimeWithFrames = (timeStr) => {
    const [h = 0, m = 0, s = 0, f = 0] = timeStr.split(":").map(Number);
    return ((h * 3600 + m * 60 + s) * 1000) + (f * 1000 / 25);
  };

  // Calculate total duration from list of items (returns HH:MM:SS:FF string)
  const calculateTotalDuration = (items) => {
    const totalMs = items.reduce((sum, item) => sum + parseTimeWithFrames(item.duration), 0);
    const totalSeconds = Math.floor(totalMs / 1000);
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const s = String(totalSeconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}:00`;
  };

  // Calculate under time and over time against 8-hour shift (returns {underTime, overTime})
  const calculateUnderOverTime = (totalDurationInSeconds) => {
    const shiftDuration = 8 * 3600; // 8 hours in seconds
    const diff = totalDurationInSeconds - shiftDuration;
    const abs = Math.abs(diff);
    const h = String(Math.floor(abs / 3600)).padStart(2, "0");
    const m = String(Math.floor((abs % 3600) / 60)).padStart(2, "0");
    const s = String(abs % 60).padStart(2, "0");
    const formatted = `${h}:${m}:${s}:00`;
    return {
      underTime: diff < 0 ? formatted : "00:00:00:00",
      overTime: diff > 0 ? formatted : "00:00:00:00",
    };
  };

  // Group roster items by shift and shiftDate

 
  const grouped = roster.reduce((acc, item) => {
    const key = `${item.shift}_${item.shiftDate}`;
    console.log(key,'check check key');
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <>
      <Navbar />
      <ContentPageHead />
      <div className="p-6 space-y-8">
        {Object.entries(grouped).map(([key, items], i) => {
          // Extract shift and shiftDate from the first item in this group
          const { shift, shiftDate } = items[0] || {};

          console.log(shift,'check check shift');

          const totalMs = items.reduce((sum, item) => sum + parseTimeWithFrames(item.duration), 0);
          const totalSeconds = Math.floor(totalMs / 1000);
          const totalDurationFormatted = calculateTotalDuration(items);
          const { underTime, overTime } = calculateUnderOverTime(totalSeconds);

          return (
            <div key={i} className="border border-gray-300 rounded-lg shadow">
              {/* Shift Summary */}
              <div className="text-lg text-center font-medium mb-4 px-4 pt-3">
                <span className="font-bold text-blue-700">Shift:</span>{" "}
                <span className="font-bold text-gray-800">{shift}</span> |{" "}

             
                <span className="font-bold text-blue-700">Date:</span>{" "}
             
                <span className="font-bold text-gray-800">{shiftDate}</span> |{" "}

                
                <span className="font-bold text-green-700">Total Duration:</span>{" "}
                
                <span className="font-bold text-gray-800">{totalDurationFormatted}</span> |{" "}
                {console.log(totalDurationFormatted)}
                <span className="font-bold text-green-700">Under Time:</span>{" "}
                <span className="font-bold text-green-800">{underTime}</span> |{" "}
                <span className="font-bold text-red-600">Over Time:</span>{" "}
                <span className="font-bold text-red-800">{overTime}</span>
              </div>

              {/* Table */}
              <table className="w-full border-t border-gray-300">
                <thead className="bg-green-600 text-white text-xs">
                  <tr>
                    {[
                      "SN",
                      "Schedule Time",
                      "Program Details",
                      "In Time",
                      "Out Time",
                      "Duration",
                      "On Air Time",
                      "Remarks",
                    ].map((header) => (
                      <th key={header} className="p-2 text-left">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm">
                  {items.map((item) => (
                    <tr key={item._id || item.sn} className="hover:bg-gray-50 divide-x divide-gray-100">
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
          );
        })}
      </div>
    </>
  );
};

export default Home;







