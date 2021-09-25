import React from "react";
import Message from "./Message";
import { trpc } from "../util/trpc";
import ChatBox from "./ChatBox";
import { useAsync } from "react-use";
import Auth from "../util/auth";

const ChannelView: React.FC<{ id: string }> = ({ id }) => {
  const { keychain } = Auth.useContainer();

  const channel = trpc.useQuery(["channels.channel", { id }]);
  const user = trpc.useQuery(
    [
      "users.user",
      {
        id:
          channel.data?.ok && channel.data.type === "DM" ? channel.data.to : "",
      },
    ],
    {
      enabled: channel.data?.ok && channel.data.type === "DM",
    }
  );

  const messages = trpc.useInfiniteQuery(["channels.messages", { id }]);

  const sessionKey = useAsync(
    async () =>
      user.data?.ok
        ? await keychain?.encryption.sessionKey(
            user.data.user.publicKeychain.encryption
          )
        : undefined,
    [user.data]
  );

  return (
    <div className="flex flex-col w-full">
      <div className="p-8 flex gap-3 items-center">
        <img
          src={user.data?.ok ? user.data.user.avatar : ""}
          className="rounded-xl object-cover w-12 h-12"
        />
        <div>
          <h1 className="text-xl">
            {user.data?.ok ? user.data.user.username : ""}
            {/* lleyton<span className="text-secondary">@innatical.com</span> */}
          </h1>
          {/* <h2>Working on a new app</h2> */}
        </div>
      </div>
      <div className="flex-1 p-8 flex flex-col gap-3 py-0">
        <div className="mt-auto" />
        {sessionKey.value &&
          messages.data?.pages.flatMap((page) =>
            page.ok
              ? page.messages.map((message) =>
                  sessionKey.value ? (
                    <Message
                      author={message.author}
                      sessionKey={sessionKey.value}
                      payload={message.payload}
                      createdAt={message.createdAt}
                    />
                  ) : (
                    <></>
                  )
                )
              : []
          )}
      </div>
      {user.data?.ok && sessionKey.value && (
        <ChatBox channelId={id} sessionKey={sessionKey.value} />
      )}
    </div>
  );
};

export default ChannelView;
