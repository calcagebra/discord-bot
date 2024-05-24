import type { KVNamespace } from "@cloudflare/workers-types/experimental/index.js";

/* eslint-disable @typescript-eslint/consistent-type-definitions */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_APPLICATION_ID: string;
      DISCORD_PUBLIC_KEY: string;
      DISCORD_TOKEN: string;
    }
  }
}

export type Env = {
  CALCAGEBRA: {
    fetch(req: Request): Promise<Response>;
  };
  DISCORD_PUBLIC_KEY: KVNamespace;
  DISCORD_TOKEN: KVNamespace;
  WORKERS_URL: KVNamespace;
};
