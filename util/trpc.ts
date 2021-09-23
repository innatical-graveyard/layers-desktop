import { createReactQueryHooks, createTRPCClient } from "@trpc/react";
import type { App } from "../../layers-backend/resources/_app";

export const url =
  "https://abstract-centuries-yards-hartford.trycloudflare.com";
export const trpc = createReactQueryHooks<App>();
export const client = createTRPCClient<App>({
  url,
  headers: () =>
    localStorage.getItem("token")
      ? {
          Authorization: localStorage.getItem("token") ?? undefined,
        }
      : {},
});
