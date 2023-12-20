import { ActionRowBuilder, ButtonInteraction, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";
import { buttonInterface } from "@domains/models/button";
import { findAllAssistant } from "@domains/repositories/assistant";
import { MessageError } from "../errors/message-error";

export default {
  name: 'selectAssistant',
  execute: async function (interaction: ButtonInteraction) {    
    const select = new StringSelectMenuBuilder()
      .setCustomId("selectAssistant")
      .setPlaceholder("Select your assistant")

    await interaction.deferReply();
    
    const getAssistants = await findAllAssistant(interaction.user.id);
    if(!getAssistants.length) return new MessageError(interaction, "You dont have any assistant list!");

    getAssistants.forEach((data: any) => {
      select.addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel(data.name)
          .setDescription(data.instructions)
          .setValue(data.assistant_id)
      )
    })

    const row = new ActionRowBuilder<StringSelectMenuBuilder>()
      .addComponents(select)
    
    const reply = await interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setColor("Random")
          .setTitle(`Showing list assistant ${interaction.user.username}`)
          .setAuthor({
            name: interaction.user.username, iconURL: interaction.user.avatarURL() as string
          })
          .setThumbnail(interaction.guild?.iconURL() as string)
          .setDescription("Select one of these list")
      ],
      components: [row]
    })

    return setTimeout(async () => {
      await reply.delete()
    }, 30000)
  }
} as buttonInterface