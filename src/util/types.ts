export type Env = {
  CALCAGEBRA: {
    fetch(req: Request): Promise<Response>;
  };
  DISCORD_APPLICATION_ID: string;
  DISCORD_PUBLIC_KEY: string;
  DISCORD_TOKEN: string;
  WORKERS_URL: string;
};
