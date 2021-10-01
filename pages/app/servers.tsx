import React, { useEffect, useState } from "react";
import ServersSidebar from "../../components/ServersSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faHashtag } from "@fortawesome/free-solid-svg-icons";
import ChannelView from "../../components/ChannelView";
import { serverAuthedPage, useAuthedPage } from "../../util/auth";

const Servers = () => {
  useAuthedPage();
  const [selected, setSelected] = useState<string>("general");
  if (process.env.NODE_ENV === "development") {
    return (
      <>
        <ServersSidebar />
        <div className="flex flex-col gap-4 w-64 bg-primary-sidebar dark:bg-primary-sidebar-dark p-5 flex-shrink-0">
          <h1 className="text-2xl font-bold">Points</h1>
          <p className="flex">
            Main <FontAwesomeIcon icon={faChevronDown} className="ml-auto" />
          </p>
          <div
            className={`flex gap-3 items-center p-2 rounded-lg ${
              selected === "general"
                ? "bg-primary-sidebar-selected dark:bg-primary-sidebar-selected-dark"
                : ""
            }`}
            style={{
              margin: "-0.5rem",
            }}
            onClick={() => setSelected("general")}
          >
            <FontAwesomeIcon icon={faHashtag} />
            <p>general</p>
          </div>
          <div
            className={`flex gap-3 items-center p-2 rounded-lg ${
              selected === "memes"
                ? "bg-primary-sidebar-selected dark:bg-primary-sidebar-selected-dark"
                : ""
            }`}
            style={{
              margin: "-0.5rem",
            }}
            onClick={() => setSelected("memes")}
          >
            <FontAwesomeIcon icon={faHashtag} />
            <p>memes</p>
          </div>
          <div
            className={`flex gap-3 items-center p-2 rounded-lg ${
              selected === "images"
                ? "bg-primary-sidebar-selected dark:bg-primary-sidebar-selected-dark"
                : ""
            }`}
            style={{
              margin: "-0.5rem",
            }}
            onClick={() => setSelected("images")}
          >
            <FontAwesomeIcon icon={faHashtag} />
            <p>images</p>
          </div>
          <div
            className={`flex gap-3 items-center p-2 rounded-lg ${
              selected === "announcements"
                ? "bg-primary-sidebar-selected dark:bg-primary-sidebar-selected-dark"
                : ""
            }`}
            style={{
              margin: "-0.5rem",
            }}
            onClick={() => setSelected("announcements")}
          >
            <FontAwesomeIcon icon={faHashtag} />
            <p>announcements</p>
          </div>
        </div>
        {/* <ChannelView id={""} /> */}
      </>
    );
  } else {
    return (
      <div className="flex  flex-row items-center justify-center w-full">
        <div className="m-auto text-center">
          <h1 className="text-4xl font-bold">
            This feature is <span className="text-inndigo">Coming Soon </span>!
          </h1>
          <br />
          <p className="text-lg">Stick around to find out what it does~</p>
        </div>
      </div>
    );
  }
};

export default Servers;
