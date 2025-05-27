


// import { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import ContentPageHead from "../components/ContentPageHead";
// import ContentPageBody from "../components/ContentPageBody";


// const Home = () => {

//   const[roster,setRoster]=useState([])

//   const fetchRoster=async()=>{

//     const response=await axios.get('http://localhost:3000/api/roster')
//     console.log(response.data.rosters);
//     setRoster(response.data.rosters)
//   }

//   useEffect(()=>{
//     fetchRoster()
//   },[])
//   console.log(roster,'final data ');

    

//     return (
//         <>
//             <Navbar/>
//             <ContentPageHead/>
            

//             <div className="overflow-x-auto">
//                 <table className="min-w-full table-fixed border border-gray-300 bg-white shadow-lg rounded-lg overflow-hidden">
//                     <thead className="bg-indigo-600 text-white">
//                         <tr>
//                             <th className="px-2 py-3 text-sm font-semibold text-left">SN</th>
//                             <th className="px-2 py-3 text-sm font-semibold text-left">SCHEDULE TIME</th>
//                             <th className="px-2 py-3 text-sm font-semibold text-left">PROGRAM DETAILS</th>
//                             <th className="px-2 py-3 text-sm font-semibold text-left">PGM DURATION </th>
//                             <th className="px-2 py-3 text-sm font-semibold text-left">ON AIR TIME</th>
//                             <th className="px-2 py-3 text-sm font-semibold text-left">REMARKS</th>
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200">
//                         {roster.map((p) => (
//                             <ContentPageBody key={p.id} schedule={p} />
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </>
//     );
// };

// export default Home;

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
    } catch (err) {
      console.error("Error fetching roster:", err);
    }
  };

  useEffect(() => {
    fetchRoster();
  }, []);

  return (
    <>
      <Navbar />
      <ContentPageHead/>
      <div className="p-6">
        <table className="w-full border border-gray-300 shadow rounded-lg">
          <thead className="bg-indigo-600 text-white">
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
                <th
                  key={header}
                  className="p-2 text-left text-sm font-semibold"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {roster.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="text-center text-gray-500 py-4 text-sm"
                >
                  No data available.
                </td>
              </tr>
            ) : (
              roster.map((item) => (
                <tr
                  key={item._id || item.sn}
                  className="hover:bg-gray-50 transition-colors divide-x divide-gray-100"
                >
                  <td className="p-2 text-sm">{item.sn}</td>
                  <td className="p-2 text-sm">{item.scheduleTime}</td>
                  <td className="p-2 text-sm">{item.programDetails}</td>
                  <td className="p-2 text-sm">{item.inTime}</td>
                  <td className="p-2 text-sm">{item.outTime}</td>
                  <td className="p-2 text-sm">{item.duration}</td>
                  <td className="p-2 text-sm">{item.onAirTime}</td>
                  <td className="p-2 text-sm">{item.remarks}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
