import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ChannelView from "../../components/ChannelView";
import MessageCard from "../../components/MessageCard";
import Auth, { useAuthedPage } from "../../util/auth";

const Messages = () => {
  useAuthedPage();

  return (
    <>
      <div className="w-72 bg-primary-sidebar dark:bg-primary-sidebar-dark p-5">
        <h1 className="text-2xl font-bold mb-5">Messages</h1>
        <div className="flex flex-col gap-5 w-64 bg-primary-sidebar dark:bg-primary-sidebar-dark">
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
        </div>
      </div>
      <ChannelView />
    </>
  );
};

export default Messages;
