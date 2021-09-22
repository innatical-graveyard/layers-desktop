import { AppProps } from "next/app";
import { useRouter } from "next/router";
import Sidebar from "../components/Sidebar";
import "../styles/globals.scss";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  return (
    <div className={router.pathname.startsWith("/app") ? "flex h-screen" : ""}>
      {router.pathname.startsWith("/app") ? <Sidebar /> : <></>}
      <Component {...pageProps} />
    </div>
  );
};

export default App;
