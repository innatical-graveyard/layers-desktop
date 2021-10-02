import { createContainer } from "@innatical/innstate";
import { trpc } from "./trpc";
import Auth from "./auth";
import { SignedMessage, SigningPair } from "@innatical/inncryption";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const useCurrentUser = () => {
  const { token, keychain } = Auth.useContainer();
  const utils = trpc.useContext();
  const history = useHistory();

  trpc.useSubscription(["users.me", { token: token! }], {
    async onNext(data) {
      switch (data.type) {
        case "notification":
          const channel = await utils.fetchQuery([
            "channels.channel",
            { id: data.channel },
          ]);
          if (!channel.ok) return;
          const user = await utils.fetchQuery([
            "users.user",
            { id: channel.to },
          ]);
          if (!user.ok) return;

          const sessionKey = await keychain!.encryption.sessionKey(
            user.user.publicKeychain.encryption
          );
          const decrypted = (await sessionKey.decrypt(
            data.payload
          )) as SignedMessage;
          const signed = await SigningPair.verify(
            decrypted,
            user.user.publicKeychain.signing
          );

          if (!signed.ok) return;

          try {
            if (!("Notification" in window)) return;

            const notification = new Notification(user.user.username, {
              body: signed.message as string,
            });

            const onClick = () => {
              history.push("/app/messages/" + channel.id);
            };

            notification.addEventListener("click", onClick, { once: true });
          } catch {}
      }
    },
    enabled: !!token && !!keychain,
  });

  useEffect(() => {
    if (!token) return;
    if (!("Notification" in window)) return;

    Notification.requestPermission();
  }, [token]);
};

export default createContainer(useCurrentUser);
