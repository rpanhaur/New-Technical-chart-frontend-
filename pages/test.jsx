import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [rosterList, setRosterList] = useState([]);
  const [shift, setShift] = useState('');
  const [shiftDate, setShiftDate] = useState('');
  const [totalDurationFormatted, setTotalDurationFormatted] = useState('');
  const [underTime, setUnderTime] = useState('');
  const [overTime, setOverTime] = useState('');
  const [duty, setDuty] = useState(null);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // format: YYYY-MM-DD
  };

  useEffect(() => {
    const fetchRoster = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/roster');
        const rosterData = response.data.rosters;

        console.log(rosterData, 'Fetched roster data');

        const today = getTodayDate();

        const todayRosters = rosterData.filter(r => {
          const dateStr = new Date(r.shiftDate).toISOString().split('T')[0];
          return dateStr === today;
        });

        if (todayRosters.length > 0) {
          setRosterList(todayRosters);
          setShift(todayRosters[0].shift || '');
          setShiftDate(todayRosters[0].shiftDate || '');
          setTotalDurationFormatted(todayRosters[0].totalDuration || '');
          setUnderTime(todayRosters[0].underTime || '');
          setOverTime(todayRosters[0].overTime || '');
          setDuty(todayRosters[0].duty || null);
        } else {
          // fallback to show all if no data for today
          setRosterList(rosterData);
          if (rosterData.length > 0) {
            setShift(rosterData[0].shift || '');
            setShiftDate(rosterData[0].shiftDate || '');
            setTotalDurationFormatted(rosterData[0].totalDuration || '');
            setUnderTime(rosterData[0].underTime || '');
            setOverTime(rosterData[0].overTime || '');
            setDuty(rosterData[0].duty || null);
          }
        }
      } catch (err) {
        console.error('Error fetching roster data:', err);
      }
    };

    fetchRoster();
  }, []);

  return (


    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Final Technical Chart Preview</h2>

      {/* Shift Info */}
      {shift && shiftDate && (
        <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow">
          <p className="text-md font-semibold text-gray-700">
            Shift: <span className="text-green-700">{shift}</span> | Date:{' '}
            <span className="text-green-700">{shiftDate}</span>
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Total Duration: <span className="font-medium">{totalDurationFormatted}</span> | Under Time:{' '}
            <span className="font-medium">{underTime}</span> | Over Time: <span className="font-medium">{overTime}</span>
          </p>
        </div>
      )}

      {/* Technical Chart Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full border border-gray-300">
          <thead className="bg-green-600 text-white text-xs">
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

      
   
   
   
    </div>





  );
};

export default Home;
