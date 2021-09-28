import React, { FC } from "react";
import Message from "./Message";
import { trpc } from "../util/trpc";
import { useAsync } from "react-use";
import Auth from "../util/auth";
import dynamic from "next/dynamic";
import { Waypoint } from "react-waypoint";

const ChatBox = dynamic(() => import("./ChatBox"), {
  ssr: false,
});

const ChannelView: React.FC<{
  id: string;
  backButton: () => JSX.Element;
}> = ({ id, backButton: BackButton }) => {
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
      <div className="pt-8 px-8 flex gap-3 items-center">
        {BackButton ? <BackButton /> : ""}

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
      <div className="flex-1 p-8 flex py-0 overflow-y-auto flex-col-reverse mt-auto">
        <div className="p-2" />
        {sessionKey.value &&
          messages.data?.pages?.flatMap((page) =>
            page.ok
              ? page.messages
                  .map((message) =>
                    sessionKey.value ? (
                      <Message
                        key={message.id}
                        author={message.author}
                        sessionKey={sessionKey.value}
                        payload={message.payload}
                        createdAt={message.createdAt}
                      />
                    ) : (
                      <></>
                    )
                  )
                  .reverse()
              : []
          )}
        <div className="p-2" />
        <Waypoint onEnter={() => messages.fetchNextPage()} />
      </div>
      {user.data?.ok && sessionKey.value && (
        <ChatBox channelId={id} sessionKey={sessionKey.value} />
      )}
    </div>
  );
};

export default ChannelView;
