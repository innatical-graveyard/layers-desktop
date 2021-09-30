import { faFileUpload, faSmile } from "@fortawesome/free-solid-svg-icons";
import { trpc } from "../util/trpc";
import React, { useState } from "react";
import Auth from "../util/auth";
import { SymmetricKey } from "@innatical/inncryption";
import Picker from "emoji-picker-react";
import { IconButton } from "./UI/IconButton";

const ChatBox: React.FC<{
  channelId: string;
  sessionKey?: SymmetricKey;
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
              payload: await sessionKey!.encrypt(
                await keychain!.signing.sign(text)
              ),
            });
          }
        }}
        disabled={!sessionKey}
      />

      <IconButton
        icon={faFileUpload}
        color={"bg-chat-input-elements-dark"}
        disabled={!sessionKey}
      />

      <IconButton
        icon={faSmile}
        color={"bg-chat-input-elements-dark"}
        onClick={() => setEmojiPicker(!emojiPicker)}
        disabled={!sessionKey}
      />
    </div>
  );
};

export default ChatBox;
