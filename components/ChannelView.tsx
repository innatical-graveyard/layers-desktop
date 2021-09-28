import React, { useMemo } from "react";
import Message from "./Message";
import { trpc } from "../util/trpc";
import { useAsync } from "react-use";
import Auth from "../util/auth";
import dynamic from "next/dynamic";
import { Waypoint } from "react-waypoint";

const ChatBox = dynamic(() => import("./ChatBox"), {
  ssr: false,
});

const ChannelView: React.FC<{ id: string }> = ({ id }) => {
  const { keychain, token } = Auth.useContainer();

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

  const utils = trpc.useContext();
  const messages = trpc.useInfiniteQuery(["channels.messages", { id }], {
    getNextPageParam(current) {
      if (!current.ok) return;
      return current.messages[0]?.id;
    },
  });

  trpc.useSubscription(["channels.channel", { id, token: token! }], {
    onNext(e) {
      // TRPC doesn't allow you to get infinite queries the normal way so :/
      const query = utils.queryClient.getQueryData([
        "channels.messages",
        { id },
        "TRPC_INFINITE_QUERY",
      ]) as any;

      switch (e.type) {
        case "message": {
          utils.queryClient.setQueryData(
            ["channels.messages", { id }, "TRPC_INFINITE_QUERY"],
            {
              ...query,
              pages: [
                {
                  ...query.pages[0],
                  messages: [...query.pages[0].messages, e],
                  ok: true,
                },
              ],
            }
          );
          break;
        }
      }
    },
  });

  const messagesList = useMemo(
    () =>
      messages.data?.pages.flatMap((page) =>
        page.ok ? [...page.messages].reverse() : []
      ),
    [messages.data]
  );

  const sessionKey = useAsync(
    async () =>
      user.data?.ok
        ? await keychain?.encryption.sessionKey(
            user.data.user.publicKeychain.encryption
          )
        : undefined,
    [user.data]
  );

  const usernamePlaceholderWidth = useMemo(
    () => Math.random() * (20 - 10) + 10,
    []
  );

  return (
    <div className="flex flex-col w-full">
      <div className="pt-8 pb-2 px-8 flex gap-3 items-center">
        {user.data?.ok ? (
          <img
            src={user.data.user.avatar}
            className="rounded-xl object-cover w-12 h-12"
          />
        ) : (
          <div className="animate-pulse rounded-xl w-12 h-12 bg-placeholder dark:bg-placeholder-dark" />
        )}

        <div className="w-full">
          {user.data?.ok ? (
            <h1 className="text-xl font-bold">{user.data.user.username}</h1>
          ) : (
            <div
              className="animate-pulse rounded h-5 bg-placeholder dark:bg-placeholder-dark"
              style={{ width: usernamePlaceholderWidth + "%" }}
            />
          )}
          {/* lleyton<span className="text-secondary">@innatical.com</span> */}
          {/* <h2>Working on a new app</h2> */}
        </div>
      </div>
      <div className="flex-1 p-8 flex py-0 overflow-y-auto flex-col-reverse mt-auto">
        <div className="p-3" />
        {sessionKey.value &&
          messagesList?.map((message, index) => (
            <Message
              {...message}
              sessionKey={sessionKey.value!}
              primary={
                index < messagesList.length - 1 &&
                messagesList[index + 1].author === message.author &&
                new Date(message.createdAt).valueOf() -
                  new Date(messagesList[index + 1].createdAt).valueOf() <
                  600000
                  ? false
                  : true
              }
            />
          ))}
        <div className="p-2" />
        <h2 className="font-bold text-xl">
          Woah! You reached the top of your chat with{" "}
          {user.data?.ok ? user.data?.user?.username : ""}. Here’s a cookie 🍪.
        </h2>
        <Waypoint onEnter={() => messages.fetchNextPage()} />
      </div>
      <ChatBox channelId={id} sessionKey={sessionKey.value} />
    </div>
  );
};

export default ChannelView;
