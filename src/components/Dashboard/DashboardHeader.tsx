import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogoutAction } from "../../redux/authSlice";
import { RootState } from "../../redux/store";
import { remove } from "../../utilities/LocalStorage";

function DashboardHeader() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(userLogoutAction);
    remove("USER");
    navigate("/");
  };
  return (
    <nav className="flex w-full items-center bg-slate-400 px-4 py-2 shadow">
      <div className="flex-grow text-2xl font-bold text-white">Parking App</div>
      <div className="text-1xl mr-4 font-bold text-white">Hi {user?.name}</div>
      <button
        onClick={logoutHandler}
        className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-800"
      >
        Logout
      </button>
    </nav>
  );
}

export default DashboardHeader;
