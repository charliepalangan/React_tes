import {
  MO_FEATURES,
  ADMIN_FEATURES,
  OWNER_FEATURES,
} from "../../constant/Features.jsx";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const SidebarContent = ({ role }) => {
  const location = useLocation();

  if (role === "MO") {
    return (
      <ul>
        {Object.keys(MO_FEATURES).map((key, index) => {
          const feature = MO_FEATURES[key];
          return (
            <li
              key={index}
              className={
                feature.route === location.pathname
                  ? "bg-blue-100 rounded-lg mb-2"
                  : "mb-2"
              }
            >
              <Link to={feature.route}>
                {feature.logo}
                {feature.name}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  if (role === "Admin") {
    return (
      <ul>
        {Object.keys(ADMIN_FEATURES).map((key, index) => {
          const feature = ADMIN_FEATURES[key];
          return (
            <li
              key={index}
              className={
                feature.route === location.pathname
                  ? "bg-blue-100 rounded-lg mb-2"
                  : "mb-2"
              }
            >
              <Link to={feature.route}>
                {feature.logo}
                {feature.name}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  if (role === "Owner") {
    return (
      <ul>
        {Object.keys(OWNER_FEATURES).map((key, index) => {
          const feature = OWNER_FEATURES[key];
          return (
            <li
              key={index}
              className={
                feature.route === location.pathname
                  ? "bg-blue-100 rounded-lg mb-2"
                  : "mb-2"
              }
            >
              <Link to={feature.route}>
                {feature.logo}
                {feature.name}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return null;
};



export default SidebarContent;
