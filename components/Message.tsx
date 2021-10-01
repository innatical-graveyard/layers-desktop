import {
  EncryptedMessage,
  SignedMessage,
  SigningPair,
  SymmetricKey,
} from "@innatical/inncryption";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { trpc } from "../util/trpc";
import useMarkdown from "@innatical/markdown";
import { useMarkdownPresets } from "../util/hooks";

dayjs.extend(calendar);

const Message: React.FC<{
  payload: EncryptedMessage;
  sessionKey: SymmetricKey;
  author: string;
  createdAt: string;
  primary: boolean;
}> = ({ author, payload, sessionKey, createdAt, primary }) => {
  const user = trpc.useQuery([
    "users.user",
    {
      id: author,
    },
  ]);

  const message = useQuery(
    ["messageContent", payload, sessionKey, user.data],
    async () => {
      if (user.data?.ok) {
        const message = (await sessionKey.decrypt(payload)) as SignedMessage;
        const unwrapped = await SigningPair.verify(
          message,
          user.data.user.publicKeychain.signing
        );

        if (unwrapped.ok) {
          return unwrapped.message as string;
        } else {
          return false;
        }
      }
    }
  );

  const messagePlaceholderWidth = useMemo(
    () => Math.random() * (70 - 30) + 30,
    []
  );
  const usernamePlaceholderWidth = useMemo(
    () => Math.random() * (20 - 10) + 10,
    []
  );

  const content = useMarkdownPresets(
    message.data === false
      ? "*This message could not be decrypted or verfiied*"
      : message.data ?? ""
  );

  return (
    <div className={primary ? "flex gap-4 mt-3 w-full" : "flex gap-4 w-full"}>
      {primary &&
        (user.data?.ok ? (
          <img
            src={user.data.user.avatar}
            className="rounded-xl object-cover w-12 h-12"
          />
        ) : (
          <div className="animate-pulse rounded-xl w-12 h-12 bg-placeholder dark:bg-placeholder-dark" />
        ))}

      <div
        className={
          primary ? "flex flex-col flex-1" : "ml-16 flex flex-col flex-1"
        }
      >
        {primary && (
          <>
            <div className="font-bold flex items-center">
              {user.data?.ok ? (
                user.data.user.username
              ) : (
                <div
                  className="animate-pulse rounded h-5 bg-placeholder dark:bg-placeholder-dark"
                  style={{ width: usernamePlaceholderWidth + "%" }}
                />
              )}{" "}
              <span className="text-secondary font-normal text-xs ml-2">
                {dayjs(createdAt).calendar()}
              </span>
            </div>
          </>
        )}
        {message.data !== undefined ? (
          content
        ) : (
          <div
            className="h-5 animate-pulse rounded bg-placeholder dark:bg-placeholder-dark"
            style={{ width: `${messagePlaceholderWidth}%` }}
          />
        )}
      </div>
    </div>
  );
};

export default Message;
