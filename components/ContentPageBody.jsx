

const ContentPageBody = ({ schedule }) => {

  console.log(schedule,'content page');

  return (
      <tr>
          <td className="px-2 py-3">
              <div className="w-10 border border-gray-300 rounded px-1 py-1 text-sm">
                  {schedule.sn}
              </div>
          </td>
          <td className="px-2 py-3">
              <div className="w-full border border-gray-300 rounded px-1 py-1 text-sm">
                  {schedule.programDetails}
              </div>
          </td>
          <td className="px-2 py-3">
              <div className="w-full border border-gray-300 rounded px-2 py-1 text-sm">
                  {schedule.inTime}
              </div>
          </td>
          <td className="px-2 py-3">
              <div className="w-full border border-gray-300 rounded px-2 py-1 text-sm">
                  {schedule.outTime}
              </div>
          </td>
          <td className="px-2 py-3">
              <div className="w-full border border-gray-300 rounded px-2 py-1 text-sm">
                  {schedule.duration}
              </div>
          </td>
          <td className="px-2 py-3">
              <div className="w-full border border-gray-300 rounded px-2 py-1 text-sm">
                  {schedule.remarks}
              </div>
          </td>
      </tr>
  );
};

export default ContentPageBody;