import { Navigate, Outlet } from "react-router-dom";


const MORoutes = () => {

    const karyawan_string = localStorage?.getItem("karyawan");
    const karyawan = JSON.parse(karyawan_string);

  
    if(karyawan?.role == "MO"){
        return <Outlet />;
    }
    return <Navigate to="/auth/signinKaryawan" />;

  };

export default MORoutes;