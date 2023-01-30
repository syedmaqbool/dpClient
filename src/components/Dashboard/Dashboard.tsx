import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import DashboardContent from "./DashboardContent";
import DashboardHeader from "./DashboardHeader";
import DashboardTab from "./DashboardTab";

function Dashboard() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dashboard = (
    <>
      <DashboardHeader />
      <div className="container mx-auto md:px-10">
        <DashboardTab />
        <DashboardContent />
      </div>
    </>
  );
  const isAuth = user ? dashboard : <Navigate to="/" />;

  return (
    <Routes>
      <Route path="/*" element={isAuth} />
    </Routes>
  );
}

export default Dashboard;
