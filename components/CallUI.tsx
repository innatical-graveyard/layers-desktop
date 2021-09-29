import {
  faMicrophone,
  faMicrophoneSlash,
  faPhoneSlash,
  faVolumeMute,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { trpc } from "../util/trpc";
import Voice from "../util/voice";

const CallUI = () => {
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
    <div className="bg-card dark:bg-card-dark rounded-lg p-3 absolute bottom-2 left-2 right-2">
      <h1 className="font-bold">
        Call w/{user.data?.ok ? user.data.user.username : ""}
      </h1>
      <p className="text-sm">
        {state} -{" "}
        {Math.floor(time / 60) + ":" + String(time % 60).padStart(2, "0")}
      </p>
      <div className="pt-1 flex gap-1">
        <button
          className="bg-inndigo w-10 rounded-lg"
          onClick={() => setMuted(!muted)}
        >
          <FontAwesomeIcon icon={muted ? faMicrophoneSlash : faMicrophone} />
        </button>
        <button
          className="bg-inndigo w-10 rounded-lg"
          onClick={() => setDeafened(!deafened)}
        >
          <FontAwesomeIcon icon={deafened ? faVolumeMute : faVolumeUp} />
        </button>
        <button className="bg-danger rounded-lg p-2 flex-1" onClick={hangUp}>
          <FontAwesomeIcon icon={faPhoneSlash} />
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default CallUI;
