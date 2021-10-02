import {
  faCheck,
  faComment,
  faEllipsisH,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import React, { useCallback } from "react";
import { trpc } from "../util/trpc";
import { IconButton } from "./UI/IconButton";

const FriendCard: React.FC<{
  userId: string;
  type: "friend" | "incoming" | "outgoing";
}> = ({ userId, type }) => {
  const user = trpc.useQuery(["users.user", { id: userId }]);
  const history = useHistory();

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
      history.push("/app/messages/" + channel.id);
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
            <IconButton
              icon={faComment}
              onClick={messageCb}
              color={"bg-transparent"}
              className="w-10 h-10"
            />
            <IconButton
              icon={faTimes}
              onClick={removeFriendCb}
              color={"bg-transparent"}
              className="w-10 h-10"
            />
            <IconButton
              icon={faEllipsisH}
              color={"bg-transparent"}
              className="w-10 h-10"
            />
          </>
        ) : type === "incoming" ? (
          <>
            <IconButton
              icon={faCheck}
              onClick={addFriendCb}
              color={"bg-transparent"}
              className="w-10 h-10"
            />

            <IconButton
              icon={faTimes}
              onClick={removeFriendCb}
              color={"bg-transparent"}
              className="w-10 h-10"
            />
          </>
        ) : (
          <IconButton
            icon={faTimes}
            onClick={removeFriendCb}
            color={"bg-transparent"}
            className="w-10 h-10"
          />
        )}
      </div>
    </div>
  );
};

export default FriendCard;
