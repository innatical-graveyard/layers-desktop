import React, { useEffect, useState } from "react";
import ServersSidebar from "../../../components/ServersSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faHashtag } from "@fortawesome/free-solid-svg-icons";
import ChannelView from "../../../components/ChannelView";
import { serverAuthedPage, useAuthedPage } from "../../../util/auth";
import ShopSidebar from "../../../components/ShopSidebar";
import { NavigationStack } from "../../../components/NavigationStack";

const Store = () => {
  useAuthedPage();
  const [selected, setSelected] = useState<string>("general");
  if (process.env.NODE_ENV === "development") {
    return (
      <>
        <NavigationStack
          mainContent={({ backButton: BackButton }) => (
            <div className="p-8 overflow-hidden">
              <div className="flex mb-2">
                {BackButton && <BackButton />}
                <h1 className="text-2xl ml-2 sm:ml-0 sm:text-6xl font-bold">
                  {" "}
                  Themes
                </h1>
              </div>

              <p className="text-xl font-bold mb-2 sm:mb-3">Popular Themes</p>
              <div className="flex flex-row overflow-x-auto">
                {/* Card #1 */}
                <div className="w-64 flex-shrink-0 bg-primary-sidebar-dark rounded overflow-hidden shadow-lg">
                  <img
                    className="w-full"
                    src="https://thumbs.dreamstime.com/b/demo-computer-key-to-download-version-software-trial-64543995.jpg"
                    alt="Mountain"
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Inndigo</div>
                    <p className="text-base">
                      Thie beautifyl theme is centered around innaticals main
                      color, Inndigo
                    </p>
                  </div>
                </div>
                {/* Card #2 */}
                <div className="w-64 flex-shrink-0 ml-12 bg-primary-sidebar-dark rounded overflow-hidden shadow-lg">
                  <img
                    className="w-full"
                    src="https://thumbs.dreamstime.com/b/demo-computer-key-to-download-version-software-trial-64543995.jpg"
                    alt="Mountain"
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Inndigo</div>
                    <p className="text-base">
                      Thie beautifyl theme is centered around innaticals main
                      color, Inndigo
                    </p>
                  </div>
                </div>
                {/* Card #3 */}
                <div className="w-64 flex-shrink-0 ml-12 bg-primary-sidebar-dark rounded overflow-hidden shadow-lg">
                  <img
                    className="w-full"
                    src="https://thumbs.dreamstime.com/b/demo-computer-key-to-download-version-software-trial-64543995.jpg"
                    alt="Mountain"
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Inndigo</div>
                    <p className="text-base">
                      Thie beautifyl theme is centered around innaticals main
                      color, Inndigo
                    </p>
                  </div>
                </div>
                {/* Card #4 */}
                <div className="w-64 flex-shrink-0 ml-12 bg-primary-sidebar-dark rounded overflow-hidden shadow-lg">
                  <img
                    className="w-full"
                    src="https://thumbs.dreamstime.com/b/demo-computer-key-to-download-version-software-trial-64543995.jpg"
                    alt="Mountain"
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Inndigo</div>
                    <p className="text-base">
                      Thie beautifyl theme is centered around innaticals main
                      color, Inndigo
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          sidebar={ShopSidebar}
          backUrl="/app/store"
        />
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
