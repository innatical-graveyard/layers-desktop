import { useCallback, useEffect, useRef, useState } from "react";
import { trpc } from "./trpc";
import Auth from "./auth";
import Peer from "simple-peer";
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

  useEffect(() => {
    currentPeer.current = peer;
  }, [peer]);

  useEffect(() => {
    if (!peer) return;
    const onSignal = async (data: Peer.SignalData) => {
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
      console.log("uwu");
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
      console.log("connected");
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
              console.log(unwrapped);
              if (unwrapped.ok)
                currentPeer.current?.signal(
                  unwrapped.message as Peer.SignalData
                );
            }
            break;
          case "answer":
            setState("signaling");
            const stream = await navigator.mediaDevices.getUserMedia({
              audio: true,
            });
            setPeer(new Peer({ initiator: true, stream }));
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
      setChannelID(channelID);
      setState("ringing");
      await ring.mutateAsync({ id: channelID });
    },
    []
  );

  const acceptDMCall = useCallback(
    async ({ channelID }: { channelID: string }) => {
      setChannelID(channelID);
      setState("signaling");
      setRinging(undefined);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setPeer(new Peer({ stream }));
      await answer.mutateAsync({ id: channelID });
    },
    []
  );

  const hangUp = useCallback(async () => {
    setChannelID(undefined);
    setState(undefined);
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
  };
};

export default createContainer(useVoice);
