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
          <img
            src={user.data?.ok ? user.data.user.avatar : ""}
            className="rounded-xl object-cover w-12 h-12"
          />
          <div className="flex flex-col">
            <p className="font-bold">
              {user.data?.ok ? user.data.user.username : ""}
            </p>
            <p className="font-light text-xs">Let's get to work!</p>
          </div>
          <FontAwesomeIcon icon={faChevronRight} className="ml-auto mr-3" />
        </div>
      </a>
    </Link>
  );
};

export default MessageCard;
