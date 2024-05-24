import type { KVNamespace } from "@cloudflare/workers-types/experimental/index.js";

export type Env = {
  CALCAGEBRA: {
    fetch(req: Request): Promise<Response>;
  };
  DISCORD_CALCAGEBRA_APPLICATION: KVNamespace;
};
