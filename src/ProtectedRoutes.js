import { Navigate, Outlet } from "react-router-dom";

const useAuth = (username, password) => {
  return username === "admin" && password === "password";
};

const ProtectedRoutes = (username, password) => {
  const isAuth = useAuth(username, password);
  return isAuth ? <Navigate to="/home" /> : <Outlet />;
};

export default ProtectedRoutes;
