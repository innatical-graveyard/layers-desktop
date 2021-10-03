import {
  faChevronRight,
  faUser,
  faPaintBrush,
  faShieldAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import Auth from "../util/auth";
import { IconButton } from "./UI/IconButton";

const SettingsSidebar = () => {
  const { deleteToken, setKeychain } = Auth.useContainer();
  const history = useHistory();
  const location = useLocation();

  return (
    <div className="w-72 bg-primary-sidebar dark:bg-primary-sidebar-dark p-5 h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-2 ml-2">Settings</h1>
      <div className="flex flex-col bg-primary-sidebar dark:bg-primary-sidebar-dark flex-1">
        <Link to="/app/settings/user">
          <div
            className={`flex gap-3 w-full items-center p-2 rounded-xl ${
              location.pathname.startsWith("/app/settings/user")
                ? "bg-primary-sidebar-selected dark:bg-primary-sidebar-selected-dark"
                : ""
            }`}
          >
            <IconButton
              icon={faUser}
              color={"bg-inndigo"}
              className="w-9 h-9"
            />
            <div className="flex flex-col">
              <p className="font-medium">Profile</p>
            </div>
            <FontAwesomeIcon icon={faChevronRight} className="ml-auto mr-3" />
          </div>
        </Link>
        <div
          className={`flex gap-3 w-full items-center p-2 rounded-xl ${
            location.pathname.startsWith("/app/settings/security")
              ? "bg-primary-sidebar-selected dark:bg-primary-sidebar-selected-dark"
              : ""
          }`}
        >
          <IconButton
            icon={faShieldAlt}
            className="w-9 h-9"
            color={"bg-secondary"}
          />
          <div className="flex flex-col">
            <p className="font-medium">Security</p>
          </div>
          <FontAwesomeIcon icon={faChevronRight} className="ml-auto mr-3" />
        </div>
        <div
          className={`flex gap-3 w-full items-center p-2 rounded-xl ${
            location.pathname.startsWith("/app/settings/themes")
              ? "bg-primary-sidebar-selected dark:bg-primary-sidebar-selected-dark"
              : ""
          }`}
        >
          <IconButton
            icon={faPaintBrush}
            className="w-9 h-9"
            color={"bg-yellow-500"}
          />
          <div className="flex flex-col">
            <p className="font-medium">Themes</p>
          </div>
          <FontAwesomeIcon icon={faChevronRight} className="ml-auto mr-3" />
        </div>
        <button
          className="flex gap-3 w-full items-center p-2 mt-auto"
          onClick={() => {
            deleteToken();
            setKeychain(null);
          }}
        >
          <IconButton
            icon={faSignOutAlt}
            className="w-9 h-9"
            color={"bg-red-500"}
          />
          <div className="flex flex-col">
            <p className="font-medium">Logout</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SettingsSidebar;
