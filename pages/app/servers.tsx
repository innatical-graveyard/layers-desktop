import React from "react";
import ServersSidebar from "../../components/ServersSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faHashtag } from "@fortawesome/free-solid-svg-icons";
import ChannelView from "../../components/ChannelView";

const Servers = () => {
  return (
    <>
      <ServersSidebar />
      <div className="flex flex-col gap-5 w-64 bg-primary-sidebar dark:bg-primary-sidebar-dark p-5 flex-shrink-0">
        <h1 className="text-2xl font-bold">Points</h1>
        <p className="flex">
          Main <FontAwesomeIcon icon={faChevronDown} className="ml-auto" />
        </p>
        <div className="flex gap-3 items-center">
          <FontAwesomeIcon icon={faHashtag} />
          <p>general</p>
        </div>
        <div className="flex gap-3 items-center">
          <FontAwesomeIcon icon={faHashtag} />
          <p>general</p>
        </div>
        <div className="flex gap-3 items-center">
          <FontAwesomeIcon icon={faHashtag} />
          <p>general</p>
        </div>
        <div className="flex gap-3 items-center">
          <FontAwesomeIcon icon={faHashtag} />
          <p>general</p>
        </div>
      </div>
      <ChannelView />
    </>
  );
};

export default Servers;
