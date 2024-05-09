import { Navigate, Outlet } from "react-router-dom";
const IsAuthRoute = () => {
  const karyawan_string = localStorage.getItem("karyawan");
  const karyawan = JSON.parse(karyawan_string);
  const customer_string = localStorage.getItem("customer");
  const customer = JSON.parse(customer_string);

  if (!karyawan && !customer) {
    return <Outlet />;
  }
  if (customer) {
    return <Navigate to="/" />;
  } else {
    return <Navigate to={`/dashboard/${karyawan.role}/`} />;
  }
};

export default IsAuthRoute;
