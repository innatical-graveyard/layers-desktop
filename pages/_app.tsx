import { AppProps } from "next/app";
import { useRouter } from "next/router";
import Sidebar from "../components/Sidebar";
import "../styles/globals.scss";
import type { App } from "../../layers-backend/resources/_app";
import { withTRPC } from "@trpc/next";
import Auth from "../util/auth";
import { links } from "../util/trpc";
import { ReactQueryDevtools } from "react-query/devtools";

const Layers = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  return (
    <Auth.Provider>
      <ReactQueryDevtools />
      <div
        className={router.pathname.startsWith("/app") ? "flex h-screen" : ""}
      >
        {router.pathname.startsWith("/app") ? <Sidebar /> : <></>}
        <Component {...pageProps} />
      </div>
    </Auth.Provider>
  );
};

export default withTRPC<App>({
  config() {
    return {
      links,
      headers() {
        const token = localStorage.getItem("token");
        return token ? { Authorization: token } : {};
      },
    };
  },
  ssr: false,
})(Layers);
