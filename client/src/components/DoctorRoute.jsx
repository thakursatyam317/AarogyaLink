import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const DoctorRoute = ({ children }) => {
  const { authUser, loading } = useAuth();
  console.log("DoctorRoute authUser:", authUser);

  if (loading) return null; // or loader

  if (!authUser) return <Navigate to="/login" />;

  if (authUser.role !== "doctor")
    return <Navigate to="/unauthorized" />;

  return children;
};

export default DoctorRoute;
