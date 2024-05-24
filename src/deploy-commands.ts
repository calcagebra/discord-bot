import { env } from "node:process";
import { API } from "@discordjs/core";
import { REST } from "@discordjs/rest";
import CalcagebraCommand from "./commands/calcagebra.js";

const rest = new REST().setToken(env.DISCORD_TOKEN);

const api = new API(rest);

await api.applicationCommands.bulkOverwriteGlobalCommands(env.DISCORD_APPLICATION_ID, [CalcagebraCommand.data]);

console.info("Successfully deployed commands.");
