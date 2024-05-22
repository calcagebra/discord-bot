import {
  ComponentType,
  InteractionResponseType,
  MessageFlags,
  type API,
  type APIInteractionResponseCallbackData,
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
    const debug = interaction.data.components[1].components[0].value === "true";
    const ephemeral = interaction.data.components[2].components[0].value === "true";

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
