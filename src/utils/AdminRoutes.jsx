import {Outlet,  Navigate } from "react-router-dom";

const AdminRoutes = () => {

    const karyawan_string = localStorage.getItem("karyawan");
    const karyawan = JSON.parse(karyawan_string);


    if(karyawan?.role == "Admin"){
        return <Outlet />;
    }

    if(!karyawan){
        return  <Navigate to="/auth/signinKaryawan" />;
    }



    

  };

export default AdminRoutes;