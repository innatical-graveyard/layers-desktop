import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload, faSmile } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Message from "./Message";

const ChannelView = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="p-5 flex gap-3">
        <img
          src="https://cdn.discordapp.com/attachments/888219204417896488/890094423617204254/Screen_Shot_2021-09-21_at_11.37.25_PM.png"
          className="rounded-lg object-cover w-12 h-12"
        />
        <div>
          <h1 className="text-xl">
            lleyton<span className="text-secondary">@innatical.com</span>
          </h1>
          <h2>Working on a new app</h2>
        </div>
      </div>
      <div className="flex-1 p-5 flex flex-col gap-3 py-0">
        <div className="mt-auto" />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
      <div className="p-5 flex gap-3">
        <input
          type="text"
          className="p-3 rounded-lg bg-chat-input-elements dark:bg-chat-input-elements-dark w-full"
          placeholder="Say some dumb shit, idk"
        />
        <button className="p-3 bg-chat-input-elements dark:bg-chat-input-elements-dark rounded-lg">
          <FontAwesomeIcon icon={faFileUpload} fixedWidth />
        </button>
        <button className="p-3 bg-chat-input-elements dark:bg-chat-input-elements-dark rounded-lg">
          <FontAwesomeIcon icon={faSmile} fixedWidth />
        </button>
      </div>
    </div>
  );
};

export default ChannelView;
