import {
  EncryptedMessage,
  SignedMessage,
  SigningPair,
  SymmetricKey,
} from "@innatical/inncryption";
import { useAsync } from "react-use";
import { trpc } from "../util/trpc";

const Message: React.FC<{
  payload: EncryptedMessage;
  sessionKey: SymmetricKey;
  author: string;
}> = ({ author, payload, sessionKey }) => {
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

      console.log(unwrapped);
      if (unwrapped.ok) {
        return unwrapped.message as string;
      } else {
        return false;
      }
    }
  }, [payload, sessionKey, user.data]);

  return (
    <div className="flex gap-3">
      <img
        src={user.data?.ok ? user.data.user.avatar : ""}
        className="rounded-xl object-cover w-12 h-12"
      />

      <div className="flex flex-col">
        <p className="font-bold">
          {user.data?.ok ? user.data.user.username : ""}{" "}
          <span className="text-secondary font-normal ml-2">
            Today at 3:00am
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
