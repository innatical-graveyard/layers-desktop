import {
  faCheck,
  faComment,
  faEllipsisH,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { trpc } from "../util/trpc";

const FriendCard: React.FC<{
  userId: string;
  type: "friend" | "incoming" | "outgoing";
}> = ({ userId, type }) => {
  const user = trpc.useQuery(["users.user", { id: userId }]);
  const router = useRouter();

  const addFriend = trpc.useMutation("users.addFriend");
  const removeFriend = trpc.useMutation("users.removeFriend");
  const getDMChannel = trpc.useMutation("users.getDMChannel");

  const utils = trpc.useContext();

  const removeFriendCb = useCallback(async () => {
    await removeFriend.mutateAsync({ id: userId });
    await utils.invalidateQuery(["users.friends"]);
  }, [userId]);

  const addFriendCb = useCallback(async () => {
    await addFriend.mutateAsync({ id: userId });
    await utils.invalidateQuery(["users.friends"]);
  }, [userId]);

  const messageCb = useCallback(async () => {
    const channel = await getDMChannel.mutateAsync({ id: userId });
    if (channel.ok) {
      await utils.invalidateQuery(["users.getDMChannels"]);
      router.push("/app/messages/" + channel.id);
    }
  }, [userId]);

  return (
    <div className="odd:bg-row-stripe dark:odd:bg-row-stripe-dark flex gap-3 items-center w-full p-3 rounded-xl">
      <img
        src={user.data?.ok ? user.data.user.avatar : ""}
        className="rounded-lg object-cover w-10 h-10"
      />
      <div>
        <p className="font-bold">
          {user.data?.ok ? user.data.user.username : ""}
        </p>
        {/* <p className="text-sm">Depression hours</p> */}
      </div>
      <div className="flex ml-auto">
        {type === "friend" ? (
          <>
            <button className="w-10 h-10 flex justify-center items-center">
              <FontAwesomeIcon icon={faComment} onClick={messageCb} />
            </button>
            <button className="w-10 h-10 flex justify-center items-center">
              <FontAwesomeIcon icon={faTimes} onClick={removeFriendCb} />
            </button>
            <button className="w-10 h-10 flex justify-center items-center">
              <FontAwesomeIcon icon={faEllipsisH} />
            </button>
          </>
        ) : type === "incoming" ? (
          <>
            <button
              className="w-10 h-10 flex justify-center items-center"
              onClick={addFriendCb}
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
            <button
              className="w-10 h-10 flex justify-center items-center"
              onClick={removeFriendCb}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </>
        ) : (
          <button className="w-10 h-10 flex justify-center items-center">
            <FontAwesomeIcon icon={faTimes} onClick={removeFriendCb} />
          </button>
        )}
      </div>
    </div>
  );
};

export default FriendCard;
