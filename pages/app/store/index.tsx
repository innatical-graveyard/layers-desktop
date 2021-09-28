import React, { useEffect, useState } from "react";
import ServersSidebar from "../../../components/ServersSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faHashtag } from "@fortawesome/free-solid-svg-icons";
import ChannelView from "../../../components/ChannelView";
import { useAuthedPage } from "../../../util/auth";
import ShopSidebar from "../../../components/ShopSidebar";

const Store = () => {
  useAuthedPage();
  const [selected, setSelected] = useState<string>("general");
  if (process.env.NODE_ENV === "development") {
    return (
      <>
        <ShopSidebar />
      </>
    );
  } else {
    return (
      <div className="flex  flex-row items-center justify-center w-full">
        <div className="m-auto text-center">
          <h1 className="text-4xl font-black">
            This feature is <span className="text-inndigo">Coming Soon </span>!
          </h1>
          <br />
          <p className="text-lg">Stick around to find out what it does~</p>
        </div>
      </div>
    );
  }
};

export default Store;
