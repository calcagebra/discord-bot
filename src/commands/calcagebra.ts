import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ComponentType,
  InteractionResponseType,
  TextInputStyle,
  type API,
  type APIApplicationCommandInteractionDataStringOption,
  type APIChatInputApplicationCommandInteraction,
  type RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "@discordjs/core/http-only";
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
    ],
  } satisfies RESTPostAPIChatInputApplicationCommandsJSONBody,
  async execute({ api: _api, env, interaction }: CalcagebraCommandOptions) {
    const option = interaction.data.options?.[0] as APIApplicationCommandInteractionDataStringOption | undefined;
    const code = option?.value;

    if (code === undefined) {
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
          ],
        },
      });
    }

    return respond({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: await runCode(code, env),
        components: [{ components: [DELETE_BUTTON], type: ComponentType.ActionRow }],
      },
    });
  },
} as const;
