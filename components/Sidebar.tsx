import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faStore,
  faServer,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col bg-sidebar dark:bg-sidebar-dark w-24 h-full items-center flex-shrink-0">
      <div className="my-auto flex flex-col text-secondary text-3xl items-center gap-10 w-full relative">
        <motion.div
          className="h-10 w-1 left-0 absolute bg-inndigo"
          animate={
            router.pathname === "/app/messages"
              ? { top: 0 }
              : router.pathname === "/app/store"
              ? { top: 75 }
              : router.pathname === "/app/servers"
              ? { top: 150 }
              : {}
          }
        ></motion.div>
        <Link href="/app/messages">
          <a className="cursor-pointer">
            <FontAwesomeIcon
              icon={faPaperPlane}
              className={
                router.pathname === "/app/messages" ? "text-inndigo" : ""
              }
            />
          </a>
        </Link>
        <Link href="/app/store">
          <a className="ursor-pointer">
            <FontAwesomeIcon
              icon={faStore}
              className={router.pathname === "/app/store" ? "text-inndigo" : ""}
            />
          </a>
        </Link>
        <Link href="/app/servers">
          <a className="cursor-pointer">
            <FontAwesomeIcon
              icon={faServer}
              className={
                router.pathname === "/app/servers" ? "text-inndigo" : ""
              }
            />
          </a>
        </Link>
      </div>
      <img
        src="https://cdn.discordapp.com/attachments/888219204417896488/890094423617204254/Screen_Shot_2021-09-21_at_11.37.25_PM.png"
        className="rounded-lg object-cover w-12 h-12 mb-3"
      />
    </div>
  );
};

export default Sidebar;
