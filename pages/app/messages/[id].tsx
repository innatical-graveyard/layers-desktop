import { useRouter } from "next/router";
import ChannelView from "../../../components/ChannelView";
import MessagesSidebar from "../../../components/MessagesSidebar";
import { NavigationStack } from "../../../components/NavigationStack";
import { serverAuthedPage } from "../../../util/auth";
export const getServerSideProps = serverAuthedPage;

const Chat = () => {
  const router = useRouter();

  return (
    <>
      <NavigationStack
        mainContent={({ backButton }) => (
          <ChannelView
            id={router.query["id"] as string}
            backButton={backButton}
          />
        )}
        sidebar={MessagesSidebar}
        backUrl="/app/messages"
      />
    </>
  );
};

export default Chat;
