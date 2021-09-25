import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload, faSmile } from "@fortawesome/free-solid-svg-icons";
import { trpc } from "../util/trpc";
import { useState } from "react";
import Auth from "../util/auth";
import { SymmetricKey } from "@innatical/inncryption";

const ChatBox: React.FC<{
  channelId: string;
  sessionKey: SymmetricKey;
}> = ({ channelId, sessionKey }) => {
  const sendMessage = trpc.useMutation("channels.send");
  const [text, setText] = useState("");

  return (
    <div className="p-8 flex gap-3">
      <input
        type="text"
        className="p-3 rounded-lg bg-chat-input-elements dark:bg-chat-input-elements-dark w-full"
        placeholder="Say some dumb shit, idk"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            setText("");
            await sendMessage.mutateAsync({
              id: channelId,
              payload: await sessionKey.encrypt(text),
            });
          }
        }}
      />
      <button className="p-3 bg-chat-input-elements dark:bg-chat-input-elements-dark rounded-lg">
        <FontAwesomeIcon icon={faFileUpload} fixedWidth />
      </button>
      <button className="p-3 bg-chat-input-elements dark:bg-chat-input-elements-dark rounded-lg">
        <FontAwesomeIcon icon={faSmile} fixedWidth />
      </button>
    </div>
  );
};

export default ChatBox;
