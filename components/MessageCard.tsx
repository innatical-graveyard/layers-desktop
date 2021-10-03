import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { trpc } from "../util/trpc";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  EncryptedMessage,
  SignedMessage,
  SigningPair,
} from "@innatical/inncryption";
import { useAsync } from "react-use";
import Auth from "../util/auth";
import { useQuery } from "react-query";
import { useMarkdownPresets } from "../util/hooks";

const MessageCard: React.FC<{
  userId: string;
  channelId: string;
  lastMessage?: { author: string; payload: EncryptedMessage };
}> = ({ userId, channelId, lastMessage }) => {
  const { keychain, token } = Auth.useContainer();
  const me = trpc.useQuery(["users.me"]);
  const user = trpc.useQuery(["users.user", { id: userId }]);
  const location = useLocation();

  const usernamePlaceholderWidth = useMemo(
    () => Math.random() * (70 - 40) + 40,
    []
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

  const message = useQuery(
    ["messageContent", lastMessage?.payload, sessionKey, user.data, me.data],
    async () => {
      if (user.data?.ok && me.data?.ok) {
        const message = (await sessionKey.value!.decrypt(
          lastMessage!.payload
        )) as SignedMessage;
        const unwrapped = await SigningPair.verify(
          message,
          lastMessage!.author === me.data.user.id
            ? me.data.user.publicKeychain.signing
            : user.data.user.publicKeychain.signing
        );

        if (unwrapped.ok) {
          return unwrapped.message as string;
        } else {
          return false;
        }
      }
    },
    {
      enabled: !!lastMessage?.payload && !!sessionKey.value && !!user.data?.ok,
    }
  );

  const utils = trpc.useContext();

  trpc.useSubscription(["channels.channel", { id: channelId, token: token! }], {
    onNext(e) {
      switch (e.type) {
        case "message": {
          const data = utils.getQueryData(["users.getDMChannels"]);
          if (data?.ok)
            utils.setQueryData(["users.getDMChannels"], {
              ok: true,
              channels: data.channels.map((channel) =>
                channel.id === channelId
                  ? { ...channel, lastMessage: e }
                  : channel
              ),
            });
          break;
        }
      }
    },
  });

  const content = useMarkdownPresets(
    message.data === false
      ? "*This message could not be decrypted or verfiied*"
      : message.data ?? ""
  );

  return (
    <Link to={"/app/messages/" + channelId}>
      <div className="hover:bg-sidebar dark:hover:bg-sidebar-dark rounded-xl">
        <div
          className={
            location.pathname === "/app/messages/" + channelId
              ? "bg-primary-sidebar-selected dark:bg-primary-sidebar-selected-dark flex gap-3 w-full items-center p-2 rounded-xl"
              : "flex gap-3 w-full items-center p-2 rounded-xl"
          }
        >
          {user.data?.ok ? (
            <img
              src={user.data.user.avatar}
              className="rounded-xl object-cover w-9 h-9 sm:w-12 sm:h-12"
            />
          ) : (
            <div className="animate-pulse rounded-xl w-9 h-9 sm:w-12 sm:h-12 bg-placeholder dark:bg-placeholder-dark" />
          )}
          <div className="flex flex-col flex-1">
            {user.data?.ok ? (
              <p className="font-bold">
                {user.data?.ok ? user.data.user.username : ""}
              </p>
            ) : (
              <div
                className="animate-pulse rounded h-5 bg-placeholder dark:bg-placeholder-dark"
                style={{ width: usernamePlaceholderWidth + "%" }}
              />
            )}
            <p className="font-light text-xs leading-none truncate w-32">
              {message.data &&
              me.data?.ok &&
              lastMessage?.author === me.data.user.id ? (
                <>You: {content}</>
              ) : (
                content
              )}
            </p>
          </div>
          <FontAwesomeIcon icon={faChevronRight} className="ml-auto mr-3" />
        </div>
      </div>
    </Link>
  );
};

export default MessageCard;
