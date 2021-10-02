import {
  faMicrophone,
  faMicrophoneSlash,
  faPhoneSlash,
  faVolumeMute,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import React, { FC } from "react";
import { trpc } from "../util/trpc";
import Voice from "../util/voice";
import { IconButton } from "./UI/IconButton";

const CallUI: FC<{ relative?: boolean }> = ({ relative }) => {
  const {
    channelID,
    state,
    time,
    hangUp,
    setMuted,
    setDeafened,
    muted,
    deafened,
  } = Voice.useContainer();
  const channel = trpc.useQuery(["channels.channel", { id: channelID! }], {
    enabled: !!channelID,
  });
  const user = trpc.useQuery(
    ["users.user", { id: channel.data?.ok ? channel.data.to : "" }],
    {
      enabled: !!channel.data?.ok,
    }
  );

  return channelID ? (
    <div
      className={`bg-card dark:bg-card-dark rounded-lg p-3 ${
        !relative ? "absolute bottom-2 left-2 right-2" : "w-full mt-4"
      }`}
    >
      <h1 className="font-bold">
        Call w/{user.data?.ok ? user.data.user.username : ""}
      </h1>
      <p className="text-sm">
        {state} -{" "}
        {Math.floor(time / 60) + ":" + String(time % 60).padStart(2, "0")}
      </p>
      <div className="pt-1 flex gap-1">
        <IconButton
          icon={muted ? faMicrophoneSlash : faMicrophone}
          onClick={() => setMuted(!muted)}
          color={"bg-inndigo"}
        />

        <IconButton
          icon={deafened ? faVolumeMute : faVolumeUp}
          onClick={() => setDeafened(!deafened)}
          color={"bg-inndigo"}
        />

        <IconButton
          icon={faPhoneSlash}
          onClick={hangUp}
          color={"bg-danger"}
          className="flex-1"
          enforceAspectRatio={false}
        />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default CallUI;
