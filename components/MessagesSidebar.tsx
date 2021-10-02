import MessageCard from "./MessageCard";
import { trpc } from "../util/trpc";
import React from "react";
import CallUI from "./CallUI";

const MessagesSidebar = () => {
  const DMs = trpc.useQuery(["users.getDMChannels"]);

  return (
    <div className="h-full w-full sm:w-72 bg-primary-sidebar dark:bg-primary-sidebar-dark p-5 flex flex-col">
      <h1 className="text-2xl font-bold mb-2 ml-2">Messages</h1>
      <div className="flex flex-col w-full bg-primary-sidebar dark:bg-primary-sidebar-dark relative flex-1">
        {DMs.data?.ok &&
          DMs.data.channels.map((channel) => (
            <MessageCard
              userId={channel.to}
              channelId={channel.id}
              key={channel.id}
              lastMessage={channel.lastMessage}
            />
          ))}
        <CallUI />
      </div>
    </div>
  );
};

export default MessagesSidebar;
