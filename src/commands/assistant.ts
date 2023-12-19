import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Message } from "discord.js";
import { commandInterface } from "@domains/models/command";

export default {
  name: 'assistant',
  aliases: [],
  run: async function (message: Message, args: string[]) {
    const embed = new EmbedBuilder()
      .setTitle("ChatAi Assistant")
      .setDescription("sample test button")
      .setTimestamp()
      .setThumbnail(message.guild?.iconURL() as string)

    const createAssistant = new ButtonBuilder()
      .setCustomId('createAssistant')
      .setLabel("Create Assistant")
      .setStyle(ButtonStyle.Success)
    
    const deleteAssistant = new ButtonBuilder()
      .setCustomId("deleteAssistant")
      .setLabel("Delete Assistant")
      .setStyle(ButtonStyle.Danger)

    const button = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(createAssistant, deleteAssistant)
    
    return await message.reply({
      embeds: [embed],
      components: [button]
    })
  }
} as commandInterface