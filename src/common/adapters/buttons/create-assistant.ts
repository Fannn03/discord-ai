import { ActionRowBuilder, ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { buttonInterface } from "@domains/models/button";

export default {
  name: 'createAssistant',
  execute: async function (interaction: ButtonInteraction): Promise<void> {
    const modal = new ModalBuilder()
      .setCustomId('createAssistant')
      .setTitle("Create Assistant")

    const setName = new TextInputBuilder()
      .setCustomId('name')
      .setLabel("Assistant Name")
      .setPlaceholder("English tutor")
      .setMinLength(4)
      .setStyle(TextInputStyle.Short)

    const setInstructions = new TextInputBuilder()
      .setCustomId('intructions')
      .setLabel("Intructions")
      .setPlaceholder("You are a personal english tutor. Teach me how to speak english well")
      .setMinLength(4)
      .setStyle(TextInputStyle.Paragraph)

    const firstActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(setName);
    const secondActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(setInstructions);

    modal.addComponents(firstActionRow, secondActionRow);
    return await interaction.showModal(modal);
  }
} as buttonInterface