import React from "react";
import ReactDOM from "react-dom";
import "../styles/index.scss";
import Auth from "../util/auth";
import Voice from "../util/voice";
import Sidebar from "../components/Sidebar";
import CurrentUser from "../util/currentUser";
import RingingModal from "../components/RingingModal";
import Routes from "inn:routes";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { trpc, links } from "../util/trpc";
import Cookies from "js-cookie";

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links,
  headers: () => {
    const token = Cookies.get("token");

    return token
      ? {
          Authorization: token,
        }
      : {};
  },
});

const SidebarWrapper = () => {
  const location = useLocation();
  return (
    <div
      className={location.pathname.startsWith("/app") ? "flex h-screen" : ""}
    >
      {location.pathname.startsWith("/app") ? <Sidebar /> : <></>}
      <Routes />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth.Provider>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <Voice.Provider>
              <CurrentUser.Provider>
                <ReactQueryDevtools />
                <SidebarWrapper />
              </CurrentUser.Provider>
              <RingingModal />
            </Voice.Provider>
          </QueryClientProvider>
        </trpc.Provider>
      </Auth.Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
