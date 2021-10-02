import { createReactQueryHooks, createTRPCClient, TRPCLink } from "@trpc/react";
import type { App } from "../../layers-backend/resources/_app";
import { createWSClient, wsLink } from "@trpc/client/links/wsLink";
import { splitLink } from "@trpc/client/links/splitLink";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import cookies from "js-cookie";

export const url = "https://api.isometric.chat";
export const wsUrl = "wss://gateway.isometric.chat";
export const trpc = createReactQueryHooks<App>();

const wsClient = createWSClient({
  url: wsUrl,
});

export const links = [
  splitLink({
    condition(op) {
      return op.type === "subscription";
    },
    true: wsLink({
      client: wsClient,
    }),
    false: httpBatchLink({
      url,
    }),
  }),
];

export const client = createTRPCClient<App>({
  url,
  headers: () => {
    const token = cookies.get("token");

    return token
      ? {
          Authorization: token,
        }
      : {};
  },
});
