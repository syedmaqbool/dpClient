import { useEffect } from "react";
import {
  useGetAllBookingsQuery,
  useLazyGetAllBookingsQuery,
} from "../../services/DashboardService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
function DashboardViewBookings() {
  const [trigger, { data }] = useLazyGetAllBookingsQuery();
  const { user } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    trigger(user?.id || 0);
  }, []);
  const tableRows = data
    ? data.data.map((booking) => {
        return (
          <tr className="border-b bg-white text-base">
            <td className="px-6 py-4">{booking.p_id}</td>
            <td className="px-6 py-4">{booking.slot_id}</td>
            <td className="px-6 py-4">
              {booking.bookingDate.substring(0, 10)}
            </td>
            <td className="px-6 py-4">{booking.timeIn.substring(0, 5)}</td>
            <td className="px-6 py-4">{booking.timeOut.substring(0, 5)}</td>
          </tr>
        );
      })
    : null;
  return (
    <div className="min-h-[35rem] rounded">
      <div className="h-full rounded bg-white p-4">
        <div className="relative overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-700 text-xs uppercase text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Area
                </th>
                <th scope="col" className="px-6 py-3">
                  Spot
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Start
                </th>
                <th scope="col" className="px-6 py-3">
                  End
                </th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardViewBookings;
