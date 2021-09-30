import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { trpc } from "../util/trpc";
import Link from "next/link";
import { useRouter } from "next/router";

const MessageCard: React.FC<{ userId: string; channelId: string }> = ({
  userId,
  channelId,
}) => {
  const user = trpc.useQuery(["users.user", { id: userId }]);
  const router = useRouter();

  const usernamePlaceholderWidth = useMemo(
    () => Math.random() * (70 - 40) + 40,
    []
  );

  return (
    <Link href={"/app/messages/" + channelId}>
      <a>
        <div
          className={
            router.asPath === "/app/messages/" + channelId
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
            <p className="font-light text-xs">Let's get to work!</p>
          </div>
          <FontAwesomeIcon icon={faChevronRight} className="ml-auto mr-3" />
        </div>
      </a>
    </Link>
  );
};

export default MessageCard;
