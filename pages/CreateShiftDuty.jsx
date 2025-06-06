import Navbar from "../components/Navbar"

const CreateShiftDuty = () => {

  return (

    <>
    <Navbar/>
   

      <div className="w-full bg-white border border-gray-200 rounded-lg p-6 shadow space-y-8 text-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* On Duty Engineers */}
          <div className="bg-blue-50 p-4 rounded-md shadow-sm">
            <h2 className="text-blue-700 font-bold text-base mb-4">👨‍🔧 On Duty Engineers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex flex-col">
                  <label htmlFor={`engineer${num}`} className="text-gray-700 text-xs mb-1">Engineer {num}</label>
                  <input type="text" id={`engineer${num}`} name={`engineer${num}`} placeholder="Name"
                    className="border px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" />
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
                  <label htmlFor={role.toLowerCase()} className="text-gray-700 text-xs mb-1">{role}</label>
                  <input type="text" id={role.toLowerCase()} name={role.toLowerCase()} placeholder="Name"
                    className="border px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400" />
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
                  <label htmlFor={`camera${num}`} className="text-gray-700 text-xs mb-1">Camera {num}</label>
                  <input type="text" id={`camera${num}`} name={`camera${num}`} placeholder="Name"
                    className="border px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-400" />
                </div>
              ))}
            </div>
          </div>

          
           {/* Engineers Contd. */}

         
          <div className="bg-blue-50 p-4 rounded-md shadow-sm">
            <h2 className="text-blue-700 font-bold text-base mb-4">👨‍🔧 Engineers (Contd.)</h2>
            <div className="grid grid-cols-2 gap-3">
              {[4, 5].map((num) => (
                <div key={num} className="flex flex-col">
                  <label htmlFor={`engineer${num}`} className="text-gray-700 text-xs mb-1">Engineer {num}</label>
                  <input type="text" id={`engineer${num}`} name={`engineer${num}`} placeholder="Name"
                    className="border px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" />
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
                  <label htmlFor={role.toLowerCase()} className="text-gray-700 text-xs mb-1">{role}</label>
                  <input type="text" id={role.toLowerCase()} name={role.toLowerCase()} placeholder="Name"
                    className="border px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-400" />
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
          >
            💾 Save
          </button>
        </div>
      </div>





    </>
  )
}

export default CreateShiftDuty


