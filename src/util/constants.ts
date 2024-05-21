import { ButtonStyle, ComponentType, type APIButtonComponent } from "@discordjs/core/http-only";

export const DELETE_BUTTON: APIButtonComponent = {
  custom_id: "delete-message",
  emoji: { name: "🗑️" },
  label: "Delete",
  style: ButtonStyle.Danger,
  type: ComponentType.Button,
} as const;
