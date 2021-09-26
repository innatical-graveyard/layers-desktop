import { Keychain } from "@innatical/inncryption";
import { createContainer } from "@innatical/innstate";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [token, setToken] = useState<string | null>();
  const [keychain, setKeychain] = useState<Keychain | null>();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else if (keychain === null) {
      localStorage.removeItem("token");
    }
  }, [token]);

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
      const token = localStorage.getItem("token");
      const keychain = localStorage.getItem("keychain");

      if (token) setToken(token);
      if (keychain)
        setKeychain(await Keychain.fromJWKChain(JSON.parse(keychain)));
    })();
  }, []);

  return { token, setToken, keychain, setKeychain };
};

const Auth = createContainer(useAuth);

export const useAuthedPage = () => {
  const { token, keychain } = Auth.useContainer();
  const router = useRouter();
  useEffect(() => {
    if (!(token && keychain)) router.replace("/authentication/login");
  }, [token, keychain]);
};

export const usePublicOnlyPage = () => {
  const { token, keychain } = Auth.useContainer();
  const router = useRouter();
  useEffect(() => {
    if (token && keychain) router.replace("/app/messages");
  }, [token, keychain]);
};

export default Auth;
