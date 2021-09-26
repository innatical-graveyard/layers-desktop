import { createReactQueryHooks, createTRPCClient, TRPCLink } from "@trpc/react";
import type { App } from "../../layers-backend/resources/_app";
import { createWSClient, wsLink } from "@trpc/client/links/wsLink";
import { splitLink } from "@trpc/client/links/splitLink";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";

export const url = "http://localhost:3001";
export const wsUrl = "ws://localhost:3001";
export const trpc = createReactQueryHooks<App>();

export let links: TRPCLink<any>[];

if (globalThis.window) {
  const wsClient = createWSClient({
    url: `ws://localhost:3002`,
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
