import {
  ComponentType,
  InteractionResponseType,
  type API,
  type APIModalSubmitInteraction,
} from "@discordjs/core/http-only";
import { DELETE_BUTTON, respond, runCode, type Env } from "../util/index.js";

export type CalcagebraModalOptions = {
  api: API;
  env: Env;
  interaction: APIModalSubmitInteraction;
};

export default {
  customId: "calcagebra",
  async execute({ api: _api, env, interaction }: CalcagebraModalOptions) {
    const code = interaction.data.components[0].components[0].value;

    return respond({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: await runCode(code, env),
        components: [{ components: [DELETE_BUTTON], type: ComponentType.ActionRow }],
      },
    });
  },
} as const;
