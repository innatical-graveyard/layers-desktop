import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload, faSmile } from "@fortawesome/free-solid-svg-icons";
import { trpc } from "../util/trpc";
import React, { useState } from "react";
import Auth from "../util/auth";
import { SymmetricKey } from "@innatical/inncryption";
import Picker from "emoji-picker-react";

const ChatBox: React.FC<{
  channelId: string;
  sessionKey: SymmetricKey;
}> = ({ channelId, sessionKey }) => {
  const { keychain } = Auth.useContainer();
  const sendMessage = trpc.useMutation("channels.send");
  const [text, setText] = useState("");
  const [emojiPicker, setEmojiPicker] = useState(false);

  return (
    <div className="px-8 pb-8 flex gap-3">
      {emojiPicker && (
        <div
          id="emojiPicker"
          className="absolute bottom-24 right-8 shadow-none"
        >
          <Picker
            onEmojiClick={(_, data) => {
              setText(text + ` ${data.emoji}`);
            }}
            native
          />
        </div>
      )}

      <input
        type="text"
        className="p-3 rounded-xl bg-chat-input-elements dark:bg-chat-input-elements-dark w-full"
        placeholder="Say something amazing"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            setText("");
            await sendMessage.mutateAsync({
              id: channelId,
              payload: await sessionKey.encrypt(
                await keychain!.signing.sign(text)
              ),
            });
          }
        }}
      />
      <button className="p-3 bg-chat-input-elements dark:bg-chat-input-elements-dark rounded-xl">
        <FontAwesomeIcon icon={faFileUpload} fixedWidth />
      </button>
      <button
        className="p-3 bg-chat-input-elements dark:bg-chat-input-elements-dark rounded-xl"
        onClick={() => setEmojiPicker(!emojiPicker)}
      >
        <FontAwesomeIcon icon={faSmile} fixedWidth />
      </button>
    </div>
  );
};

export default ChatBox;
