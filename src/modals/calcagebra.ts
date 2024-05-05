import {
  ButtonStyle,
  ComponentType,
  InteractionResponseType,
  type API,
  type APIModalSubmitInteraction,
} from "@discordjs/core/http-only";
import { codeBlock, respond, type Env } from "../util/index.js";

export type CalcagebraModalOptions = {
  api: API;
  env: Env;
  interaction: APIModalSubmitInteraction;
};

export default {
  customId: "calcagebra",
  async execute({ api: _api, env, interaction }: CalcagebraModalOptions) {
    const code = interaction.data.components[0].components[0].value;

    const response = await env.CALCAGEBRA.fetch(new Request(env.WORKERS_URL, { body: code, method: "POST" }));
    const evaluatedCode = await response.text();

    return respond({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: [
          `Code: ${codeBlock({ language: "hs", code })}`,
          `Result: ${codeBlock({ language: "hs", code: evaluatedCode })}`,
        ].join("\n"),
        components: [
          {
            components: [
              {
                custom_id: "delete-message",
                emoji: { name: "🗑️" },
                label: "Delete",
                style: ButtonStyle.Danger,
                type: ComponentType.Button,
              },
            ],
            type: ComponentType.ActionRow,
          },
        ],
      },
    });
  },
} as const;
