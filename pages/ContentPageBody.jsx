const ContentPageBody = () => {
  return (
    <>

      <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        
        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed border border-gray-300 bg-white shadow-lg rounded-lg overflow-hidden">

            <tbody className="divide-y divide-gray-200">
              {/* Row 1 */}
              <tr>
                <td className="px-2 py-3">
                  <input type="text" defaultValue={1} className="w-10 border border-gray-300 rounded px-1 py-1 text-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none" />
                </td>
                <td className="px-2 py-3">
                  <input type="text" placeholder="Enter program details" className="w-full   border border-gray-300 rounded px-1 py-1 text-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none" />
                </td>
                <td className="px-2 py-3">
                  <input type="time" className="w-full  border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none" />
                </td>
                <td className="px-2 py-3">
                  <input type="time" className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none" />
                </td>
                <td className="px-2 py-3">
                  <input type="text" placeholder="00:00" className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none" />
                </td>
                <td className="px-2 py-3">
                  <input type="text" placeholder="Enter remarks" className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>





    </>
  )
}

export default ContentPageBody