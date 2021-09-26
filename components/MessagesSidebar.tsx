import MessageCard from "./MessageCard";
import { trpc } from "../util/trpc";

const MessagesSidebar = () => {
  const DMs = trpc.useQuery(["users.getDMChannels"]);

  return (
    <div className="w-72 bg-primary-sidebar dark:bg-primary-sidebar-dark p-5">
      <h1 className="text-2xl font-bold mb-2 ml-2">Messages</h1>
      <div className="flex flex-col w-64 bg-primary-sidebar dark:bg-primary-sidebar-dark">
        {DMs.data?.ok &&
          DMs.data.channels.map((channel) => (
            <MessageCard
              userId={channel.to}
              channelId={channel.id}
              key={channel.id}
            />
          ))}
      </div>
    </div>
  );
};

export default MessagesSidebar;
