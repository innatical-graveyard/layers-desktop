import {
  EncryptedMessage,
  SignedMessage,
  SigningPair,
  SymmetricKey,
} from "@innatical/inncryption";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import { useAsync } from "react-use";
import { trpc } from "../util/trpc";

dayjs.extend(calendar);

const Message: React.FC<{
  payload: EncryptedMessage;
  sessionKey: SymmetricKey;
  author: string;
  createdAt: string;
}> = ({ author, payload, sessionKey, createdAt }) => {
  const user = trpc.useQuery([
    "users.user",
    {
      id: author,
    },
  ]);

  const message = useAsync(async () => {
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
  }, [payload, sessionKey, user.data]);

  return (
    <div className="flex gap-3 my-2">
      <img
        src={user.data?.ok ? user.data.user.avatar : ""}
        className="rounded-xl object-cover w-12 h-12"
      />

      <div className="flex flex-col">
        <p className="font-bold">
          {user.data?.ok ? user.data.user.username : ""}{" "}
          <span className="text-secondary font-normal text-xs ml-2">
            {dayjs(createdAt).calendar()}
          </span>
        </p>
        <p>
          {message.value !== undefined ? (
            message.value === false ? (
              <i>This message could not be decrypted or verfiied</i>
            ) : (
              message.value
            )
          ) : (
            ""
          )}
        </p>
      </div>
    </div>
  );
};

export default Message;
