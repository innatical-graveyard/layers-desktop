import { createReactQueryHooks, createTRPCClient, TRPCLink } from "@trpc/react";
import type { App } from "../../layers-backend/resources/_app";
import { createWSClient, wsLink } from "@trpc/client/links/wsLink";
import { splitLink } from "@trpc/client/links/splitLink";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";

export const url = "https://api.isometric.chat";
export const wsUrl = "wss://gateway.isometric.chat";
export const trpc = createReactQueryHooks<App>();

export let links: TRPCLink<any>[];

if (globalThis.window) {
  const wsClient = createWSClient({
    url: wsUrl,
  });

  links = [
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
} else {
  links = [
    httpBatchLink({
      url,
    }),
  ];
}

export const client = createTRPCClient<App>({
  url,
  headers: () =>
    localStorage.getItem("token")
      ? {
          Authorization: localStorage.getItem("token") ?? undefined,
        }
      : {},
});
