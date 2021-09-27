import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

export const NavigationStack: React.FC<{
  mainContent: React.FC<{ backButton: () => JSX.Element | undefined }>;
  sidebar: React.FC<{}>;
  backUrl: string;
}> = ({ mainContent: Content, sidebar: Sidebar, backUrl }) => {
  return (
    <>
      {/* We do not want the sidebar to be displayed on small devices, but we do want it
          displayed on large devices*/}
      <div className="hidden sm:block">
        <Sidebar />
      </div>

      <Content
        backButton={() => {
          return (
            <Link href={backUrl}>
              <div className="sm:hidden p-3 bg-chat-input-elements dark:bg-chat-input-elements-dark rounded-xl">
                <FontAwesomeIcon icon={faAngleLeft} fixedWidth />
              </div>
            </Link>
          );
        }}
      />
    </>
  );
};
