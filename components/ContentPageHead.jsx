// // const ContentPageHead = () => {
// //   const today = new Date();

// //   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
// //   const formattedDate = today.toLocaleDateString('en-US', options);

// //   return (
// //     <div className="text-center mb-8">
// //       <h1 className="text-3xl font-bold text-indigo-700">Today's Technical Chart</h1>
// //       <p className="text-purple-800 text-lg font-bold mt-2">Fill in the details below</p>
// //       <p className="mt-1 text-lg font-bold text-emerald-600">{formattedDate}</p>
// //     </div>
// //   );
// // };

// // export default ContentPageHead;

//back step 


// import { useLocation } from "react-router-dom";

// const ContentPageHead = () => {
//   const location = useLocation();
//   const duty = location.state?.duty;

//   console.log("Duty received in ContentPageHead:", duty);

//   if (!duty) return null; // or show a message

//   return (
//     <div className="mt-6 bg-gradient-to-br from-blue-100 to-white p-4 rounded shadow">
//       <h2 className="text-lg font-bold text-blue-800 mb-2">👷 Shift Duty Details</h2>
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//         {Object.entries(duty).map(([role, name]) => (
//           <div
//             key={role}
//             className="bg-white border rounded p-3 shadow-sm text-sm"
//           >
//             <span className="block font-semibold text-gray-600 capitalize">
//               {role.replace(/\d+/, " $&")}
//             </span>
//             <span className="text-gray-800">{name || "-"}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ContentPageHead;

import { useLocation } from "react-router-dom";

const ContentPageHead = () => {
  const location = useLocation();
  const shiftData = location.state?.shiftData || [];

  if (!shiftData.length) return null;

  return (
    <div className="space-y-10">
      {shiftData.map(({ duty, shift, shiftDate }, index) => (
        <div key={index} className="bg-gradient-to-br from-blue-100 to-white p-4 rounded shadow">
          <div className="flex justify-between flex-wrap mb-4">
            <h2 className="text-lg font-bold text-blue-800">👷 {shift} Shift Duty</h2>
            <p className="text-sm font-semibold text-emerald-600">
              📅 {new Date(shiftDate).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
            {Object.entries(duty).map(([role, name]) => (
              <div key={role} className="bg-white border rounded p-3 shadow-sm">
                <span className="block font-medium text-gray-600 capitalize">
                  {role.replace(/\d+/, " $&")}
                </span>
                <span className="text-gray-900">{name || "-"}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentPageHead;

