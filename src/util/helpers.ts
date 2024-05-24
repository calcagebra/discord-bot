import { Buffer } from "node:buffer";
import type { Request as CloudflareRequest } from "@cloudflare/workers-types/experimental";
import type { APIInteractionResponse } from "@discordjs/core/http-only";
import tweetnacl from "tweetnacl";
import type { Env } from "./index.js";

const { sign } = tweetnacl;

export type CodeBlockOptions = {
  code: string;
  language?: string;
};

export function codeBlock({ code, language }: CodeBlockOptions): string {
  return language === undefined ? `\`\`\`\n${code}\n\`\`\`` : `\`\`\`${language}\n${code}\n\`\`\``;
}

export function respond(response: APIInteractionResponse): Response {
  return new Response(JSON.stringify(response), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function runCode(code: string, env: Env, debug?: boolean, globals?: boolean): Promise<string> {
  const response = await env.CALCAGEBRA.fetch(
    new Request((await env.DISCORD_CALCAGEBRA_APPLICATION.get("WORKERS_URL"))!, {
      body: JSON.stringify({ code, debug, globals }),
      method: "POST",
    }),
  );
  const result = await response.text();

  return globals === false
    ? `Code: ${codeBlock({ language: "hs", code })}\nResult: ${codeBlock({ language: "hs", code: result })}`
    : codeBlock({ language: "hs", code: result });
}

export async function verify(request: CloudflareRequest, env: Env): Promise<boolean> {
  const body = await request.clone().text();
  const signature = request.headers.get("X-Signature-Ed25519");
  const timestamp = request.headers.get("X-Signature-Timestamp");

  if (!body || !signature || !timestamp) return false;

  return sign.detached.verify(
    Buffer.from(timestamp.concat(body)),
    Buffer.from(signature, "hex"),
    Buffer.from((await env.DISCORD_CALCAGEBRA_APPLICATION.get("DISCORD_PUBLIC_KEY"))!, "hex"),
  );
}
