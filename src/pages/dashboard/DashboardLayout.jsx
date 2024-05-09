import { Link, Outlet } from "react-router-dom";
import Logo from "../../assets/logo.png";
import SidebarContent from "./SidebarContent";
import "./Dashboard.css";
import { logoutKaryawan } from "../../slicer/slicer_karyawan";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

const DashboardLayout = () => {
  const karyawan_string = localStorage.getItem("karyawan");

  const user = JSON.parse(karyawan_string);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const doLogout = () => {
    dispatch(logoutKaryawan());
    localStorage.removeItem("token");
    localStorage.removeItem("karyawan");
    navigate("/auth/signin");
  };
  return (
    <>
      <div className="navbar bg-primary max-h-8">
        <div className="flex-none">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-square btn-ghost drawer-button md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>

        <div className="flex-1">
          <a className=" text-xl flex items-center space-x-2" href="#">
            <img src={Logo} alt="logo" className="w-20" />
            <p>
              <span className="text-lg text-white font-bold">Atma Kitchen</span>
            </p>
          </a>
        </div>
        <div className="dropdown dropdown-end">
          <a href="#" className="inline-flex items-center">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <div className="ml-2">
              <span className="text-sm text-white font-bold">{user?.Nama}</span>
            </div>
          </a>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a className="btn btn-ghost btn-sm" onClick={doLogout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col h-screen">
          {/*  */}
          <div className="flex-1 p-4 bg-blue-50">
            <Outlet />
          </div>

          <Footer />
        </div>

        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content">
            <SidebarContent role={user?.role} />
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
