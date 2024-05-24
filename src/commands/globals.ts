import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ComponentType,
  InteractionResponseType,
  MessageFlags,
  type API,
  type APIChatInputApplicationCommandInteraction,
  type APIInteractionResponseCallbackData,
  type RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "@discordjs/core/http-only";
import { InteractionOptionResolver } from "@sapphire/discord-utilities";
import { DELETE_BUTTON, WORKERS_URL, codeBlock, respond, type Env } from "../util/index.js";

type GlobalsCommandOptions = {
  api: API;
  env: Env;
  interaction: APIChatInputApplicationCommandInteraction;
};

export default {
  data: {
    name: "globals",
    description: "Print globals",
    type: ApplicationCommandType.ChatInput,
    options: [
      {
        name: "ephemeral",
        description: "Respond ephemerally",
        type: ApplicationCommandOptionType.Boolean,
      },
    ],
  } satisfies RESTPostAPIChatInputApplicationCommandsJSONBody,
  async execute({ api: _api, env, interaction }: GlobalsCommandOptions) {
    const options = new InteractionOptionResolver(interaction);

    const ephemeral = options.getBoolean("ephemeral") ?? false;

    const response = await env.CALCAGEBRA.fetch(new Request(WORKERS_URL.concat("globals"), { method: "GET" }));

    const globals = await response.text();

    const data: APIInteractionResponseCallbackData = {
      content: codeBlock({ code: globals, language: "hs" }),
      components: [{ components: [DELETE_BUTTON], type: ComponentType.ActionRow }],
    };

    if (ephemeral) {
      data.flags = MessageFlags.Ephemeral;
    }

    return respond({ data, type: InteractionResponseType.ChannelMessageWithSource });
  },
} as const;
