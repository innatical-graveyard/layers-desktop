import { Keychain } from "@innatical/inncryption";
import { createContainer } from "@innatical/innstate";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookie } from "react-use";

const useAuth = () => {
  const [token, updateToken, deleteToken] = useCookie("token");
  const [keychain, setKeychain] = useState<Keychain | null>();

  useEffect(() => {
    (async () => {
      if (keychain) {
        localStorage.setItem(
          "keychain",
          JSON.stringify(await keychain.toJWKChain())
        );
      } else if (keychain === null) {
        localStorage.removeItem("keychain");
      }
    })();
  }, [keychain]);

  useEffect(() => {
    (async () => {
      const keychain = localStorage.getItem("keychain");

      if (keychain)
        setKeychain(await Keychain.fromJWKChain(JSON.parse(keychain)));
    })();
  }, []);

  return { token, keychain, setKeychain, updateToken, deleteToken };
};

const Auth = createContainer(useAuth);

export const useAuthedPage = () => {
  const { token } = Auth.useContainer();
  const history = useHistory();
  if (!token && typeof window !== "undefined")
    history.replace("/authentication/login");
};

export const usePublicOnlyPage = () => {
  const { token } = Auth.useContainer();
  const history = useHistory();
  if (token && typeof window !== "undefined") history.replace("/app/messages");
};

export default Auth;
