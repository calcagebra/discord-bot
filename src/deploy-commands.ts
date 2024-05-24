import { env } from "node:process";
import { API } from "@discordjs/core/http-only";
import { REST } from "@discordjs/rest";
import calcagebraCommand from "./commands/calcagebra.js";
import globalsCommand from "./commands/globals.js";

const rest = new REST().setToken(env.DISCORD_TOKEN);

const api = new API(rest);

await api.applicationCommands.bulkOverwriteGlobalCommands(env.DISCORD_APPLICATION_ID, [
  calcagebraCommand.data,
  globalsCommand.data,
]);

console.info("Successfully deployed commands.");
