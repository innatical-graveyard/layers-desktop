import { Keychain } from "@innatical/inncryption";
import { createContainer } from "@innatical/innstate";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
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
  const router = useRouter();
  if (!token && typeof window !== "undefined")
    router.replace("/authentication/login");
};

export const usePublicOnlyPage = () => {
  const { token } = Auth.useContainer();
  const router = useRouter();
  if (token && typeof window !== "undefined") router.replace("/app/messages");
};

export const serverAuthedPage: GetServerSideProps = async (ctx) => {
  if (!ctx.req.cookies.token) {
    return {
      redirect: {
        destination: "/authentication/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export const serverPublicOnlyPage: GetServerSideProps = async (ctx) => {
  if (ctx.req.cookies.token) {
    return {
      redirect: {
        destination: "/app/messages",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Auth;
