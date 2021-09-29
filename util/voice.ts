import { useCallback, useState } from "react";
import { trpc } from "./trpc";
import Auth from "./auth";
import Peer from "simple-peer";
import { SignedMessage, SigningPair } from "@innatical/inncryption";

const useVoice = () => {
  const [channelID, setChannelID] = useState<string>();
  const [peer, setPeer] = useState<Peer.Instance>();
  const me = trpc.useQuery(["users.me"]);
  const utils = trpc.useContext();
  const { token, keychain } = Auth.useContainer();
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
              peer &&
              keychain &&
              me.data?.ok &&
              data.from === me.data.user.id
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
              if (unwrapped.ok)
                peer?.signal(unwrapped.message as Peer.SignalData);
            }
          case "answer":
            setPeer(new Peer({ initiator: true }));
        }
      },
      enabled: !!token && !!channelID,
    }
  );

  const startDMCall = useCallback(() => {}, []);
};

export default useVoice;
