const ContentPageHead = () => {
  return (
    <>

<div>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  {/* Heading */}
  <div className="text-center mb-8">
    <h1 className="text-3xl font-bold text-indigo-700">Today's Technical Chart</h1>
    <p className="text-gray-500 mt-2">Fill in the details below</p>
  </div>
  {/* Table Container */}
  <div className="overflow-x-auto">
    <table className="min-w-full table-fixed border border-gray-300 bg-white shadow-lg rounded-lg overflow-hidden">
      <thead className="bg-indigo-600 text-white">
        <tr>
          <th className=" px-2 py-3 text-sm font-semibold text-left">SN</th>
          <th className=" px-2 py-3 text-sm font-semibold text-left">PROGRAMS DETAILS</th>
          <th className=" px-2 py-3 text-sm font-semibold text-left">IN TIME</th>
          <th className=" px-2 py-3 text-sm font-semibold text-left">OUT TIME</th>
          <th className=" px-2 py-3 text-sm font-semibold text-left">DURATION</th>
          <th className=" px-2 py-3 text-sm font-semibold text-left">REMARKS</th>
        </tr>
      </thead>
      
    </table>
  </div>
</div>


      




    </>
  )
}

export default ContentPageHead 