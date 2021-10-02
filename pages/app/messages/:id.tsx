import { useParams } from "react-router-dom";
import ChannelView from "../../../components/ChannelView";
import MessagesSidebar from "../../../components/MessagesSidebar";
import { NavigationStack } from "../../../components/NavigationStack";

const Chat = () => {
  const params = useParams();

  return (
    <>
      <NavigationStack
        mainContent={({ backButton }) => (
          <ChannelView
            id={(params as { id: string }).id}
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
