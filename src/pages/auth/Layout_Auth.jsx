// import "./login.css";
import croisant from "../../assets/croisant.jpg";
import { Outlet } from "react-router-dom";

const Auth_Layout = () => {
  return (
    <>
      <div className="w-full h-screen flex">
        <div className="w-full md:w-1/2 md:inline-flex">
          <div className="flex justify-center items-center w-full h-full">
            <div className="w-1/2">
               <Outlet />
            </div>
          </div>
        </div>

        <div className="hidden md:w-1/2 md:inline-flex md:relative -z-10">
          <img
            src={croisant}
            alt="croisant"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 right-0 h-full bg-gradient-to-l  from-white to-transparent w-full"></div>
          <div className="absolute top-0 right-0 h-full bg-gradient-to-r  from-white to-transparent w-full"></div>
        </div>
      </div>
    </>
  );
};

export default Auth_Layout;
