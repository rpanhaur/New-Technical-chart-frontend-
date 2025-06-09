// import Navbar from "../components/Navbar"

// const CreateShiftDuty = () => {


// // TO do work in this 

// import { Link, useNavigate } from "react-router-dom"

// import Navbar from "../components/Navbar"
// import { useState } from "react"
// import axios from "axios"



// const CreateShiftDuty = () => {

//   const navigate = useNavigate()

//   const [data, setData] = useState({
//       engineer1:"",
//       engineer2:"",
//       engineer3:"",
//       engineer4:"",
//       engineer5:"",
//       producer:"",
//       anchor:"",
//       camera1:"",
//       camera2:"",
//       technician:"",
//       electrician:""
   
//   })

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setData({
//       ...data,
//       [name]: value
//     })
//     console.log(data);
//   }

//   const addShiftDuty = async (e) => {
//     e.preventDefault()
//     const response = await axios.post("http://localhost:3000/api/duties", data)
//     console.log(response);
//     if (response.status == 200) {
//       navigate('/')
//     } else {
//       alert('Something is wrong ')
//     }


//   }










//   return (

//     <>
//     <Navbar/>
   

//       <div className="w-full bg-white border border-gray-200 rounded-lg p-6 shadow space-y-8 text-sm">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {/* On Duty Engineers */}
//           <div className="bg-blue-50 p-4 rounded-md shadow-sm">
//             <h2 className="text-blue-700 font-bold text-base mb-4">👨‍🔧 On Duty Engineers</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//               {[1, 2, 3].map((num) => (
//                 <div key={num} className="flex flex-col">
//                   <label htmlFor={`engineer${num}`} className="text-gray-700 text-xs mb-1">Engineer {num}</label>
//                   <input type="text" id={`engineer${num}`} name={`engineer${num}`} placeholder="Name" 
//                     className="border px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* News Team */}
//           <div className="bg-yellow-50 p-4 rounded-md shadow-sm">
//             <h2 className="text-yellow-700 font-bold text-base mb-4">📰 News Team</h2>
//             <div className="grid grid-cols-2 gap-3">
//               {["Producer", "Anchor"].map((role) => (
//                 <div key={role} className="flex flex-col">
//                   <label htmlFor={role.toLowerCase()} className="text-gray-700 text-xs mb-1">{role}</label>
//                   <input type="text" id={role.toLowerCase()} name={role.toLowerCase()} placeholder="Name" 
//                     className="border px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400" />
//                 </div>
//               ))}
//             </div>
//           </div>

//            {/* Cameramen */}

         
//           <div className="bg-purple-50 p-4 rounded-md shadow-sm">
//             <h2 className="text-purple-700 font-bold text-base mb-4">🎥 Cameramen</h2>
//             <div className="grid grid-cols-2 gap-3">
//               {[1, 2].map((num) => (
//                 <div key={num} className="flex flex-col">
//                   <label htmlFor={`camera${num}`} className="text-gray-700 text-xs mb-1">Camera {num}</label>
//                   <input type="text" id={`camera${num}`} name={`camera${num}`} placeholder="Name" onChange={handleChange}
//                     className="border px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-400" />
//                 </div>
//               ))}
//             </div>
//           </div>

          
//            {/* Engineers Contd. */}

         
//           <div className="bg-blue-50 p-4 rounded-md shadow-sm">
//             <h2 className="text-blue-700 font-bold text-base mb-4">👨‍🔧 Engineers (Contd.)</h2>
//             <div className="grid grid-cols-2 gap-3">
//               {[4, 5].map((num) => (
//                 <div key={num} className="flex flex-col">
//                   <label htmlFor={`engineer${num}`} className="text-gray-700 text-xs mb-1">Engineer {num}</label>
//                   <input type="text" id={`engineer${num}`} name={`engineer${num}`} placeholder="Name"
//                     className="border px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" />
//                 </div>
//               ))}
//             </div>
//           </div>
          

//           {/* Other Staff */}
//           <div className="bg-green-50 p-4 rounded-md shadow-sm">
//             <h2 className="text-green-700 font-bold text-base mb-4">🔧 Other Staff</h2>
//             <div className="grid grid-cols-2 gap-3">
//               {["Technician", "Electrician"].map((role) => (
//                 <div key={role} className="flex flex-col">
//                   <label htmlFor={role.toLowerCase()} className="text-gray-700 text-xs mb-1">{role}</label>
//                   <input type="text" id={role.toLowerCase()} name={role.toLowerCase()} placeholder="Name"
//                     className="border px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-400" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Save Button */}
//         <div className="text-right">
//           <button
//             type="button"
//             className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md shadow transition duration-200"
//           >
//             💾 Save
//           </button>
//         </div>
//       </div>





//     </>
//   )
// }

// export default CreateShiftDuty







// TO do work in this  back state 2

// import { Link, useNavigate } from "react-router-dom"

// import Navbar from "../components/Navbar"
// import { useState } from "react"
// import axios from "axios"
// import CreatePage from "./CreatePage"



// const CreateShiftDuty = () => {

//   const navigate = useNavigate()

//   const [data, setData] = useState({
//       engineer1:"",
//       engineer2:"",
//       engineer3:"",
//       engineer4:"",
//       engineer5:"",
//       producer:"",
//       anchor:"",
//       camera1:"",
//       camera2:"",
//       technician:"",
//       electrician:""
   
//   })

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setData({
//       ...data,
//       [name]: value
//     })
   
//   }

//   const addShiftDuty = async (e) => {
//     e.preventDefault()
//     const response = await axios.post("http://localhost:3000/api/duties", data)
//     console.log(response);
//     if (response.status == 200) {
//       navigate('/create-page')
//     } else {
//       alert('Something is wrong ')
//     }


//   }
//   console.log(data,'final data check check');










//   return (

//     <>
//     <Navbar/>
   

//       <div className="w-full bg-white border border-gray-200 rounded-lg p-6 shadow space-y-8 text-sm">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {/* On Duty Engineers */}
//           <div className="bg-blue-50 p-4 rounded-md shadow-sm">
//             <h2 className="text-blue-700 font-bold text-base mb-4">👨‍🔧 On Duty Engineers</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//               {[1, 2, 3].map((num) => (
//                 <div key={num} className="flex flex-col">
//                   <label htmlFor={`engineer${num}`} className="text-gray-700 text-xs mb-1">Engineer {num}</label>
//                   <input type="text" id={`engineer${num}`} name={`engineer${num}`} placeholder="Name"  onChange={handleChange}
//                     className="border px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* News Team */}
//           <div className="bg-yellow-50 p-4 rounded-md shadow-sm">
//             <h2 className="text-yellow-700 font-bold text-base mb-4">📰 News Team</h2>
//             <div className="grid grid-cols-2 gap-3">
//               {["Producer", "Anchor"].map((role) => (
//                 <div key={role} className="flex flex-col">
//                   <label htmlFor={role.toLowerCase()} className="text-gray-700 text-xs mb-1">{role}</label>
//                   <input type="text" id={role.toLowerCase()} name={role.toLowerCase()} placeholder="Name" onChange={handleChange}
//                     className="border px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400" />
//                 </div>
//               ))}
//             </div>
//           </div>

//            {/* Cameramen */}

         
//           <div className="bg-purple-50 p-4 rounded-md shadow-sm">
//             <h2 className="text-purple-700 font-bold text-base mb-4">🎥 Cameramen</h2>
//             <div className="grid grid-cols-2 gap-3">
//               {[1, 2].map((num) => (
//                 <div key={num} className="flex flex-col">
//                   <label htmlFor={`camera${num}`} className="text-gray-700 text-xs mb-1">Camera {num}</label>
//                   <input type="text" id={`camera${num}`} name={`camera${num}`} placeholder="Name" onChange={handleChange}
//                     className="border px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-400" />
//                 </div>
//               ))}
//             </div>
//           </div>

          
//            {/* Engineers Contd. */}

         
//           <div className="bg-blue-50 p-4 rounded-md shadow-sm">
//             <h2 className="text-blue-700 font-bold text-base mb-4">👨‍🔧 Engineers (Contd.)</h2>
//             <div className="grid grid-cols-2 gap-3">
//               {[4, 5].map((num) => (
//                 <div key={num} className="flex flex-col">
//                   <label htmlFor={`engineer${num}`} className="text-gray-700 text-xs mb-1">Engineer {num}</label>
//                   <input type="text" id={`engineer${num}`} name={`engineer${num}`} placeholder="Name" onChange={handleChange}
//                     className="border px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" />
//                 </div>
//               ))}
//             </div>
//           </div>
          

//           {/* Other Staff */}
//           <div className="bg-green-50 p-4 rounded-md shadow-sm">
//             <h2 className="text-green-700 font-bold text-base mb-4">🔧 Other Staff</h2>
//             <div className="grid grid-cols-2 gap-3">
//               {["Technician", "Electrician"].map((role) => (
//                 <div key={role} className="flex flex-col">
//                   <label htmlFor={role.toLowerCase()} className="text-gray-700 text-xs mb-1">{role}</label>
//                   <input type="text" id={role.toLowerCase()} name={role.toLowerCase()} placeholder="Name" onChange={handleChange}
//                     className="border px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-400" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Save Button */}
//         <div className="text-right">
//           <button
//             type="button"
//             className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md shadow transition duration-200" onClick={addShiftDuty}
//           >
//             💾 Save
//           </button>
//         </div>
//       </div>

//       <CreatePage duty={data}/>




//     </>
//   )
// }
 
// export default CreateShiftDuty


import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";

const CreateShiftDuty = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    engineer1: "",
    engineer2: "",
    engineer3: "",
    engineer4: "",
    engineer5: "",
    producer: "",
    anchor: "",
    camera1: "",
    camera2: "",
    technician: "",
    electrician: "",
  });

  const [saved, setSaved] = useState(true); // for displaying duty section after save

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const addShiftDuty = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/duties", data);
      console.log(response);
      if (response.status === 200) {
        setSaved(true); // show Shift Duty Details below
        setTimeout(() => {
          navigate("/create-page", { state: { duty: data } }); // pass data to technical chart page
        }, 1000); // slight delay so user sees confirmation
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to save duty data.");
    }
  };

  return (
    <>
      <Navbar />

      {/* Form Section */}
      <div className="w-full bg-white border border-gray-200 rounded-lg p-6 shadow space-y-8 text-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* On Duty Engineers */}
          <div className="bg-blue-50 p-4 rounded-md shadow-sm">
            <h2 className="text-blue-700 font-bold text-base mb-4">👨‍🔧 On Duty Engineers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex flex-col">
                  <label htmlFor={`engineer${num}`} className="text-gray-700 text-xs mb-1">
                    Engineer {num}
                  </label>
                  <input
                    type="text"
                    id={`engineer${num}`}
                    name={`engineer${num}`}
                    placeholder="Name"
                    onChange={handleChange}
                    className="border px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* News Team */}
          <div className="bg-yellow-50 p-4 rounded-md shadow-sm">
            <h2 className="text-yellow-700 font-bold text-base mb-4">📰 News Team</h2>
            <div className="grid grid-cols-2 gap-3">
              {["Producer", "Anchor"].map((role) => (
                <div key={role} className="flex flex-col">
                  <label htmlFor={role.toLowerCase()} className="text-gray-700 text-xs mb-1">
                    {role}
                  </label>
                  <input
                    type="text"
                    id={role.toLowerCase()}
                    name={role.toLowerCase()}
                    placeholder="Name"
                    onChange={handleChange}
                    className="border px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Cameramen */}
          <div className="bg-purple-50 p-4 rounded-md shadow-sm">
            <h2 className="text-purple-700 font-bold text-base mb-4">🎥 Cameramen</h2>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2].map((num) => (
                <div key={num} className="flex flex-col">
                  <label htmlFor={`camera${num}`} className="text-gray-700 text-xs mb-1">
                    Camera {num}
                  </label>
                  <input
                    type="text"
                    id={`camera${num}`}
                    name={`camera${num}`}
                    placeholder="Name"
                    onChange={handleChange}
                    className="border px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* More Engineers */}
          <div className="bg-blue-50 p-4 rounded-md shadow-sm">
            <h2 className="text-blue-700 font-bold text-base mb-4">👨‍🔧 Engineers (Contd.)</h2>
            <div className="grid grid-cols-2 gap-3">
              {[4, 5].map((num) => (
                <div key={num} className="flex flex-col">
                  <label htmlFor={`engineer${num}`} className="text-gray-700 text-xs mb-1">
                    Engineer {num}
                  </label>
                  <input
                    type="text"
                    id={`engineer${num}`}
                    name={`engineer${num}`}
                    placeholder="Name"
                    onChange={handleChange}
                    className="border px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Other Staff */}
          <div className="bg-green-50 p-4 rounded-md shadow-sm">
            <h2 className="text-green-700 font-bold text-base mb-4">🔧 Other Staff</h2>
            <div className="grid grid-cols-2 gap-3">
              {["Technician", "Electrician"].map((role) => (
                <div key={role} className="flex flex-col">
                  <label htmlFor={role.toLowerCase()} className="text-gray-700 text-xs mb-1">
                    {role}
                  </label>
                  <input
                    type="text"
                    id={role.toLowerCase()}
                    name={role.toLowerCase()}
                    placeholder="Name"
                    onChange={handleChange}
                    className="border px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="text-right">
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md shadow transition duration-200"
            onClick={addShiftDuty}
          >
            💾 Save
          </button>
        </div>
      </div>

      {/* Shift Duty Preview Section */}
      {saved && (
        <div className="mt-10 p-6 rounded-lg shadow bg-gray-50 border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-blue-700">📋 🧑‍💼 Shift Duty Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="bg-white border rounded p-3 shadow">
                <span className="block text-gray-600 font-medium capitalize">{key.replace(/\d+/, " $&")}</span>
                <span className="text-gray-800 font-semibold">{value || "-"}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CreateShiftDuty;
