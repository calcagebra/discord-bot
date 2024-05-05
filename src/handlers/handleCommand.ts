import {
  InteractionResponseType,
  MessageFlags,
  type API,
  type APIApplicationCommandInteraction,
  type APIChatInputApplicationCommandInteraction,
} from "@discordjs/core/http-only";
import createBookmarkCommand from "../commands/calcagebra.js";
import { respond, type Env } from "../util/index.js";

export type HandleCommandOptions = {
  api: API;
  env: Env;
  interaction: APIApplicationCommandInteraction;
};

export async function handleCommand({ api, env, interaction }: HandleCommandOptions): Promise<Response> {
  try {
    if (interaction.data.name === createBookmarkCommand.data.name) {
      const commandInteraction = interaction as APIChatInputApplicationCommandInteraction;

      return await createBookmarkCommand.execute({ api, env, interaction: commandInteraction });
    }

    return respond({
      data: { content: "Unknown command, this wasn't supposed to happen.", flags: MessageFlags.Ephemeral },
      type: InteractionResponseType.ChannelMessageWithSource,
    });
  } catch (error) {
    console.error(error);

    const message = ["An error occurred while handling command:", `\`\`\`${error}\`\`\``].join("\n");

    return respond({
      data: { content: message, flags: MessageFlags.Ephemeral },
      type: InteractionResponseType.ChannelMessageWithSource,
    });
  }
}
