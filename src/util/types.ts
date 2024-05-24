import type { KVNamespace } from "@cloudflare/workers-types/experimental/index.js";

export type Env = {
  CALCAGEBRA: {
    fetch(req: Request): Promise<Response>;
  };
  DISCORD_PUBLIC_KEY: KVNamespace;
  DISCORD_TOKEN: KVNamespace;
  WORKERS_URL: KVNamespace;
};
