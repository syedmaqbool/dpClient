import dayjs from "dayjs";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useLazyGetAllBookingsQuery } from "../../services/DashboardService";

function DashboardViewBookings() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [trigger, { data }] = useLazyGetAllBookingsQuery();
  useEffect(() => {
    trigger(user?.id || 0);
  }, []);
  const tableRows = data
    ? data.data.map((booking) => {
        const timeIn = dayjs(booking.timeIn, "HH:mm:ss");
        const timeOut = dayjs(booking.timeOut, "HH:mm:ss");
        const difference = timeOut.diff(timeIn, "hour");
        return (
          <tr
            key={booking.id}
            className="border-b bg-white text-base last:border-b-0"
          >
            <td className="px-6 py-4 text-center">{booking.p_id}</td>
            <td className="px-6 py-4 text-center">{booking.slot_id}</td>
            <td className="px-6 py-4 text-center">
              {booking.bookingDate.substring(0, 10)}
            </td>
            <td className="px-6 py-4 text-center">
              {booking.timeIn.substring(0, 5)}
            </td>
            <td className="px-6 py-4 text-center">
              {booking.timeOut.substring(0, 5)}
            </td>
            <td className="px-6 py-4 text-center">{difference}h</td>
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
                <th scope="col" className="px-6 py-3 text-center">
                  Area
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Spot
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Start
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  End
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Duration
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
