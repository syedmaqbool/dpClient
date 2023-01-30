import { NavLink } from "react-router-dom";

function DashboardTab() {
  return (
    <div className="my-5">
      <div className="rounded bg-white p-4">
        <div className="grid grid-cols-3 gap-4">
          <NavLink
            to="view-parking"
            className={({ isActive }) => getLinkClasses(isActive)}
          >
            View Parking
          </NavLink>
          <NavLink
            to="book-parking"
            className={({ isActive }) => getLinkClasses(isActive)}
          >
            Book Parking
          </NavLink>
          <NavLink
            to="view-bookings"
            className={({ isActive }) => getLinkClasses(isActive)}
          >
            View Bookings
          </NavLink>
        </div>
      </div>
    </div>
  );
}

function getLinkClasses(isActive: boolean): string {
  const linkClasses = [
    "rounded py-2 text-center text-white hover:bg-purple-700",
  ];
  if (isActive) {
    linkClasses.push("bg-purple-700");
    return linkClasses.join(" ");
  }
  linkClasses.push("bg-purple-500");
  return linkClasses.join(" ");
}

export default DashboardTab;
