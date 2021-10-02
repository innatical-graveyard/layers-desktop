import React from "react";
import MessagesSidebar from "../../../components/MessagesSidebar";
import { useAuthedPage } from "../../../util/auth";

const Messages = () => {
  useAuthedPage();
  return (
    <>
      <MessagesSidebar />
    </>
  );
};

export default Messages;
