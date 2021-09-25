import {
  faChevronRight,
  faUser,
  faPaintBrush,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const SettingsSidebar = () => {
  return (
    <div className="w-72 bg-primary-sidebar dark:bg-primary-sidebar-dark p-5 h-full">
      <h1 className="text-2xl font-bold mb-5">Settings</h1>
      <div className="flex flex-col gap-5 w-64 bg-primary-sidebar dark:bg-primary-sidebar-dark">
        <Link href="/app/settings/user">
          <a>
            <div className="flex gap-3 w-full items-center">
              <div className="rounded-xl w-9 h-9 flex items-center justify-center bg-inndigo">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="flex flex-col">
                <p className="font-medium">Profile</p>
              </div>
              <FontAwesomeIcon icon={faChevronRight} className="ml-auto mr-3" />
            </div>
          </a>
        </Link>
        <div className="flex gap-3 w-full items-center">
          <div className="rounded-xl w-9 h-9 flex items-center justify-center bg-secondary">
            <FontAwesomeIcon icon={faShieldAlt} />
          </div>
          <div className="flex flex-col">
            <p className="font-medium">Security</p>
          </div>
          <FontAwesomeIcon icon={faChevronRight} className="ml-auto mr-3" />
        </div>
        <div className="flex gap-3 w-full items-center">
          <div className="rounded-xl w-9 h-9 flex items-center justify-center bg-yellow-500">
            <FontAwesomeIcon icon={faPaintBrush} />
          </div>
          <div className="flex flex-col">
            <p className="font-medium">Themes</p>
          </div>
          <FontAwesomeIcon icon={faChevronRight} className="ml-auto mr-3" />
        </div>
      </div>
    </div>
  );
};

export default SettingsSidebar;
