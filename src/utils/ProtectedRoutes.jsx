import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoutes = ({ karyawan }) => {

  
    if(karyawan){
        return <Outlet />;
    }
    return <Navigate to="/auth/signinKaryawan" />;

  };

export default ProtectedRoutes;