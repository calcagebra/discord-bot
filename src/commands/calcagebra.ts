import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ComponentType,
  InteractionResponseType,
  MessageFlags,
  TextInputStyle,
  type API,
  type APIChatInputApplicationCommandInteraction,
  type APIInteractionResponseCallbackData,
  type RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "@discordjs/core/http-only";
import { InteractionOptionResolver } from "@sapphire/discord-utilities";
import { DELETE_BUTTON, respond, runCode, type Env } from "../util/index.js";

export type CalcagebraCommandOptions = {
  api: API;
  env: Env;
  interaction: APIChatInputApplicationCommandInteraction;
};

export default {
  data: {
    name: "calcagebra",
    description: "Runs calcagebra code",
    type: ApplicationCommandType.ChatInput,
    options: [
      {
        name: "code",
        description: "The code to run",
        type: ApplicationCommandOptionType.String,
        min_length: 1,
        max_length: 6_000,
      },
      {
        name: "debug",
        description: "Whether to print debug information",
        type: ApplicationCommandOptionType.Boolean,
      },
      {
        name: "ephemeral",
        description: "Whether to respond ephemerally",
        type: ApplicationCommandOptionType.Boolean,
      },
    ],
  } satisfies RESTPostAPIChatInputApplicationCommandsJSONBody,
  async execute({ api: _api, env, interaction }: CalcagebraCommandOptions) {
    const options = new InteractionOptionResolver(interaction);

    const code = options.getString("code");

    const debug = options.getBoolean("debug") ?? false;
    const ephemeral = options.getBoolean("ephemeral") ?? false;

    if (code === null) {
      return respond({
        type: InteractionResponseType.Modal,
        data: {
          custom_id: "calcagebra",
          title: "Run Calcagebra code",
          components: [
            {
              type: ComponentType.ActionRow,
              components: [
                {
                  custom_id: "code",
                  label: "Code to run",
                  style: TextInputStyle.Paragraph,
                  min_length: 1,
                  max_length: 4_000,
                  placeholder: "The code to run",
                  required: true,
                  type: ComponentType.TextInput,
                },
              ],
            },
            {
              type: ComponentType.ActionRow,
              components: [
                {
                  custom_id: "debug",
                  label: "Debug",
                  placeholder: "Whether to print debug information",
                  required: true,
                  style: TextInputStyle.Paragraph,
                  type: ComponentType.TextInput,
                  value: `${debug}`,
                },
              ],
            },
            {
              type: ComponentType.ActionRow,
              components: [
                {
                  custom_id: "ephemeral",
                  label: "Ephemeral",
                  placeholder: "Whether to respond ephemerally",
                  required: true,
                  style: TextInputStyle.Paragraph,
                  type: ComponentType.TextInput,
                  value: `${ephemeral}`,
                },
              ],
            },
          ],
        },
      });
    }

    const data: APIInteractionResponseCallbackData = {
      content: await runCode(code, env, debug),
      components: [{ components: [DELETE_BUTTON], type: ComponentType.ActionRow }],
    };

    if (ephemeral) {
      data.flags = MessageFlags.Ephemeral;
    }

    return respond({ data, type: InteractionResponseType.ChannelMessageWithSource });
  },
} as const;
