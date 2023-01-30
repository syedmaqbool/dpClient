import { Route, Routes, Navigate } from "react-router-dom";
import AuthLogin from "./AuthLogin";

function Auth() {
  return (
    <Routes>
      <Route path="/login" element={<AuthLogin />} />
      <Route path="" element={<Navigate to="login" />} />
    </Routes>
  );
}

export default Auth;
