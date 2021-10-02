import { useCallback, useEffect, useRef, useState } from "react";
import { trpc } from "./trpc";
import Auth from "./auth";
//@ts-ignore
import Peer from "simple-peer/simplepeer.min.js";
import { SignedMessage, SigningPair } from "@innatical/inncryption";
import { createContainer } from "@innatical/innstate";

const useVoice = () => {
  const [ringing, setRinging] = useState<string>();
  const [channelID, setChannelID] = useState<string>();
  const [peer, setPeer] = useState<Peer.Instance>();
  const currentPeer = useRef<Peer.Instance>();
  const [state, setState] = useState<"ringing" | "signaling" | "connected">();
  const me = trpc.useQuery(["users.me"]);
  const ring = trpc.useMutation("channels.ring");
  const signal = trpc.useMutation("channels.signal");
  const answer = trpc.useMutation("channels.answer");
  const utils = trpc.useContext();
  const { token, keychain } = Auth.useContainer();
  const [time, setTime] = useState<number>(0);
  const [userStreams, setUserStreams] = useState<MediaStream[]>([]);
  const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);
  const [muted, setMuted] = useState(false);
  const [deafened, setDeafened] = useState(false);

  useEffect(() => {
    if (!peer) return;

    userStreams.forEach((stream) => peer.addStream(stream));
  }, [userStreams, peer]);

  useEffect(() => {
    userStreams
      .flat()
      .flatMap((stream) => stream.getTracks())
      .forEach((track) => (track.enabled = !muted));
  }, [muted, userStreams]);

  useEffect(() => {
    remoteStreams
      .flat()
      .flatMap((stream) => stream.getTracks())
      .forEach((track) => (track.enabled = !deafened));
  }, [deafened, remoteStreams]);

  useEffect(() => {
    if (!channelID) return;
    const interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);

    return () => {
      setTime(0);
      clearInterval(interval);
    };
  }, [channelID]);

  useEffect(() => {
    if (!peer) return;
    return () => {
      peer.destroy();
    };
  }, [peer]);

  useEffect(() => {
    currentPeer.current = peer;
  }, [peer]);

  useEffect(() => {
    if (!peer) return;
    const onSignal = async (data: Peer.SignalData) => {
      console.log("sending", data);
      const signed = await keychain!.signing.sign(data);

      const channel = await utils.fetchQuery([
        "channels.channel",
        { id: channelID! },
      ]);
      if (!channel.ok) return;

      const user = await utils.fetchQuery(["users.user", { id: channel.to }]);
      if (!user.ok) return;

      const sessionKey = await keychain!.encryption.sessionKey(
        user.user.publicKeychain.encryption
      );
      const encrypted = await sessionKey.encrypt(signed);

      signal.mutateAsync({ id: channelID!, data: encrypted });
    };

    peer.on("signal", onSignal);

    return () => {
      peer.off("signal", onSignal);
    };
  }, [peer]);

  useEffect(() => {
    if (!peer) return;
    const onStream = (stream: MediaStream) => {
      setRemoteStreams((streams) => [...streams, stream]);
      const audio = new Audio();
      audio.srcObject = stream;
      audio.play();
    };

    peer.on("stream", onStream);

    return () => {
      peer.off("stream", onStream);
    };
  }, [peer]);

  useEffect(() => {
    if (!peer) return;
    const onConnect = () => {
      setState("connected");
    };

    peer.on("connect", onConnect);

    return () => {
      peer.off("connect", onConnect);
    };
  }, [peer]);

  trpc.useSubscription(
    [
      "channels.channel",
      {
        token: token!,
        id: channelID!,
      },
    ],
    {
      async onNext(data) {
        switch (data.type) {
          case "signal":
            if (
              currentPeer.current &&
              keychain &&
              me.data?.ok &&
              data.from !== me.data.user.id
            ) {
              const user = await utils.fetchQuery([
                "users.user",
                { id: data.from },
              ]);
              if (!user.ok) return;
              const sessionKey = await keychain.encryption.sessionKey(
                user.user.publicKeychain.encryption
              );
              const message = (await sessionKey.decrypt(
                data.data
              )) as SignedMessage;
              const unwrapped = await SigningPair.verify(
                message,
                user.user.publicKeychain.signing
              );
              console.log("received", unwrapped);
              if (unwrapped.ok)
                currentPeer.current?.signal(
                  unwrapped.message as Peer.SignalData
                );
            }
            break;
          case "answer":
            if (me.data?.ok && data.from !== me.data.user.id) {
              setState("signaling");
              setPeer(new Peer({ initiator: true }));
            }
            break;
        }
      },
      enabled: !!token && !!channelID,
    }
  );

  trpc.useSubscription(["users.me", { token: token! }], {
    onNext(message) {
      switch (message.type) {
        case "ring":
          setRinging(message.channel);
      }
    },
  });

  const startDMCall = useCallback(
    async ({ channelID }: { channelID: string }) => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setUserStreams((streams) => [...streams, stream]);
      setChannelID(channelID);
      setState("ringing");
      await ring.mutateAsync({ id: channelID });
    },
    []
  );

  const acceptDMCall = useCallback(
    async ({ channelID }: { channelID: string }) => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setChannelID(channelID);
      setState("signaling");
      setRinging(undefined);
      setUserStreams((streams) => [...streams, stream]);
      setPeer(new Peer());
      await answer.mutateAsync({ id: channelID });
    },
    []
  );

  const hangUp = useCallback(async () => {
    setChannelID(undefined);
    setState(undefined);
    setPeer(undefined);
  }, []);

  const decline = useCallback(async () => {
    setRinging(undefined);
  }, []);

  return {
    startDMCall,
    channelID,
    hangUp,
    ringing,
    decline,
    acceptDMCall,
    state,
    time,
    muted,
    deafened,
    setMuted,
    setDeafened,
  };
};

export default createContainer(useVoice);
