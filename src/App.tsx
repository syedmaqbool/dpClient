import "react-datetime/css/react-datetime.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Dashboard from "./components/Dashboard/Dashboard";
function App() {
  return (
    <div className="min-h-screen w-screen bg-slate-600">
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/*" element={<Navigate to="/auth" />} />
      </Routes>
    </div>
  );
}

export default App;
