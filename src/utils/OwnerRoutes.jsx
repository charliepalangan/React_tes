import { Navigate, Outlet } from "react-router-dom";


const OwnerRoutes = () => {

    const karyawan_string = localStorage?.getItem("karyawan");
    const karyawan = JSON.parse(karyawan_string);

  
    if(karyawan?.role == "Owner"){
        return <Outlet />;
    }
    return <Navigate to="/auth/signinKaryawan" />;

  };

export default OwnerRoutes;