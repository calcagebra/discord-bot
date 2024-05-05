import {
  ApplicationCommandType,
  ComponentType,
  InteractionResponseType,
  TextInputStyle,
  type API,
  type APIChatInputApplicationCommandInteraction,
} from "@discordjs/core/http-only";
import { respond, type Env } from "../util/index.js";

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
  },
  async execute({ api: _api, env: _env, interaction: _interaction }: CalcagebraCommandOptions) {
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
  },
} as const;
