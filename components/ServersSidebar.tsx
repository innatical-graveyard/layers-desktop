import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { IconButton } from "./UI/IconButton";

const ServersSidebar = () => {
  return (
    <div className="flex flex-col p-4 gap-3 h-full bg-servers-sidebar dark:bg-servers-sidebar-dark flex-shrink-0">
      <img
        src="https://cdn.discordapp.com/attachments/888219204417896488/890094423617204254/Screen_Shot_2021-09-21_at_11.37.25_PM.png"
        className="rounded-xl object-cover w-12 h-12"
      />

      <img
        src="https://cdn.discordapp.com/attachments/888219204417896488/890094423617204254/Screen_Shot_2021-09-21_at_11.37.25_PM.png"
        className="rounded-xl object-cover w-12 h-12"
      />

      <img
        src="https://cdn.discordapp.com/attachments/888219204417896488/890094423617204254/Screen_Shot_2021-09-21_at_11.37.25_PM.png"
        className="rounded-xl object-cover w-12 h-12"
      />
      <img
        src="https://cdn.discordapp.com/attachments/888219204417896488/890094423617204254/Screen_Shot_2021-09-21_at_11.37.25_PM.png"
        className="rounded-xl object-cover w-12 h-12"
      />

      <img
        src="https://cdn.discordapp.com/attachments/888219204417896488/890094423617204254/Screen_Shot_2021-09-21_at_11.37.25_PM.png"
        className="rounded-xl object-cover w-12 h-12"
      />

      <img
        src="https://cdn.discordapp.com/attachments/888219204417896488/890094423617204254/Screen_Shot_2021-09-21_at_11.37.25_PM.png"
        className="rounded-xl object-cover w-12 h-12"
      />

      <img
        src="https://cdn.discordapp.com/attachments/888219204417896488/890094423617204254/Screen_Shot_2021-09-21_at_11.37.25_PM.png"
        className="rounded-xl object-cover w-12 h-12"
      />

      <IconButton
        icon={faPlus}
        color={"bg-chat-input-elements-dark"}
        className="w-12 h-12 mt-auto"
      />
    </div>
  );
};

export default ServersSidebar;
