
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const shiftColors = {
  Morning: 'bg-blue-50 border-blue-400 text-blue-800',
  Evening: 'bg-purple-50 border-purple-400 text-purple-800',
  Night: 'bg-gray-100 border-gray-400 text-gray-800'
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

  useEffect(() => {
    const fetchDuties = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/duties');
        console.log(response.data.duties);
        const dutiesFromBackend = response.data.duties.map(duty => ({
          ...duty,
          engineers: [
            { name: duty.engineer1 || '', status: duty.engineer1Status },
            { name: duty.engineer2 || '', status: duty.engineer2Status },
            { name: duty.engineer3 || '', status: duty.engineer3Status },
            { name: duty.engineer4 || '', status: duty.engineer4Status },
            { name: duty.engineer5 || '', status: duty.engineer5Status },
            { name: duty.engineer6 || '', status: duty.engineer6Status }
          ].filter(e => e.name !== ''),
          technician: { name: duty.technician || 'N/A', status: duty.technicianStatus },
          electrician: { name: duty.electrician || 'N/A', status: duty.electricianStatus }
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
    const date = new Date(utcDateString);
    return date.toISOString().split('T')[0];
  };

  const shifts = ['Morning', 'Evening', 'Midnight'];

  // Filter shift duties and technical chart data based on selected date
  const filteredDuties = shiftDuties.filter(
    duty => toLocalDateString(duty.shiftDate) === selectedDate
  );

  const filteredRoster = rosterList.filter(
    item => toLocalDateString(item.shiftDate) === selectedDate
  );

  // Group filtered technical chart by shift
  const groupedTechnicalCharts = filteredRoster.reduce((acc, item) => {
    const shift = item.shift;
    if (!acc[shift]) acc[shift] = [];
    acc[shift].push(item);
    return acc;
  }, {});

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6 mt-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Engineering Duty Schedule</h1>

        {/* Date Picker */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Date:
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Shift Duties */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shifts.map((shiftTime) => {
            const duty = filteredDuties.find(d => d.shiftTime === shiftTime);
            if (!duty) return null;
            const shiftColor = shiftColors[duty.shiftTime] || 'bg-white border-gray-300';

            return (
              <div
                key={shiftTime}
                className={`rounded-xl shadow-md p-5 border-2 ${shiftColor}`}
              >
                <div className="mb-4">
                  <h2 className="text-xl font-bold">{duty.shiftTime} Shift</h2>
                  <p className="text-sm text-gray-500">
                    Date: {toLocalDateString(duty.shiftDate)}
                  </p>
                </div>

                {/* Engineers */}
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">Engineers</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {duty.engineers.map((eng, i) => (
                      <div
                        key={i}
                        className="p-2 bg-white rounded shadow text-sm border border-gray-200"
                      >
                        <p className="font-medium text-green-800 text-2xl" >{eng.name}</p>
                        <p className="text-red-500 italic">{eng.status}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technician & Electrician */}
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
            );
          })}
        </div>
      </div>

      {/* Technical Chart Preview for Selected Date */}
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-5xl font-bold  text-blue-800 mb-4">Tody's Technical Chart </h2>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Date: {selectedDate}</h3>

        {shifts.map(shift => {
          const items = groupedTechnicalCharts[shift];
          if (!items || items.length === 0) return null;

          return (
            <div key={shift} className="mb-6 border rounded shadow bg-white">
              <div className="bg-green-700 px-4 py-2 border-b font-bold text-3xl text-white">
                {shift} Shift
              </div>
              <div className="overflow-x-auto">
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
                    {items.map((item, i) => (
                      <tr key={i} className="odd:bg-white even:bg-gray-50">
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
        })}
      </div>
    </>
  );
};

export default HomePage;




































































































































































































