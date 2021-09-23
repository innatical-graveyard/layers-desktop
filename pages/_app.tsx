import { AppProps } from "next/app";
import { useRouter } from "next/router";
import Sidebar from "../components/Sidebar";
import "../styles/globals.scss";
import type { App } from "../../layers-backend/resources/_app";
import { withTRPC } from "@trpc/next";
import Auth from "../util/auth";
import { url } from "../util/trpc";

const Layers = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  return (
    <Auth.Provider>
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
  config({ ctx }) {
    return {
      url,
      headers() {
        const token = localStorage.getItem("token");
        return token ? { Authorization: token } : {};
      },
    };
  },
  ssr: true,
})(Layers);
