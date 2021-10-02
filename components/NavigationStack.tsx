import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { IconButton } from "./UI/IconButton";

export const NavigationStack: React.FC<{
  mainContent: React.FC<{ backButton: () => JSX.Element }>;
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
            <IconButton
              href={backUrl}
              icon={faAngleLeft}
              className="sm:hidden"
              color="bg-chat-input-elements-dark"
            />
          );
        }}
      />
    </>
  );
};
