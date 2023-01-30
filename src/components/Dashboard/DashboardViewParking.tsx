import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Area, Slot } from "../../interfaces/DashboardInterface";
import {
  removeSelectedSlot,
  setSelectedSlot,
} from "../../redux/dashboardSlice";
import {
  useGetAreasQuery,
  useLazyGetAreaSlotsQuery,
} from "../../services/DashboardService";

function DashboardViewParking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useGetAreasQuery();
  const [trigger, result] = useLazyGetAreaSlotsQuery();

  const areas = data
    ? data.data.map((area: Area) => (
        <button
          key={area.id}
          className="rounded bg-slate-500 text-white hover:bg-slate-800"
          onClick={() => trigger(area.id)}
        >
          {area.name}
        </button>
      ))
    : null;

  useEffect(() => {
    if (data) {
      trigger(data.data[0].id);
    }
  }, [data]);

  useEffect(() => {
    dispatch(removeSelectedSlot());
  }, []);

  const slotClickedHandler = (slot: Slot) => {
    dispatch(setSelectedSlot(slot));
    navigate("/dashboard/book-parking");
  };

  const slots = result.data
    ? result.data.data.map((slot) => {
        const slotClickHandler =
          slot.status === 0 ? slotClickedHandler : () => null;
        return (
          <button
            key={slot.parkingarea_id + slot.id}
            className={getButtonClasses(slot.status)}
            onClick={() => slotClickHandler(slot)}
          >
            {slot.name}
          </button>
        );
      })
    : null;

  return (
    <div className="h-[35rem] rounded">
      <div className="grid h-full grid-cols-5 gap-4">
        <div className="grid grid-rows-3 gap-10 rounded bg-white p-10">
          {areas}
        </div>
        <div className="col-span-4 rounded bg-white p-4">
          <div className="mx-52 grid h-full grid-cols-5 grid-rows-3 gap-4">
            {slots}
          </div>
        </div>
      </div>
    </div>
  );
}

function getButtonClasses(isActive: number) {
  const buttonClass = ["rounded", "text-white"];
  if (isActive) {
    buttonClass.push(`bg-red-500`);
    buttonClass.push(`hover:bg-red-700`);
    return buttonClass.join(" ");
  }
  buttonClass.push(`bg-slate-500`);
  buttonClass.push(`hover:bg-slate-700`);
  return buttonClass.join(" ");
}

{
  /* <button
key={"A" + index}
onClick={() => toggle()}
className={getButtonClasses(state.tabAButtons[index].active, "red")}
>
{item.name}
</button> */
}

export default DashboardViewParking;
