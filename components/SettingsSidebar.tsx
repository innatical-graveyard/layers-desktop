import {
  faChevronRight,
  faUser,
  faPaintBrush,
  faShieldAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Auth from "../util/auth";
import { IconButton } from "./UI/IconButton";

const SettingsSidebar = () => {
  const { deleteToken, setKeychain } = Auth.useContainer();
  const router = useRouter();

  return (
    <div className="w-full sm:w-72 bg-primary-sidebar dark:bg-primary-sidebar-dark p-5 h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-2 ml-2">Settings</h1>
      <div className="flex flex-col bg-primary-sidebar dark:bg-primary-sidebar-dark flex-1">
        <Link href="/app/settings/user">
          <a>
            <div
              className={`flex gap-3 w-full items-center p-2 rounded-xl ${
                router.pathname.startsWith("/app/settings/user")
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
          </a>
        </Link>
        <div
          className={`flex gap-3 w-full items-center p-2 rounded-xl ${
            router.pathname.startsWith("/app/settings/security")
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
            router.pathname.startsWith("/app/settings/themes")
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
