import {
  InteractionResponseType,
  MessageFlags,
  type API,
  type APIMessageComponentButtonInteraction,
} from "@discordjs/core/http-only";
import { respond, type Env } from "../util/index.js";

export type CalcagebraButtonOptions = {
  api: API;
  env: Env;
  interaction: APIMessageComponentButtonInteraction;
};

export default {
  customId: "delete-message",
  async execute({ api, env: _env, interaction }: CalcagebraButtonOptions) {
    const userId = interaction.user?.id ?? interaction.member!.user.id;

    if (userId !== interaction.message.interaction?.user.id) {
      return respond({
        data: { content: "You can't delete a message you didn't trigger.", flags: MessageFlags.Ephemeral },
        type: InteractionResponseType.ChannelMessageWithSource,
      });
    }

    await api.channels.deleteMessage(interaction.channel.id, interaction.message.id);

    return respond({
      data: { content: "Message successfully deleted.", flags: MessageFlags.Ephemeral },
      type: InteractionResponseType.ChannelMessageWithSource,
    });
  },
} as const;
