import React from "react";
import ChannelView from "../../../components/ChannelView";
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
