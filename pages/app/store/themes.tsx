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
        <div>
          <h1 className="text-6xl font-bold p-12"> Themes</h1>
          <p className="text-2xl font-bold px-12 pt-12">Popular Themes</p>
          <div className="p-12 flex flex-row ">
            {/* Card #1 */}
            <div className="w-64 bg-primary-sidebar-dark rounded overflow-hidden shadow-lg">
              <img
                className="w-full"
                src="https://thumbs.dreamstime.com/b/demo-computer-key-to-download-version-software-trial-64543995.jpg"
                alt="Mountain"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Inndigo</div>
                <p className="text-base">
                  Thie beautifyl theme is centered around innaticals main color,
                  Inndigo
                </p>
              </div>
            </div>
            {/* Card #2 */}
            <div className="w-64 ml-12 bg-primary-sidebar-dark rounded overflow-hidden shadow-lg">
              <img
                className="w-full"
                src="https://thumbs.dreamstime.com/b/demo-computer-key-to-download-version-software-trial-64543995.jpg"
                alt="Mountain"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Inndigo</div>
                <p className="text-base">
                  Thie beautifyl theme is centered around innaticals main color,
                  Inndigo
                </p>
              </div>
            </div>
            {/* Card #3 */}
            <div className="w-64 ml-12 bg-primary-sidebar-dark rounded overflow-hidden shadow-lg">
              <img
                className="w-full"
                src="https://thumbs.dreamstime.com/b/demo-computer-key-to-download-version-software-trial-64543995.jpg"
                alt="Mountain"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Inndigo</div>
                <p className="text-base">
                  Thie beautifyl theme is centered around innaticals main color,
                  Inndigo
                </p>
              </div>
            </div>
            {/* Card #4 */}
            <div className="w-64 ml-12 bg-primary-sidebar-dark rounded overflow-hidden shadow-lg">
              <img
                className="w-full"
                src="https://thumbs.dreamstime.com/b/demo-computer-key-to-download-version-software-trial-64543995.jpg"
                alt="Mountain"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Inndigo</div>
                <p className="text-base">
                  Thie beautifyl theme is centered around innaticals main color,
                  Inndigo
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="flex  flex-row items-center justify-center w-full">
        <div className="m-auto text-center">
          <h1 className="text-4xl">
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
