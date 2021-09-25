import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faStore,
  faServer,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { trpc } from "../util/trpc";

const Sidebar = () => {
  const router = useRouter();
  const query = trpc.useQuery(["users.me"]);

  return (
    <div className="flex flex-col bg-sidebar dark:bg-sidebar-dark w-18 h-full items-center flex-shrink-0">
      <div className="flex flex-col items-center w-full relative h-full overflow-hidden">
        <motion.div
          className="h-6 w-1 left-0 absolute bg-inndigo my-auto"
          animate={
            router.pathname.startsWith("/app/messages")
              ? { top: 0, bottom: 375 }
              : router.pathname === "/app/servers"
              ? { top: 0, bottom: 165 }
              : router.pathname === "/app/friends"
              ? { top: 45, bottom: 0 }
              : router.pathname === "/app/store"
              ? { top: 250, bottom: 0 }
              : router.pathname.startsWith("/app/settings")
              ? { top: "100%", bottom: 80 }
              : {}
          }
        ></motion.div>
        <div className="flex flex-col text-secondary text-2xl items-center gap-18 my-auto">
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
          <Link href="/app/friends">
            <a className="cursor-pointer">
              <FontAwesomeIcon
                icon={faUsers}
                className={
                  router.pathname === "/app/friends" ? "text-inndigo" : ""
                }
              />
            </a>
          </Link>
          <Link href="/app/store">
            <a className="ursor-pointer">
              <FontAwesomeIcon
                icon={faStore}
                className={
                  router.pathname === "/app/store" ? "text-inndigo" : ""
                }
              />
            </a>
          </Link>
        </div>
        <Link href="/app/settings">
          <a className="cursor-pointer">
            <img
              src={query.data?.ok ? query.data.user.avatar : ""}
              className="rounded-lg object-cover w-10 h-10 mb-5"
            />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
