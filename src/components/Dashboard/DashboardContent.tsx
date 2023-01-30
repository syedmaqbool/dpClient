import { Routes, Route, Navigate } from "react-router-dom";
import DashboardBookParking from "./DashboardBookParking";
import DashboardViewBookings from "./DashboardViewBookings";
import DashboardViewParking from "./DashboardViewParking";

function DashboardContent() {
  return (
    <div className="my-5">
      <Routes>
        <Route path="/view-parking" element={<DashboardViewParking />} />
        <Route path="/book-parking" element={<DashboardBookParking />} />
        <Route path="/view-bookings" element={<DashboardViewBookings />} />

        <Route path="*" element={<Navigate to="view-parking" />} />
      </Routes>
    </div>
  );
}

export default DashboardContent;
