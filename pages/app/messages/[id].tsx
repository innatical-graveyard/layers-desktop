import { useRouter } from "next/router";
import ChannelView from "../../../components/ChannelView";
import MessagesSidebar from "../../../components/MessagesSidebar";

const Chat = () => {
  const router = useRouter();

  return (
    <>
      <MessagesSidebar />
      <ChannelView id={router.query["id"] as string} />
    </>
  );
};

export default Chat;
