import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BookSlotDTO } from "../../interfaces/DashboardInterface";
import { removeSelectedSlot } from "../../redux/dashboardSlice";
import { RootState } from "../../redux/store";
import { bookSlot } from "../../services/DashboardService";
import { SECOND_IN_MS } from "../../utilities/TimeConstants";
import MyModal from "./Dialog";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
function DashboardBookParking() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedSlot } = useSelector((state: RootState) => state.dashboard);
  const { user } = useSelector((state: RootState) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [toDate, setToDate] = useState<any>(null);
  const [fromDate, setFromDate] = useState<any>(null);
  const [isTimeToOpen, setIsTimeToOpen] = useState(false);
  const [isTimeFromOpen, setIsTimeFromOpen] = useState(false);
  const handleBookSlot = async () => {
    const bookSlotDTO: BookSlotDTO = {
      lot_id: selectedSlot?.parkingarea_id || 0,
      slot_id: selectedSlot?.id || 0,
      bookingDate: getBookingDate(),
      user_id: user?.id || 0,
      timeIn: fromDate.toString().substr(17, 5),
      timeOut: toDate.toString().substr(17, 5),
    };
    const result = await bookSlot(bookSlotDTO);
    if (result && result.status === 200) {
      setIsOpen(true);
      dispatch(removeSelectedSlot());
      setTimeout(() => {
        setIsOpen(false);
        navigate("/dashboard/view-parking");
      }, SECOND_IN_MS * 2);
    }
  };

  const handleToDateChange = (e: any) => {
    if (!e.isValid()) return;
    setToDate(e);
  };
  const handleFromDateChange = (e: any) => {
    if (!e.isValid()) return;
    setFromDate(e);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MyModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          message={"Successfully Booked"}
          classNames={["bg-green-600"]}
        />
        <div className="h-[35rem] rounded">
          <div className="grid h-full grid-cols-2 grid-rows-3 gap-4 rounded bg-white p-4 py-32">
            <div className="">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="area"
              >
                Area
              </label>
              <input
                readOnly={true}
                className="w-full appearance-none rounded border py-2 px-3 text-sm text-gray-700 shadow focus:outline-blue-400"
                id="area"
                type="number"
                value={selectedSlot?.parkingarea_id}
                placeholder="Enter Area"
              />
            </div>
            <div className="">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="spot"
              >
                Spot
              </label>
              <input
                readOnly={true}
                className="w-full appearance-none rounded border py-2 px-3 text-sm text-gray-700 shadow focus:outline-blue-400"
                id="spot"
                type="number"
                value={selectedSlot?.id}
                placeholder="Enter Spot"
              />
            </div>
            <div className="">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="time-from"
              >
                Time From
              </label>
              <TimePicker
                value={fromDate}
                onChange={handleFromDateChange}
                onClose={() => setIsTimeFromOpen(false)}
                open={isTimeFromOpen}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onClick={() => setIsTimeFromOpen(true)}
                    disabled
                    id="time-from"
                  />
                )}
              />
            </div>
            <div className="">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="time-to"
              >
                Time To
              </label>
              <TimePicker
                value={toDate}
                onChange={handleToDateChange}
                onClose={() => setIsTimeToOpen(false)}
                open={isTimeToOpen}
                minTime={fromDate}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onClick={() => setIsTimeToOpen(true)}
                    disabled
                    id="time-to"
                  />
                )}
              />
            </div>

            <div className="col-span-2 text-center">
              <button
                onClick={handleBookSlot}
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-800"
              >
                Book Parking
              </button>
            </div>
          </div>
        </div>
      </LocalizationProvider>
    </>
  );
}

function getBookingDate() {
  const now = new Date();
  const date = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();
  function addZero(value: number) {
    if (value < 9) {
      return "0" + value;
    }
    return value.toString();
  }
  return `${year}-${addZero(month + 1)}-${addZero(date)}`;
}

export default DashboardBookParking;
